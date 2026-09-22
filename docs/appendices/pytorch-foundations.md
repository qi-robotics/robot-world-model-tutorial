# PyTorch 基础

本附录只覆盖阅读和改写本教程最小示例所需的 PyTorch 接口，不替代官方文档。

## 本章解决什么问题

把公式里的张量形状落到代码里的 `Tensor` 上，避免读者在后续章节被 `B`、`T`、`D` 等维度卡住。

## 学习目标

- [ ] TODO：能创建、变形和检查张量形状
- [ ] TODO：能写一个最小的 `nn.Module` 前向过程
- [ ] TODO：能看懂训练循环中的 `loss.backward()` 发生在什么对象上

## 代码实践

!!! example "代码统一放在 Notebook 中"
    网页附录只解释 PyTorch 概念和张量接口。可执行实现由各章配套 Notebook 提供，安装与本地运行方法见[环境准备](../setup.md)。

## 输入、输出与张量形状

| 名称 | 符号 | 示例形状 | 含义 |
|---:|---|---:|---|
| 观测批次 | `observation` | `[B, C, H, W]` | TODO |
| 潜状态 | `z` | `[B, D]` | TODO |
| 动作 | `action` | `[B, A]` 或 `[B, T, A]` | TODO |

## 与正文的关系

- 基础篇各章的 Notebook 默认读者理解本页介绍的张量与模块接口。
- 训练细节放到 [神经网络训练](../basics/neural-network-training.md)，本页不展开优化器选择结论。

## 常见误区

- TODO：把论文里的 \(B\times T\times D\) 和代码里的 `permute` 搞反
- TODO：在不需要梯度的 rollout 中忘记 `eval()` / `no_grad()`
