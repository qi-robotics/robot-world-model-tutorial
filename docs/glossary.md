# 术语表

本表只列出教程后续会反复出现的术语槽位。定义将随正文填写，这里不提前给出未核对的技术结论。

*[VLM]: Vision-Language Model，视觉语言模型
*[VLA]: Vision-Language-Action model，视觉语言动作模型
*[JEPA]: Joint-Embedding Predictive Architecture
*[RSSM]: Recurrent State-Space Model
*[CNN]: Convolutional Neural Network，卷积神经网络
*[RGB-D]: 同时提供彩色图像与深度信息的视觉观测
*[RNN]: Recurrent Neural Network，循环神经网络
*[LSTM]: Long Short-Term Memory，长短期记忆网络
*[GRU]: Gated Recurrent Unit，门控循环单元
*[BPTT]: Backpropagation Through Time，通过时间的反向传播
*[CEM]: Cross-Entropy Method，交叉熵方法
*[MPC]: Model Predictive Control，模型预测控制

## 表征

| 术语 | 英文 / 符号 | 状态 | 定义与易混点 |
|---|---|---|---|
| 观测 | observation \(o_t\) | 已填写 | 机器人在时刻 $t$ 能获得的传感器与任务信息，如图像、深度、本体、触觉和语言；它不一定包含环境的完整真实状态。 |
| 潜状态 | latent state \(z_t\) | 已填写 | 编码器从观测中提取的内部连续表示；其数值本身没有固定物理含义，能否支持任务取决于结构与训练目标。 |
| 编码器 | encoder \(E(\cdot)\) | 已填写 | 把原始输入映射为模型内部表示的函数；编码不只是压缩，还决定后续模块能够读取哪些信息。 |
| 表征坍缩 | representation collapse | 已填写 | 编码器把不同输入映射成几乎相同表示的退化现象；训练目标可能变小，但表示失去区分任务状态的能力。 |
| 重建 | reconstruction | 已填写 | 根据编码后的表示恢复原输入或目标输入；重建清晰说明模型保留了像素细节，但不自动等于获得了任务语义。 |
| 预测式表征 | joint-embedding / JEPA | 已填写 | 在表示空间预测被遮挡区域或未来目标的表征，而非逐像素生成原始输入；预测对象和防坍缩机制必须明确。 |
| 图文对齐 | image-text alignment | 已填写 | 用配对数据把整图表示和文本表示映射到可比较的共同空间；全局相似度不等于目标区域定位。 |
| 视觉编码器 | visual encoder，$E_{\mathrm{vis}}$ | 已填写 | 把像素映射为全局向量、空间特征图或视觉 token；输出是否保留位置取决于结构与训练目标。 |
| 感受野 | receptive field | 已填写 | 某个特征值能够受输入中多大区域影响；感受野大不等于仍有精细空间分辨率。 |
| 视觉 token | visual token | 已填写 | 与图像 patch 或特征图区域对应的特征向量；通常还需位置编码说明来源区域。 |
| token | token | 已填写 | tokenizer 划分出的离散语言单元，可以是字符、词或子词；token id 只是查表索引。 |
| padding mask | padding mask，$m$ | 已填写 | 标记序列中哪些位置是真实 token、哪些只是补齐；补齐位置不应参与 Attention、池化或损失。 |
| 任务向量 | goal embedding，$z^g$ | 已填写 | 由语言或其他目标输入得到的连续条件表示；不等于已经可验证的物理成功条件。 |

## 时间与记忆

| 术语 | 英文 / 符号 | 状态 | 定义与易混点 |
|---|---|---|---|
| 序列 | sequence，$X_{1:T}$ | 已填写 | 按时间或其他顺序排列的一组输入；包含相同数值但顺序不同的序列可以表示完全不同的过程。 |
| 隐藏状态 | hidden state，$h_t$ | 已填写 | 循环模型根据当前输入和此前隐藏状态形成的内部记忆；它不是机器人真实物理状态，也不保证具有直接可解释性。 |
| RNN | recurrent neural network | 已填写 | 在不同时间步共享参数，并把隐藏状态从前一时刻传到后一时刻的序列模型；简单 RNN 容易受到长期依赖和梯度问题影响。 |
| LSTM | long short-term memory | 已填写 | 使用 cell state、遗忘门、输入门和输出门控制信息保留、写入与读取的循环网络；能缓解但不能消除长期记忆困难。 |
| GRU | gated recurrent unit | 已填写 | 使用更新门和重置门直接更新隐藏状态的门控循环网络；结构通常比 LSTM 紧凑，但仍需顺序计算。 |
| BPTT | backpropagation through time | 已填写 | 将循环网络沿时间展开后反向传播梯度的训练过程；截断 BPTT 会降低计算成本，也会限制直接训练的时间跨度。 |
| 梯度消失与爆炸 | vanishing / exploding gradients | 已填写 | 梯度经过许多时间步反复变换后变得过小或过大，分别会造成早期信息难以学习或训练更新不稳定。 |
| 时间掩码 | temporal mask，$M$ | 已填写 | 标记序列中真实时间步、补齐位置或不可读取的未来位置；它不能代替正确的时间戳与传感器同步。 |
| Query / Key / Value | 查询 / 键 / 值，$Q,K,V$ | 已填写 | Query 表示当前要读取什么，Key 提供匹配依据，Value 携带被读取的内容；Key 与 Value 常来自同一输入的不同投影。 |
| 因果掩码 | causal mask | 已填写 | 禁止序列位置读取未来 token 的上三角遮挡；位置编码能说明顺序，但不能代替因果掩码。 |
| 位置编码 | positional encoding，$p_t$ | 已填写 | 为 token 提供序列、时间或空间位置的固定或可学习表示；采样不均匀时还应提供时间戳或时间间隔。 |
| 模态 embedding | modality embedding | 已填写 | 加到内容 token 上的来源标识，使共同维度中的视觉、语言、本体、触觉和动作仍可区分；不能代替各模态的数值归一化。 |
| 模态 dropout | modality dropout | 已填写 | 训练时随机移除某些输入模态以降低单模态依赖；它不能替代对每种传感器失效模式的独立评测与安全降级。 |
| latent bottleneck | latent bottleneck | 已填写 | 用少量可学习 latent query 读取大量输入 token，再主要在 latent 内部计算的压缩接口；降低成本的同时可能丢失局部细节。 |

## 三维感知与坐标变换

| 术语 | 英文 / 符号 | 状态 | 定义与易混点 |
|---|---|---|---|
| 相机内参 | camera intrinsics，$K$ | 已填写 | 把相机坐标中的归一化方向映射到像素坐标；与图像分辨率和裁剪缩放有关。 |
| 相机外参 | camera extrinsics，$[R\mid t]$ | 已填写 | 描述两个坐标系之间的旋转和平移；必须明确变换方向。 |
| 深度 | depth，$d(u,v)$ | 已填写 | 像素对应的距离测量；可能指相机 $z$ 方向距离或沿射线距离，不能混用。 |
| 点云 | point cloud，$P$ | 已填写 | 一组三维点及可选颜色、语义属性；只包含传感器实际测到的表面。 |
| 齐次变换 | homogeneous transform，$T$ | 已填写 | 用 $4\times4$ 矩阵统一表达三维旋转和平移；点与方向向量的齐次分量不同。 |
| 刚体位姿 | rigid pose，$SE(3)$ | 已填写 | 不改变物体形状和尺度的三维旋转与平移；不是任意 $4\times4$ 矩阵。 |

## 动作与控制

| 术语 | 英文 / 符号 | 状态 | 定义与易混点 |
|---|---|---|---|
| 动作 | action \(a_t\) | 已填写 | 策略交给执行接口的命令；必须同时指定控制空间、单位、坐标系、频率、上下界以及绝对或增量语义。 |
| 动作分块 | action chunk | 已填写 | 一次预测的连续多步动作 $a_{t:t+H-1}$；能表达连贯运动，但执行过多步会增加开环误差。 |
| 动作 token | action token | 已填写 | 连续动作量化后的离散编号，或在 Transformer 中代表动作位置的向量；必须说明词表、反量化方式和误差，不能与原始连续控制量混用。 |
| observation horizon | observation horizon，$H_o$ | 已填写 | 产生当前 Context 时使用的历史观测范围；必须遵守时间戳因果关系。 |
| prediction horizon | prediction horizon，$H_p$ | 已填写 | Action Model 一次预测的未来动作长度，不等于机器人实际连续执行的长度。 |
| execution horizon | execution horizon，$H_e$ | 已填写 | 每次重建 Context 和重新规划前实际执行的动作前缀长度；通常不大于 prediction horizon。 |
| temporal ensemble | temporal ensemble | 已填写 | 对不同锚点产生、但指向同一执行时刻的重叠动作预测进行加权融合；可减小块边界抖动，也可能引入滞后。 |
| 行为克隆 | behavior cloning，BC | 已填写 | 把示范动作当作监督标签学习策略；离线误差较低仍可能因部署时协变量偏移而闭环失败。 |
| receding horizon | receding horizon | 已填写 | 预测较长动作块但只执行其前缀，随后根据新观测重新生成的滚动控制方式；兼顾动作连贯与闭环纠错。 |
| 动作缓冲 | action buffer | 已填写 | 在策略推理与高频控制之间保存尚未执行的动作序列；需要明确欠载降级、切换边界和 Context 版本。 |
| 过期 Context | stale context | 已填写 | 模型输出到达时，生成它所依据的观测或状态已与当前机器人明显不一致；过期结果应被检测、丢弃或重新规划。 |
| warm start | warm start | 已填写 | 用上一轮剩余动作或生成状态初始化新一轮规划，以减少计算或跳变；突发变化时也可能延续旧计划偏差。 |
| 策略 | policy \(\pi\) | 已填写 | 根据观测或上下文产生动作或动作分布的模型；不等同于负责跟踪目标和执行安全约束的底层控制器。 |
| 规划器 | planner | 已填写 | 根据目标、预测未来、代价和约束搜索动作序列的模块；它可以调用策略提供 proposal，但不等同于直接由输入产生动作的策略。 |
| CEM | cross-entropy method | 已填写 | 反复采样候选、选择低代价 elite，再用 elite 更新采样均值和方差的无梯度优化方法；分布过早收窄可能错过其他可行模式。 |
| 模型预测控制 | MPC | 已填写 | 从最新状态优化有限 horizon 动作序列，只执行短前缀，重新观测后再次规划的闭环控制方式；性能仍受模型偏差、求解延迟和执行频率限制。 |
| success detector | 成功判定器 | 已填写 | 根据状态、视觉关系或其他证据判断任务目标是否真正完成的模块；不应与只提供中间进展的稠密 reward 混为一谈。 |
| reward / cost | 奖励 / 代价 | 已填写 | 用于比较行为或未来的标量信号，通常分别按越大越好和越小越好约定；工程接口应固定符号，并保留目标、碰撞、能耗、平滑和风险等分项。 |
| reward shaping | 奖励塑形 | 已填写 | 在稀疏成功信号之外加入距离或阶段进展等稠密反馈以帮助学习或搜索；塑形不当会产生不完成真实任务也能得高分的捷径。 |
| model exploitation | 模型利用 | 已填写 | 规划器主动找到 World Model、reward 或 value 的错误区域并获得模型内高分，而真实执行结果很差；短 horizon、不确定性惩罚和真实约束只能缓解，不能自动消除。 |

## 模型家族

| 术语 | 英文 / 符号 | 状态 | 定义与易混点 |
|---|---|---|---|
| 自编码器 | AE | 已填写 | 由编码器和解码器组成，通过输入重建学习表示；瓶颈限制模型直接复制输入，但不保证表示适合机器人任务。 |
| 变分自编码器 | VAE | 已填写 | 把输入编码为潜变量分布，并通过重参数化采样和分布约束学习连续潜空间；重建质量与潜空间规整性之间需要权衡。 |
| 对比学习 | contrastive learning | 已填写 | 拉近正样本表示、推远负样本表示的学习方法；正负样本的定义决定模型最终把什么视为相同或不同。 |
| CLIP | Contrastive Language–Image Pre-training | 已填写 | 使用视觉与语言双编码器、归一化相似度和双向对比损失学习图文共同表示；可支持跨模态检索，但不会自动给出像素或三维位置。 |
| MAE | Masked Autoencoder | 已填写 | 遮住输入图像的大量 patch，只根据可见部分重建被遮挡内容的自编码学习方法；迫使编码器利用较大范围的结构信息。 |
| Attention | attention | 已填写 | 根据 Query 与 Key 的匹配权重，对 Value 进行加权读取；权重描述当前层的信息流，不应直接视为最终决策的因果解释。 |
| Self-Attention | self-attention | 已填写 | Query、Key 与 Value 来自同一组 token 的 Attention，使序列内部位置交换信息；没有位置编码时不能独自识别排列顺序。 |
| Cross-Attention | cross-attention | 已填写 | Query 与 Key/Value 来自不同序列的 Attention，可让动作查询读取多模态上下文，或让一种模态读取另一种模态。 |
| Transformer | Transformer | 已填写 | 由 Attention、逐 token 前馈网络、残差连接、归一化和位置信息组成的序列模型；其信息可见范围还取决于 mask。 |
| Diffusion | diffusion model | 已填写 | 通过已知前向加噪过程构造训练样本，再学习反向去噪生成数据的模型；动作应用中生成对象通常是归一化 Action Chunk。 |
| 噪声日程 | noise schedule，$\beta_k$ | 已填写 | 规定 Diffusion 各生成步加入或移除多少噪声的序列；会影响信噪比、训练难度与采样行为。 |
| classifier-free guidance | classifier-free guidance，CFG | 已填写 | 组合同一模型的条件与无条件预测以加强条件控制；权重过大可能降低多样性或把动作推离训练分布。 |
| Flow Matching | flow matching | 已填写 | 在选定概率路径上监督条件速度场，并通过常微分方程把简单噪声分布运输到数据分布的生成方法。 |
| function evaluation | function evaluation，NFE | 已填写 | 生成求解过程中调用神经网络的次数；比单写“采样步数”更接近实际计算成本，但仍需结合墙钟延迟和硬件报告。 |
| VLM | vision-language model | 待填写 | TODO |
| VLA | vision-language-action model | 待填写 | TODO |
| Context Model | context model | 已填写 | 按时间对齐多模态观测与历史动作，加入来源和有效性信息，再组织成任务相关向量或 token 集合 $C_t$；其输出是动作模型的条件，而非动作本身。 |
| Action Expert | action expert | 已填写 | 在上下文条件下生成单步动作、动作分块或动作分布；可采用自回归、Diffusion 或 Flow Matching。 |
| Action Model | action model | 已填写 | 本教程中由 Context Model 与 Action Expert 共同组成，前者形成条件，后者生成动作。 |
| 世界模型 | world model | 已填写 | 根据当前上下文和动作预测未来状态、观测或任务结果，用于理解变化、评价候选动作或规划。 |
| forward dynamics | forward dynamics | 已填写 | 根据当前状态或表示与动作预测下一状态、观测或潜表示；用于回答候选动作会造成什么后果。 |
| inverse dynamics | inverse dynamics | 已填写 | 根据当前与下一状态反推动作；可辅助表征和动作标注，但不能替代任意候选动作的 forward prediction。 |
| model bias | model bias | 已填写 | World Model 预测与真实环境转移之间的系统性偏差；多步 rollout 和规划器主动搜索会放大这种偏差。 |
| 残差预测 | residual prediction | 已填写 | 预测下一状态相对当前状态的变化，再加回当前状态；适合小时间步连续变量，但必须尊重角度、位姿等变量几何。 |
| belief | belief state，$b_t$ | 已填写 | 模型根据观测历史和已执行动作维护的内部状态分布或表示；它是对不可完全观测环境状态的推断，不等于可直接读取的真实状态。 |
| prior / posterior | 先验 / 后验 | 已填写 | 在潜状态模型中，prior 只依据历史预测当前潜状态，posterior 再利用当前真实观测修正该预测；无观测想象阶段只能沿 prior 前进。 |
| RSSM | recurrent state-space model | 已填写 | 将递归确定性状态与随机潜状态结合的状态空间模型；用 prior 支持想象，用 posterior 吸收新观测，并可预测观测、reward 与 episode continue。 |
| Dreamer | Dreamer | 已填写 | 一类在学习到的潜状态 World Model 中展开 imagined trajectories，并据此训练 actor 与 value 的方法族；想象质量仍受 model bias 和不确定性限制。 |
| aleatoric uncertainty | 随机不确定性 | 已填写 | 来自环境随机性或输入未包含因素的不可约变化；增加相同条件的数据可改善估计，但不一定能消除该随机性。 |
| epistemic uncertainty | 模型不确定性 | 已填写 | 来自训练覆盖不足或模型知识不足的不确定性；相关新数据通常可以降低它，ensemble 成员分歧是常见但不完美的近似。 |
| calibration | 校准 | 已填写 | 模型给出的概率或区间与长期实际频率相符的程度；区间覆盖率必须与区间宽度、horizon 和分布内外条件一起检查。 |
| ensemble | 模型集成 | 已填写 | 用不同初始化或数据重采样训练多个模型，并聚合其预测；成员均值分歧可提示模型未知，但共同偏差仍可能造成一致而错误的预测。 |
| V-JEPA | V-JEPA | 待填写 | TODO |
| VLA-JEPA | VLA-JEPA | 待填写 | TODO |

## 机器人部署

| 术语 | 英文 / 符号 | 状态 | 定义与易混点 |
|---|---|---|---|
| 本体状态 | proprioception | 已填写 | 机器人对自身关节、速度、力矩、末端与夹爪状态的测量或估计；不包含真机无法得到的仿真内部真值。 |
| 正向运动学 | forward kinematics，FK | 已填写 | 从关节构型 $q$ 计算末端位姿 $x_{\mathrm{ee}}$ 的映射。 |
| 雅可比 | Jacobian，$J(q)$ | 已填写 | 在当前构型附近连接关节速度与末端速度的局部线性映射；奇异构型附近可能退化。 |
| 触觉 | tactile sensing | 已填写 | 通过触觉阵列、力/力矩或夹爪信号观测局部接触、压力与滑移；必须明确坐标系和时间。 |
| Sim-to-real | sim-to-real | 待填写 | TODO |
| 闭环 | closed loop | 已填写 | 执行动作后重新读取观测，再根据新状态决定后续动作的过程；它能修正扰动和模型误差，但效果仍受观测、延迟与控制频率限制。 |
| 失败恢复 | recovery | 待填写 | TODO |
| 安全约束 | safety constraint | 待填写 | TODO |

## 填写约定

- 新增术语时，先补本表，再在章节中使用。
- 同一个概念不要同时发明两套符号。
- 需要展开的术语再链回对应章节，而不是在术语表里写完整讲义。
