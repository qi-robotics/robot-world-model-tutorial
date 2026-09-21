# 实践项目

实践项目用来把分散章节重新接成系统。每个项目都先追求“最小可运行”，再追求效果。

当前仓库只建立项目说明和目录，不提供完整实现。

## 项目阶梯

```mermaid
flowchart LR
    P1["表征学习"] --> P2["多模态对齐"]
    P2 --> P3["动作条件预测"]
    P3 --> P4["Mini-VLA"]
    P4 --> P5["迷你世界模型系统"]
```

| 项目 | 目标 | 对应目录 | 状态 |
|---|---|---|---|
| [表征学习小项目](representation-learning.md) | 得到一组可检查的视觉/状态表示 | `examples/01-autoencoder/`、`examples/02-contrastive-learning/` | 占位 |
| [多模态对齐小项目](multimodal-alignment.md) | 让图像和语言可以比较 | 待补充示例目录 | 占位 |
| [动作条件预测](action-conditioned-prediction.md) | 给定当前状态和动作，预测下一步 | `examples/06-latent-dynamics/` | 占位 |
| [Mini-VLA](mini-vla.md) | 输入图像和指令，输出动作 | `examples/07-mini-vla/` | 占位 |
| [迷你世界模型系统](final-world-model-system.md) | 生成动作、预测后果、选择并闭环 | `examples/08-mini-world-model/` | 占位 |

## 共同要求

每个项目页都预留了以下栏目：

- 要验证的能力，而不是要复现的论文名字
- 输入 / 输出协议
- 最小成功标准
- 与教程章节的回看关系
- 失败时最可能坏在哪一层

## 建议用法

1. 先读对应阶段总览，再做项目。
2. 项目做不下去时，回到具体章节补缺口，而不是直接换更大模型。
3. 实验记录使用 [实验记录模板](../appendices/experiment-template.md)。
