# 12 Diffusion 与 Flow Matching：学习连续、多峰的动作分布

第 11 章说明，确定性回归会把多种合理动作压成条件均值，混合密度虽然能够保留多个模式，却需要预先决定分量数量。对于高维 Action Chunk，更通用的做法是从一个容易采样的噪声分布出发，在 Context 条件下把噪声逐步变成动作。

Diffusion 与 Flow Matching 都在学习这种条件生成过程。Diffusion 通过“训练时加噪、生成时去噪”建立离散或连续的反向过程；Flow Matching 直接监督概率路径上的速度场，再通过常微分方程把噪声运输到数据。二者都没有改变动作的数据契约：生成对象仍是归一化后的完整 Action Chunk，Context 仍来自第 10 章。

学完本章后，你应当能够：

- 说明条件生成动作与确定性回归的区别；
- 写出 Diffusion 的前向加噪和噪声预测目标；
- 区分噪声、原始样本与 velocity 参数化；
- 解释采样器、采样步数与 classifier-free guidance 的作用；
- 写出 Flow Matching 的插值路径、目标速度与 ODE；
- 比较 Diffusion 与 Flow Matching 的训练监督和生成轨迹；
- 说明动作归一化、时间维结构、边界与 mask 怎样进入生成模型；
- 设计覆盖率、成功率、平滑度和推理延迟的联合评测。

## 1. 生成对象是一整段条件动作

将长度为 $H$、维度为 $D_a$ 的动作块展平或保留二维结构，记为

$$
x_0=A_t\in\mathbb R^{B\times H\times D_a}.
$$

下标 0 在本章表示“干净数据端”，不是机器人轨迹时刻。为避免与环境时间 $t$ 混淆，生成过程的噪声等级记为 $s\in[0,1]$ 或离散步 $k$。模型学习的条件分布是

$$
p_\theta(x_0\mid C_t).
$$

同一个 $C_t$ 配合不同随机噪声可以生成不同候选动作。随机性只有在训练数据确实包含多种模式、模型学到这些模式并且采样结果经过约束与评测时才有价值；简单地给确定性策略加噪声并不会自动产生合理多样性。

动作通常先按训练集统计量归一化到近似相同尺度。否则量纲较大的关节或平移维度会主导噪声损失。生成后再反归一化、裁剪物理边界，并交给第 13 章的滚动执行与安全过滤。

## 2. Diffusion：先定义怎样破坏数据

本章把一段干净的示范动作块记为 $x_0$。它不是环境中的第 0 个时刻，而是“还没有加噪的动作数据”。前向 Diffusion 会逐步破坏这段动作，使它最后接近一个容易采样的标准 Gaussian 分布。

离散过程一共设 $K$ 个噪声步。$k\in\{1,\ldots,K\}$ 是噪声步编号，表示当前加噪到第几步；$x_k$ 是加噪到第 $k$ 步后的动作。噪声日程为每一步指定一个方差 $\beta_k$，并令 $\alpha_k=1-\beta_k$。相邻两步的变化是：

$$
q(x_k\mid x_{k-1})=\mathcal N\!\left(\sqrt{\alpha_k}\,x_{k-1},\,\beta_k I\right),
\qquad
x_k=\sqrt{\alpha_k}\,x_{k-1}+\sqrt{\beta_k}\,\epsilon_k,
\quad \epsilon_k\sim\mathcal N(0,I).
$$

直观地说，每一步都保留一部分上一步的动作信号，再叠加一小份随机噪声。把前 $k$ 步合并，定义累计信号保留率 $\bar\alpha_k=\prod_{i=1}^k\alpha_i$，就能直接从干净动作计算第 $k$ 步的带噪动作：

$$
q(x_k\mid x_0)=\mathcal N\!\left(\sqrt{\bar\alpha_k}\,x_0,\,(1-\bar\alpha_k)I\right),
$$

也就是下面的采样公式：

$$
x_k=\sqrt{\bar\alpha_k}\,x_0+\sqrt{1-\bar\alpha_k}\,\epsilon,
\qquad \epsilon\sim\mathcal N(0,I).
$$

这里的 $\epsilon$ 是与动作块形状相同的一份标准 Gaussian 随机噪声，不是网络参数。训练时我们知道抽到的确切噪声值；网络之后要学习从带噪动作中估计它。这个闭式公式还意味着，训练时不必真的把动作从 $x_1$ 一步步算到 $x_k$，可以直接抽取任意噪声步来构造样本。相邻步的递推式用于说明过程怎样逐步发生，闭式式子用于方便地直接采样，两者描述的是同一过程。

当 $\bar\alpha_k$ 接近 1 时，$x_k$ 大体保留动作结构；当它按日程逐渐接近 0 时，动作信号变弱，$x_k$ 接近标准 Gaussian。前向加噪由预先选定的日程确定，本身不需要训练网络。

<figure markdown="span">
  ![动作分布的前向加噪与反向去噪](../assets/images/intermediate/12/12-01-diffusion-process.svg){ width="1100" loading=lazy }
  <figcaption>图 12-1　前向过程按已知日程把动作逐步变成噪声；生成时从噪声出发，模型在 Context 条件下反复估计去噪方向。两条箭头不是同一次数值计算的简单倒放。（本教程绘制）</figcaption>
</figure>

## 3. 训练：让网络学会估计加进去的噪声

先明确训练时网络要做什么：**训练过程通常不会把一个 $x_k$ 连续去噪到 $x_0$。它在随机抽到的一个噪声步上，学习估计构造这个 $x_k$ 时加入的噪声。**一次训练迭代可以按下面顺序理解。

**第 1 步：取一对示范数据。** 从数据集中取当前情境 $C_t$ 和对应的干净动作块 $x_0$。$x_0$ 用来构造训练输入，也是最终希望模型学会生成的目标动作。

**第 2 步：随机抽取噪声等级和噪声。** 抽一个噪声步 $k$，再抽一份标准 Gaussian 噪声 $\epsilon$。不同迭代会遇到不同的动作、噪声步和噪声样本。

**第 3 步：构造带噪动作。** 使用前向过程的闭式公式，将干净动作和抽到的噪声混合：

$$
x_k=\sqrt{\bar\alpha_k}\,x_0+\sqrt{1-\bar\alpha_k}\,\epsilon.
$$

**第 4 步：让网络估计噪声。** 把带噪动作 $x_k$、噪声步 $k$ 和情境 $C_t$ 输入网络。$x_0$ 和真实噪声 $\epsilon$ 不作为去噪网络的额外输入；$\epsilon$ 留作核对预测结果的已知答案。网络输出与动作块同形状的噪声估计 $\hat\epsilon_\theta(x_k,k,C_t)$。

**第 5 步：比较并更新网络。** 将网络预测的噪声与构造样本时实际加入的噪声比较，计算均方误差：

$$
\mathcal L_{\mathrm{diff}}
=\mathbb E_{x_0,k,\epsilon}
\left\lVert\epsilon-\hat\epsilon_\theta(x_k,k,C_t)\right\rVert_2^2.
$$

例如，某个动作分量上实际加入的噪声是 $-0.5$，网络估计为 $-0.4$，这个分量的误差平方就是 $(-0.5-(-0.4))^2=0.01$。完整动作块会对有效时间位置和动作维度上的误差求平均；padding 或无效维度应从损失中排除。接着根据损失计算梯度并更新网络参数 $\theta$。反复看到不同示范、噪声步和噪声后，网络逐渐学会根据带噪动作、噪声等级和任务情境估计其中的噪声。

因此，噪声预测训练中网络接收的是 $x_k$、$k$ 和 $C_t$，训练目标是抽样时已知的 $\epsilon$。前向加噪日程 $\beta_k$ 在常见 DDPM 中通常固定，梯度更新噪声预测网络；若 Context 模块也参与端到端训练，它的可训练参数同样可以接收梯度。有些实现改为预测干净动作 $x_0$ 或 velocity；那是更换网络预测的目标与对应损失，不是换成另一个前向加噪过程。

## 4. 生成：从噪声逐步反推出动作

训练时，网络是在随机噪声步上练习预测噪声；生成时，才把网络的预测串成多步反向过程。此时没有示范动作 $x_0$，也没有真实噪声标签可供比较，过程如下。

**第 1 步：从噪声开始。** 根据前向日程设计，从标准 Gaussian 采样一个初始动作块：

$$
x_K\sim\mathcal N(0,I).
$$

**第 2 步：估计当前噪声。** 从 $k=K$ 开始，把当前带噪动作 $x_k$、噪声步 $k$ 和任务情境 $C_t$ 输入已训练好的去噪网络，得到噪声估计 $\hat\epsilon_\theta(x_k,k,C_t)$。

**第 3 步：计算噪声更少的动作。** 采样器依据噪声估计和已知日程参数，计算前一个噪声步的样本。常见 DDPM 更新形式为：

$$
x_{k-1}
=\frac{1}{\sqrt{\alpha_k}}
\left(x_k-\frac{\beta_k}{\sqrt{1-\bar\alpha_k}}\,
\hat\epsilon_\theta(x_k,k,C_t)\right)
+\sigma_k z,
\qquad z\sim\mathcal N(0,I).
$$

其中 $\sigma_k z$ 表示该采样方式在反向过程中保留的随机性；在常见 DDPM 采样中，最后一步不再加入这项随机噪声。DDIM 等采样器采用不同更新方式。

**第 4 步：重复，直到得到动作。** 将刚算出的 $x_{k-1}$ 作为下一轮输入，继续估计噪声并更新，直至 $k=1$，最终得到干净动作块 $x_0$。生成结束后，还要把动作反归一化、检查物理范围，并交给控制和安全模块执行。

网络不是把每个 $x_k$“减去同一团噪声”就精确回到原样。它依据学到的噪声估计和概率转移公式，逐步构造合理的反向样本；反向生成不是把前向加噪逐项原样倒放。DDPM 可以逐步采样；DDIM 等方法可以用较少的采样步或更确定的轨迹。减少网络调用通常能降低延迟，但也可能影响动作质量，需要在实际任务上比较成功率、平滑度与推理时间。

## 5. Flow Matching：直接学习运输速度

Flow Matching 选取噪声样本 $x_0\sim p_0$ 和数据样本 $x_1\sim p_{\mathrm{data}}$，再定义一条概率路径。最简单的线性插值是

$$
x_s=(1-s)x_0+s x_1,
\qquad s\sim\mathcal U(0,1).
$$

这条路径对应的条件目标速度为

$$
u_s=x_1-x_0.
$$

网络学习

$$
\mathcal L_{\mathrm{FM}}
=\mathbb E\left\|v_\theta(x_s,s,C_t)-u_s\right\|_2^2.
$$

生成时解常微分方程

$$
\frac{dx}{ds}=v_\theta(x,s,C_t),\qquad x(0)\sim p_0,
$$

从 $s=0$ 积分到 $s=1$ 得到动作样本。

<figure markdown="span">
  ![Flow Matching 学习从噪声到动作的速度场](../assets/images/intermediate/12/12-02-flow-matching.svg){ width="1080" loading=lazy }
  <figcaption>图 12-2　训练时在噪声与真实动作之间抽取中间点并监督速度；生成时只给起始噪声，通过学习到的场积分到数据分布。网络预测局部速度，不直接回归最终动作。（本教程绘制）</figcaption>
</figure>

线性插值容易实现，但噪声与数据的配对会影响运输路径。更好的耦合、不同概率路径和整流方法可能让轨迹更直、减少积分步数，却也增加训练与实现选择。

## 6. 两种方法相同在哪里，不同在哪里

二者都以简单噪声为起点，都在生成时间 $s$ 与 Context 条件下训练向量输出网络，也都需要数值求解器多次调用网络。核心差别在于训练监督：Diffusion 从已知加噪过程推导反向更新，常预测噪声、score、数据或特定 velocity；Flow Matching 为选定概率路径直接回归速度场，并通过 ODE 积分生成。

<figure markdown="span">
  ![Diffusion 与 Flow Matching 对照](../assets/images/intermediate/12/12-03-diffusion-flow-compare.svg){ width="1100" loading=lazy }
  <figcaption>图 12-3　Diffusion 与 Flow Matching 共享“噪声、时间、Context、迭代生成”的外部接口，但训练目标和数值求解方式不同。实际速度取决于网络、求解器和允许误差。（本教程绘制）</figcaption>
</figure>

不能笼统地说 Flow Matching 必然只需一步，也不能把所有 Diffusion 都理解成固定的上百步 DDPM。高阶 ODE 求解器一次“步进”可能多次调用网络，蒸馏后的 Diffusion 也可能少步生成。公平比较应报告 function evaluations、墙钟延迟、硬件、batch 大小和任务质量。

## 7. 条件怎样进入动作生成网络

若 Context 是单个向量，可以通过拼接、FiLM 或调制归一化注入各层；若 Context 是 token 集合，动作位置可以通过 Cross-Attention 读取视觉、语言和历史。生成时间 embedding 与环境时间 embedding 必须区分：前者告诉网络当前噪声等级，后者说明动作或观测在机器人轨迹中的位置。

训练时随机丢弃 Context 可以支持 classifier-free guidance，也能测试无条件基线。但 Context dropout 与传感器 modality dropout 解决的问题不同：前者为条件/无条件预测建立同一网络，后者提高缺失传感器鲁棒性。两种概率应分别记录。

## 8. 动作边界、连续性与生成后的处理

连续生成网络输出通常位于无界实数空间。常见做法包括训练前按范围缩放、输出后裁剪、用 `tanh` 映射到界内，或在模型空间使用适合边界的变换。直接裁剪简单，但大量样本撞到边界会造成速度或加速度不连续。

Action Chunk 还要保持时间平滑。时序骨干可以学习局部连续性，训练损失也可加入速度或加速度正则；但过强平滑会抹去夹爪闭合、接触切换等必要突变。最终仍要在物理单位下检查位置、速度、加速度、碰撞和控制频率。

## 9. 怎样评价一个生成式 Action Expert

单个样本与单条示范的 MSE 不能评价多峰生成。应同时考察：多次采样是否覆盖示范模式；样本是否落在有效动作区域；条件改变时分布是否正确移动；动作是否平滑并满足边界；闭环任务成功率是否提高；达到该质量需要多少次网络调用和多少毫秒。

多样性也不是越大越好。大量互不相同但都碰撞的轨迹没有价值。后续 World Model 可以帮助评价候选后果，但在本单元内至少要用任务几何、约束和闭环执行区分“覆盖合理模式”与“无控制地增加方差”。

## 配套实践

<div class="home-grid home-grid--two" markdown>

<div class="project-card" markdown>

<p class="project-label">实践 12-01</p>

### 条件 Diffusion：从噪声恢复双峰动作

训练噪声预测网络，观察动作分布怎样被逐步破坏和恢复，并比较不同 Context 下的条件样本。

预计时间：40～50 分钟

<a class="md-button md-button--primary" href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/intermediate/12/12-01-conditional-diffusion.ipynb" target="_blank" rel="noopener noreferrer">在 Colab 中运行</a>

</div>

<div class="project-card" markdown>

<p class="project-label">实践 12-02</p>

### 条件 Flow Matching：沿速度场运输样本

在同一动作分布上训练条件速度场，用 Euler 积分显示噪声粒子如何移动到两个任务条件的数据模式。

预计时间：40～50 分钟

<a class="md-button md-button--primary" href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/intermediate/12/12-02-conditional-flow-matching.ipynb" target="_blank" rel="noopener noreferrer">在 Colab 中运行</a>

</div>

</div>

## 10. 本章与 Action Model 的接口

Diffusion 和 Flow Matching 都可以实现

$$
A_t^{(k)}\sim\operatorname{ActionExpert}_\theta(A\mid C_t),
$$

但本章仍在隔离环境中关注生成分布。一个可部署 Action Model 还必须决定采样多少候选、用多少生成步、怎样反归一化和限幅、执行动作块的多少步、何时重新生成，以及推理延迟期间机器人继续执行什么。

## 本章小结

Diffusion 先定义已知前向加噪过程，再训练网络根据带噪动作、噪声等级和 Context 预测反向所需信息；Flow Matching 在选定概率路径上监督速度场，并通过 ODE 从噪声积分到动作。二者都能表示连续多峰分布，也都需要反复调用网络、正确注入条件并处理动作边界。

方法名称本身不能决定机器人效果。动作表示、Context 质量、训练覆盖、采样器、网络调用次数和闭环执行共同决定最终性能。下一章将把这些生成过程放回完整 Action Model 中，与 Context、动作约束和 receding horizon 接起来。

## 下一章

> 已经能够从 Context 生成多个 Action Chunk，怎样在真实控制循环中稳定、及时地选择和执行，并公平比较自回归、Diffusion 与 Flow Matching Action Expert？

第 13 章将建立统一生成式 Action Model 和滚动执行协议。

[返回进阶篇概览](index.md)
