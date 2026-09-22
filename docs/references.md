# 参考文献

本页按主题预留文献槽位。当前不填写具体论文条目，避免在框架阶段放入未核对或过时的引用。

填写时请同时给出：

- 完整参考文献信息
- 与本教程哪一章相关
- 读者应该从这篇文献里带走的一个问题，而不是一句空泛评价

## 表征学习

- Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun. [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385), 2015。对应第 03 章；重点理解残差块为何让新层学习 $F(X)$ 并保留输入旁路。
- Alexey Dosovitskiy et al. [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929), 2020。对应第 03 与第 14 章；重点理解图像 patch 怎样变成 token，而不是在第 03 章提前展开 Transformer。
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

- TODO：RSSM、Dreamer 与 world model
- TODO：视频预测与 latent dynamics
- TODO：V-JEPA、VLA-JEPA

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
