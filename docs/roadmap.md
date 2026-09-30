# 学习路线

本教程不是一份知识点清单，而是一条能力演进路径：先学会把世界写成模型能处理的表示，再学会预测变化，最后学会为了语言目标选择动作并闭环纠错。

## 能力演进

<ol class="capability-chain">
  <li><span class="chain-arrow">1</span>现实交互如何成为训练数据</li>
  <li><span class="chain-arrow">2</span>神经网络如何从数据学习</li>
  <li><span class="chain-arrow">3</span>像素如何成为视觉表征</li>
  <li><span class="chain-arrow">4</span>语言和几何如何明确任务目标</li>
  <li><span class="chain-arrow">5</span>身体状态与动作如何形成接口</li>
  <li><span class="chain-arrow">6</span>模型如何从历史构建 Context</li>
  <li><span class="chain-arrow">7</span>Action Expert 如何生成动作序列</li>
  <li><span class="chain-arrow">8</span>World Model 如何预测动作后果</li>
  <li><span class="chain-arrow">9</span>Planner / Policy 如何选择动作</li>
  <li><span class="chain-arrow">10</span>机器人如何根据新观测闭环纠错</li>
</ol>

```mermaid
flowchart TB
    A["现实交互 → 训练数据"] --> B["像素 → 视觉表征"]
    B --> C["语言目标与三维关系"]
    C --> D["本体 / 触觉 / 动作接口"]
    D --> E["构建 Context"]
    E --> F["生成候选动作"]
    F --> G["预测动作后果"]
    G --> H["选择动作"]
    H --> I["执行并闭环纠错"]
```

## 三个阶段

### 基础篇：观测与动作怎样成为模型接口

核心问题：

> 现实交互、视觉、语言、空间关系、机器人状态和动作，怎样变成模型能够学习和组合的输入输出？

建议顺序：

1. [机器人眼中的世界](basics/01-robot-view-of-the-world.md)
2. [神经网络如何学习](basics/02-how-neural-networks-learn.md)
3. [视觉编码：从像素到视觉特征](basics/03-vision-encoding.md)
4. [视觉表征学习：编码器怎样学到有用特征](basics/04-visual-representation-learning.md)
5. [语言编码：从自然语言到任务表示](basics/05-language-encoding.md)
6. [三维感知与坐标变换：从相机像素到机器人目标](basics/06-spatial-geometry.md)
7. [本体、触觉与动作](basics/07-robot-state-and-action.md)

对应能力：把现实交互整理成训练数据，把视觉和语言转化为表征，再建立空间、本体、触觉与动作的统一接口。

### 进阶篇：机器人怎样构建上下文并生成动作

核心问题：

> 模型怎样从观测和历史中构建 Context，生成动作序列，并根据持续更新的观测滚动执行？

建议顺序：

1. [08 时间与记忆：RNN、LSTM 与 GRU 怎样理解历史](intermediate/08-time-and-memory.md)
2. [09 Attention 与 Transformer：怎样从历史中读取相关信息](intermediate/09-attention-and-transformer.md)
3. [10 多模态 Context Model：怎样形成任务相关上下文](intermediate/10-multimodal-context-model.md)
4. [11 从示范学习到动作序列：第一个 Action Model](intermediate/11-demonstrations-to-action-sequences.md)
5. [12 Diffusion 与 Flow Matching：学习连续、多峰的动作分布](intermediate/12-diffusion-and-flow-matching.md)
6. [13 生成式 Action Model：从候选动作到滚动执行](intermediate/13-generative-action-model.md)

对应能力：构建 Context，生成候选动作，并连接动作约束检查、滚动执行和实时动作块衔接。执行前怎样预测动作后果，将在高级篇继续讨论。

### 高级篇：从预测世界到自主行动

核心问题：

> 怎样从真实交互中学习预测，再用预测选择动作或训练策略？

单元一按连续编号阅读：

1. [14 从交互数据训练动作条件世界模型](advanced/14-action-conditioned-world-model.md)
2. [15 视觉世界模型：预测图像，还是预测表征？](advanced/15-visual-world-models.md)
3. [16 用世界模型选择动作：目标、搜索与滚动规划](advanced/16-world-model-planning.md)
4. [17 Dreamer 4：在生成的世界中学习策略](advanced/17-dreamer4-imagination-training.md)

前两章学习预测；后两章分别讨论行动时搜索和训练时改进策略。单元二第 18—21 章仍在规划，参见[高级篇概览](advanced/index.md#unit-two)。旧版草案不是当前正式章节。

## 实践如何插入

理论章节负责把问题讲清楚；[实践项目](projects/index.md) 负责把模块接起来。

| 项目 | 建议在何时开始 | 主要回看章节 |
|---|---|---|
| [表征学习小项目](projects/representation-learning.md) | 完成第 04 章后 | 视觉表征学习 |
| [多模态对齐小项目](projects/multimodal-alignment.md) | 完成第 05 章与后续多模态融合后 | 语言编码、融合、VLM |
| [动作条件预测](projects/action-conditioned-prediction.md) | 完成潜空间动力学后 | 视频预测、latent dynamics |
| [Mini-VLA](projects/mini-vla.md) | 完成 VLA 与动作表示后 | VLM、VLA、动作表示 |
| [迷你世界模型系统](projects/final-world-model-system.md) | 完成规划与安全章节后 | 世界模型、VLA-JEPA、规划 |

## 阅读建议

- 如果只想先建立全局图景：先读本页和三篇阶段总览，再进入 [第 14 章](advanced/14-action-conditioned-world-model.md)。
- 如果从零开始：按基础篇顺序读，遇到公式可并行查阅 [数学基础](appendices/math-foundations.md) 与 [PyTorch 基础](appendices/pytorch-foundations.md)。
- 如果已经熟悉 Transformer：仍建议从第 10 章的多模态 Context Model 切入，并回看第 04 章中的表征坍缩问题。
- 每一章末尾的“下一章”不是目录跳转，而是留下一个旧方法无法回答的问题。

## 当前进度

- 基础篇结构：已调整为两个单元、七个章节
- 已完成正文：第 01～07 章；15 份基础篇配套 Notebook 均已实现，并完成页面入口、图文说明与运行检查
- 进阶篇：保留第 08～13 章两个单元及 12 份配套 Notebook，覆盖 Context、生成式 Action Model 与滚动执行；世界模型与规划转入高级篇规划
- 高级篇：第 14—17 章第一版、11 张图和 4 份轻量 Notebook 已实现；官方大型模型训练未做完整复现
- 项目代码：基础篇、进阶篇及高级篇单元一均有轻量教学实践，综合系统留待后续单元
