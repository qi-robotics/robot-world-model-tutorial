# 02 神经网络如何学习

第 01 章把现实交互整理为观测、动作和执行后的新观测，并说明了时间与物理含义。轨迹仍只是“当时发生了什么”的记录；模型要从许多示范中学会可用于新情境的输入—输出关系。本章围绕一个桌面到达任务，回答：**为什么调整网络参数，动作预测会逐渐接近示范？训练误差下降又为何不等于任务已经学会？**

为了先看清训练机制，本章使用已经整理成数值的机器人本体、物体与目标相对位置、触觉和接触信息。概念上的动作模型仍是 $\hat a_t=f_\theta(o_t,g)$；本章的结构化输入 $x_t$ 只是从完整观测与目标中选出的教学表示，并不意味着图像和语言不重要。第 03～05 章会再学习它们怎样形成可用特征。

| 小章 | 要解决的问题 |
| --- | --- |
| [02-1 从机器人轨迹定义学习任务](02-1-learning-task-from-trajectories.md) | 一条轨迹可以提出什么预测问题？为何不能只输入本体状态？结构化样本的输入与答案怎样配对？ |
| [02-2 神经网络的前向预测与非线性](02-2-forward-and-nonlinearity.md) | 线性层与激活函数各做什么？一条观测怎样逐层变成具有方向和单位的动作？ |
| [02-3 预测误差怎样更新网络参数](02-3-loss-gradient-and-update.md) | 损失怎样量化动作偏差？梯度、反向传播、优化器、batch 和 epoch 怎样完成训练？ |
| [02-4 从训练损失到真实任务表现](02-4-generalization-and-closed-loop.md) | 未见轨迹、过拟合和闭环任务结果怎样共同检验模型是否学会？ |

四节保持同一个学习任务：先定义可用信息与示范动作的关系，再计算当前预测，用误差更新参数，最后让模型面对未参与训练的轨迹和连续执行。图 02-1 至图 02-6 依次展示非线性动作关系、网络层次、激活函数、一次前向计算、梯度更新和训练/验证差别。

两份实践与正文分工一致。<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/02/02-01-forward-and-activation.ipynb" target="_blank" rel="noopener noreferrer">实践 02-01</a>配合 02-2 查看前向计算与激活函数；<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/02/02-02-training-and-generalization.ipynb" target="_blank" rel="noopener noreferrer">实践 02-02</a>配合 02-3、02-4 观察参数更新、未见位置预测和简化闭环到达。Colab 在新标签页打开，便于保留课程页面对照。

读完本章，应能解释一次训练迭代从样本、前向预测、损失到参数更新的顺序，也能指出为什么低训练损失不足以证明机器人会完成任务。下一章转向视觉输入：相机图像怎样变成网络能够使用、又不丢失关键空间位置的特征。

[返回基础篇概览](index.md) · [开始阅读 02-1](02-1-learning-task-from-trajectories.md)
