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
| 观测 | observation \(o_t\) | 待填写 | TODO |
| 潜状态 | latent state \(z_t\) | 待填写 | TODO |
| 编码器 | encoder \(E(\cdot)\) | 待填写 | TODO |
| 表征坍缩 | representation collapse | 待填写 | TODO |
| 重建 | reconstruction | 待填写 | TODO |
| 预测式表征 | joint-embedding / JEPA | 待填写 | TODO |
| 视觉编码器 | visual encoder，$E_{\mathrm{vis}}$ | 已填写 | 把像素映射为全局向量、空间特征图或视觉 token；输出是否保留位置取决于结构与训练目标。 |
| 感受野 | receptive field | 已填写 | 某个特征值能够受输入中多大区域影响；感受野大不等于仍有精细空间分辨率。 |
| 视觉 token | visual token | 已填写 | 与图像 patch 或特征图区域对应的特征向量；通常还需位置编码说明来源区域。 |
| token | token | 已填写 | tokenizer 划分出的离散语言单元，可以是字符、词或子词；token id 只是查表索引。 |
| padding mask | padding mask，$m$ | 已填写 | 标记序列中哪些位置是真实 token、哪些只是补齐；补齐位置不应参与 Attention、池化或损失。 |
| 任务向量 | goal embedding，$z^g$ | 已填写 | 由语言或其他目标输入得到的连续条件表示；不等于已经可验证的物理成功条件。 |

## 空间与几何

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
| 策略 | policy \(\pi\) | 待填写 | TODO |
| 规划器 | planner | 待填写 | TODO |
| 模型预测控制 | MPC | 待填写 | TODO |

## 模型家族

| 术语 | 英文 / 符号 | 状态 | 定义与易混点 |
|---|---|---|---|
| 自编码器 | AE | 待填写 | TODO |
| 变分自编码器 | VAE | 待填写 | TODO |
| 对比学习 | contrastive learning | 待填写 | TODO |
| CLIP | CLIP | 待填写 | TODO |
| MAE | Masked Autoencoder | 待填写 | TODO |
| Attention | attention | 待填写 | TODO |
| Transformer | Transformer | 待填写 | TODO |
| Diffusion | diffusion model | 待填写 | TODO |
| VLM | vision-language model | 待填写 | TODO |
| VLA | vision-language-action model | 待填写 | TODO |
| 世界模型 | world model | 待填写 | TODO |
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
| 闭环 | closed loop | 待填写 | TODO |
| 失败恢复 | recovery | 待填写 | TODO |
| 安全约束 | safety constraint | 待填写 | TODO |

## 填写约定

- 新增术语时，先补本表，再在章节中使用。
- 同一个概念不要同时发明两套符号。
- 需要展开的术语再链回对应章节，而不是在术语表里写完整讲义。
