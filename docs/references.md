# 参考文献

本页按主题收录已经核对的原始论文与官方项目。未完成主题继续保留待补条目，不将其视为已写课程。

填写时请同时给出：

- 完整参考文献信息
- 与本教程哪一章相关
- 读者应该从这篇文献里带走的一个问题，而不是一句空泛评价

## 表征学习

- Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun. [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385), 2015。对应第 03 章；重点理解残差块为何让新层学习 $F(X)$ 并保留输入旁路。
- Alexey Dosovitskiy et al. [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929), 2020。对应第 03 与第 09 章；重点理解图像 patch 怎样变成 token，而不是在第 03 章提前展开 Transformer。
- TODO：自编码器、VAE、对比学习
- TODO：CLIP 与多模态对齐
- TODO：MAE、JEPA 与表征坍缩

## 序列模型与生成模型

- Rico Sennrich, Barry Haddow, Alexandra Birch. [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909), 2015。对应第 05 章；重点理解子词怎样缓解固定词表的未登录词问题。
- Taku Kudo, John Richardson. [SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing](https://arxiv.org/abs/1808.06226), 2018。对应第 05 章；重点理解 tokenizer 是可复现的模型接口，而不是随意替换的字符串预处理。
- TODO：Attention 与 Transformer
- TODO：自回归模型
- TODO：Diffusion

## 视觉语言与动作模型

- TODO：VLM
- TODO：visual grounding
- TODO：VLA、ACT、Diffusion Policy

## 世界模型与预测式架构

- Gaoyue Zhou, Hengkai Pan, Yann LeCun, Lerrel Pinto. [DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning](https://arxiv.org/abs/2411.04983), 2024。对应第 15—16 章；关注固定视觉特征、动作条件预测与目标图像规划之间的数据流。
- Lucas Maes, Quentin Le Lidec, Damien Scieur, Yann LeCun, Randall Balestriero. [LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels](https://le-wm.github.io/), 2026。对应第 15 章；区分未来特征监督与防止坍缩的分布约束。
- Danijar Hafner, Wilson Yan, Timothy Lillicrap. [Training Agents Inside of Scalable World Models](https://arxiv.org/abs/2509.24527), 2025；[作者项目](https://danijar.com/project/dreamer4/)。对应第 17 章；关注 Dreamer 4 的因果视频编码、shortcut forcing、任务适配与想象中的策略改进，不用旧版 RSSM 替代其架构。
- Meta. [V-JEPA 2 官方项目](https://ai.meta.com/research/vjepa/)。对应第 15 章延伸阅读；区分视频表征预训练与动作条件机器人适配。
- Galilai Group. [stable-worldmodel 官方代码与说明](https://github.com/galilai-group/stable-worldmodel)。对应第 14—16 章项目阅读；固定版本后再核对数据、模型与规划器接口，不将其当作 Dreamer 4 官方实现。

## 规划、控制与机器人部署

- Richard Hartley, Andrew Zisserman. *Multiple View Geometry in Computer Vision*, 2nd ed., Cambridge University Press, 2004。对应第 04 章；重点核对投影矩阵、相机坐标和多视角几何的统一符号。
- Kevin M. Lynch, Frank C. Park. *Modern Robotics: Mechanics, Planning, and Control*, Cambridge University Press, 2017。对应第 06 章；重点理解正向运动学、雅可比、奇异构型以及控制接口之间的关系。
- TODO：MPC 与 model-based RL
- TODO：泛化与 sim-to-real
- TODO：安全控制与失败恢复

## 阅读方法

阅读论文时，建议使用 [论文阅读模板](appendices/paper-reading-template.md)。把文献放进教程时，优先回答：

1. 它解决了上一章的哪个遗留问题？
2. 它的输入、输出和假设是什么？
3. 它在完整世界模型闭环里占据哪一段？
