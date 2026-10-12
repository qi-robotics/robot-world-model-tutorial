# 01 机器人眼中的世界

人看到桌上的红色杯子和盒子，听到“把红色杯子放进盒子里”，通常能把物体、目标与行动顺序联系起来。机器人得到的却是相机像素、关节读数和控制命令。为了让模型从交互中学习，必须先说明这些数据分别代表什么、何时产生、怎样相互对应。

本章不训练复杂模型，而是建立整门课程共同使用的数据语言。沿同一个杯子任务，四个小章依次完成从现实测量到模型输入的转换：

| 小章 | 要解决的问题 |
| --- | --- |
| [01-1 从现实任务到机器人观测](01-1-robot-observation.md) | 目标、观测、真实状态、内部表示与动作各指什么？机器人为什么要反复观察？ |
| [01-2 决策、后果与交互轨迹](01-2-policy-and-trajectory.md) | 策略和后果预测有什么区别？观测与实际动作怎样按时间组成一次转移和完整任务？ |
| [01-3 多传感器时间对齐与空间语义](01-3-synchronization-and-coordinates.md) | 相机、关节与控制记录怎样按时间对齐？坐标系、单位和命令语义为什么不可省略？ |
| [01-4 张量组织与机器人数据契约](01-4-tensors-and-data-contract.md) | 含多次动作的轨迹怎样形成张量？变长数据如何标记？字段说明怎样保留物理含义？ |

这四节是一条连续的数据链，而非四种并列模型：现实任务产生测量与动作，动作连接前后观测，来自不同设备的记录要对齐，整理后的轨迹才能成为带明确含义的张量。读完后，应能指出一条交互记录的执行前输入、实际动作和执行后观测，并解释为何“数组形状正确”仍不保证数据在时间或物理意义上正确。

本章有两份轻量 Colab 实践。<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/01/01-01-observation-and-trajectory.ipynb" target="_blank" rel="noopener noreferrer">实践 01-01</a>配合 01-2 查看观测、动作和轨迹的顺序；<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/01/01-02-tensor-shapes.ipynb" target="_blank" rel="noopener noreferrer">实践 01-02</a>配合 01-4 查看图像、本体、动作、语言和有效位置标记的张量形状。它们都在新标签页中打开，便于一边练习一边保留课程正文。实验使用人工生成的数据，不代表真实机器人的运动精度。

第 02 章将接着回答：这些输入与答案明确以后，神经网络怎样调整参数去学习一个任务？训练误差下降又为什么不一定等于机器人真正会完成任务？

[返回基础篇概览](index.md) · [开始阅读 01-1](01-1-robot-observation.md)
