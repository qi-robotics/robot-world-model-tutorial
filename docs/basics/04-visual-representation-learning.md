# 04 视觉表征学习：编码器怎样学到有用特征

第 03 章已经把图像变成全局向量、空间特征图或视觉 token，并用红色杯子定位检验其中是否还有位置线索。不过，选定编码器结构并不能决定它最终保存什么：在同样的图像和网络上，要求判断类别、恢复图像或预测缺失区域，会产生不同的参数更新方向。本章接着回答：**训练目标怎样塑造视觉表征，怎样判断它是否适合机器人任务？**

全章仍以桌面上的红色杯子为例。杯子的类别、颜色、位置、遮挡和背景都可能出现在图像中，但后续操作只需要其中一部分信息。我们先建立“训练目标与任务信息”的关系，再比较三组不依赖逐张人工位置标签的方法，最后把结果交给统一的任务检验。

| 小章 | 核心问题 |
| --- | --- |
| [04-1 视觉表征与训练目标](04-1-representation-and-objectives.md) | 相同形状的特征为什么可能保存不同信息？监督信号和数据偏差如何影响编码器？ |
| [04-2 重建式表征学习：AE、VAE 与 MAE](04-2-reconstruction-ae-vae-mae.md) | 完整重建、概率潜变量、遮挡重建各要求编码器做什么？为什么重建清晰不等于容易控制？ |
| [04-3 对比式表征学习与样本关系](04-3-contrastive-representation.md) | 正样本、其他样本和增强怎样规定“相同”与“不同”？ |
| [04-4 预测式表征学习与 JEPA](04-4-predictive-representation-jepa.md) | 不恢复像素，怎样根据可见内容预测目标区域的特征？它与动作条件未来预测有何边界？ |
| [04-5 视觉表征的任务检验与使用](04-5-evaluation-and-use.md) | 怎样用位置读取、受控变化和坍缩检查，判断表征能否交给后续模型？ |

两份实践分别配合 04-2 和 04-3～04-5：<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/04/04-01-reconstruction-representations.ipynb" target="_blank" rel="noopener noreferrer">实践 04-01</a>比较 AE、VAE、简化 MAE 的重建与位置读取；<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/04/04-02-contrastive-and-predictive-representations.ipynb" target="_blank" rel="noopener noreferrer">实践 04-02</a>比较对比式与简化预测式表征。Notebook 采用轻量教学模型，不是原论文架构的完整复现；链接在新标签页打开。

读完本章，应能分清编码器的**输出形状**、训练它的**学习目标**与检验它的**机器人任务**。第 05 章将在此基础上加入语言，让“红色杯子”这类任务描述与视觉内容建立对应。

[返回基础篇概览](index.md) · [开始阅读 04-1](04-1-representation-and-objectives.md)
