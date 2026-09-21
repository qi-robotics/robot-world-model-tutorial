# PyTorch 基础

本附录只覆盖阅读和改写本教程最小示例所需的 PyTorch 接口，不替代官方文档。

## 本章解决什么问题

把公式里的张量形状落到代码里的 `Tensor` 上，避免读者在后续章节被 `B`、`T`、`D` 等维度卡住。

## 学习目标

- [ ] TODO：能创建、变形和检查张量形状
- [ ] TODO：能写一个最小的 `nn.Module` 前向过程
- [ ] TODO：能看懂训练循环中的 `loss.backward()` 发生在什么对象上

## 最小代码骨架

```python
import torch
from torch import nn


class Encoder(nn.Module):
    def __init__(self, in_dim: int, latent_dim: int) -> None:
        super().__init__()
        self.net = nn.Linear(in_dim, latent_dim)

    def forward(self, observation: torch.Tensor) -> torch.Tensor:
        # observation: [B, ...]
        raise NotImplementedError("附录示例待补充")
```

## 输入、输出与张量形状

| 名称 | 符号 | 示例形状 | 含义 |
|---:|---|---:|---|
| 观测批次 | `observation` | `[B, C, H, W]` | TODO |
| 潜状态 | `z` | `[B, D]` | TODO |
| 动作 | `action` | `[B, A]` 或 `[B, T, A]` | TODO |

## 与正文的关系

- 基础篇各章的“最小实现”默认假设读者能读懂本页骨架。
- 训练细节放到 [神经网络训练](../basics/neural-network-training.md)，本页不展开优化器选择结论。

## 常见误区

- TODO：把论文里的 \(B\times T\times D\) 和代码里的 `permute` 搞反
- TODO：在不需要梯度的 rollout 中忘记 `eval()` / `no_grad()`
