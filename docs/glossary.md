# 术语表

本表只列出教程后续会反复出现的术语槽位。定义将随正文填写，这里不提前给出未核对的技术结论。

*[VLM]: Vision-Language Model，视觉语言模型
*[VLA]: Vision-Language-Action model，视觉语言动作模型
*[JEPA]: Joint-Embedding Predictive Architecture
*[RSSM]: Recurrent State-Space Model
*[CNN]: Convolutional Neural Network，卷积神经网络
*[RGB-D]: 同时提供彩色图像与深度信息的视觉观测

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
| 动作 token | action token | 待填写 | TODO |
| 策略 | policy \(\pi\) | 已填写 | 根据观测或上下文产生动作或动作分布的模型；不等同于负责跟踪目标和执行安全约束的底层控制器。 |
| 规划器 | planner | 待填写 | TODO |
| 模型预测控制 | MPC | 待填写 | TODO |

## 模型家族

| 术语 | 英文 / 符号 | 状态 | 定义与易混点 |
|---|---|---|---|
| 自编码器 | AE | 已填写 | 由编码器和解码器组成，通过输入重建学习表示；瓶颈限制模型直接复制输入，但不保证表示适合机器人任务。 |
| 变分自编码器 | VAE | 已填写 | 把输入编码为潜变量分布，并通过重参数化采样和分布约束学习连续潜空间；重建质量与潜空间规整性之间需要权衡。 |
| 对比学习 | contrastive learning | 已填写 | 拉近正样本表示、推远负样本表示的学习方法；正负样本的定义决定模型最终把什么视为相同或不同。 |
| CLIP | Contrastive Language–Image Pre-training | 已填写 | 使用视觉与语言双编码器、归一化相似度和双向对比损失学习图文共同表示；可支持跨模态检索，但不会自动给出像素或三维位置。 |
| MAE | Masked Autoencoder | 已填写 | 遮住输入图像的大量 patch，只根据可见部分重建被遮挡内容的自编码学习方法；迫使编码器利用较大范围的结构信息。 |
| Attention | attention | 待填写 | TODO |
| Transformer | Transformer | 待填写 | TODO |
| Diffusion | diffusion model | 待填写 | TODO |
| VLM | vision-language model | 待填写 | TODO |
| VLA | vision-language-action model | 待填写 | TODO |
| Context Model | context model | 已填写 | 把当前多模态观测、历史动作、时间和有效位组织为任务相关上下文 $C_t$。 |
| Action Expert | action expert | 已填写 | 在上下文条件下生成单步动作、动作分块或动作分布；可采用自回归、Diffusion 或 Flow Matching。 |
| Action Model | action model | 已填写 | 本教程中由 Context Model 与 Action Expert 共同组成，前者形成条件，后者生成动作。 |
| 世界模型 | world model | 已填写 | 根据当前上下文和动作预测未来状态、观测或任务结果，用于理解变化、评价候选动作或规划。 |
| RSSM | recurrent state-space model | 待填写 | TODO |
| Dreamer | Dreamer | 待填写 | TODO |
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
