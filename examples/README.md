# Examples

本目录存放与教程章节对应的最小可运行示例。当前只有说明文件，代码随正文填写。

训练、仿真和真机依赖不要写进仓库根目录的 `requirements.txt`。每个示例如需独立依赖，在该示例目录内自行声明。

| 目录 | 对应能力 | 主要回看章节 |
|---|---|---|
| `01-autoencoder/` | 压缩表示 | 基础篇 · 自编码器 |
| `02-contrastive-learning/` | 可比较嵌入 | 基础篇 · 对比学习 |
| `03-attention/` | 按查询选择信息 | 进阶篇 · Attention |
| `04-transformer/` | 序列骨干 | 进阶篇 · Transformer |
| `05-diffusion/` | 多峰连续生成 | 进阶篇 · Diffusion |
| `06-latent-dynamics/` | 动作条件潜空间预测 | 进阶篇 · 潜空间动力学 |
| `07-mini-vla/` | 视觉语言到动作 | 实践项目 · Mini-VLA |
| `08-mini-world-model/` | 预测后果并选择动作 | 实践项目 · 迷你世界模型系统 |

每个示例 README 应包含：目标、输入输出、如何运行、以及它不声称已经解决的问题。
