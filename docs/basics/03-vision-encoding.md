# 03 视觉编码：从像素到视觉特征

第 02 章用已经整理好的杯子位置和机器人状态学习动作预测，却还没有回答这些位置信息最初怎样从相机画面中得到。相机只提供带有颜色和位置的数值网格；把它交给神经网络之前，必须先确定图像张量与坐标的约定，再决定网络怎样提取和保留空间信息。

本章沿一条具体链路展开：**图像与预处理 → 局部卷积与多层特征 → 编码器输出接口 → 红色杯子定位检验**。第 03 章主要回答“怎样把像素变成可供下游使用的特征”，第 04 章再集中回答“不同训练目标会让特征学到什么”。

| 小章 | 要解决的问题 |
| --- | --- |
| [03-1 图像张量与视觉预处理](03-1-image-tensors-and-preprocessing.md) | RGB 数值怎样进入模型？缩放、裁剪、归一化为什么必须与坐标标签保持一致？ |
| [03-2 卷积与多层视觉特征](03-2-convolution-and-cnn-features.md) | 一个局部窗口怎样产生特征？步幅、填充、下采样和感受野怎样改变空间信息？ |
| [03-3 视觉编码器的输出表示](03-3-visual-encoder-outputs.md) | 全局向量、特征图和视觉 token 有何区别？如何按任务选择接口？ |
| [03-4 用目标定位检验视觉编码](03-4-object-localization-and-checks.md) | 怎样把特征变成杯子坐标？如何检查模型是否保留位置，而非只记住背景？ |

阅读时始终带着第 02 章的问题：输入换成图像后，网络的前向计算、损失与参数更新并未消失，只是多了一段将图像变为特征的过程。图 03-1 对应 03-2 的感受野，图 03-2 对应 03-3 的输出选择。两份<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/03/03-01-convolution-and-feature-maps.ipynb" target="_blank" rel="noopener noreferrer">配套卷积实践</a>与<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/03/03-02-train-cnn-for-object-position.ipynb" target="_blank" rel="noopener noreferrer">定位实践</a>分别在 03-2、03-4 展开；它们会在新标签页打开。

读完本章，应能从相机图像追踪到带位置含义的视觉特征，再说明为什么“能判断画面里有杯子”不等于“能指出杯子在哪里”。

[返回基础篇概览](index.md) · [开始阅读 03-1](03-1-image-tensors-and-preprocessing.md)
