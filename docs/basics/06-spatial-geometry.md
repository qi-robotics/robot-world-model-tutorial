# 06 三维感知与坐标变换：从相机像素到机器人目标

第 03～04 章让模型从图像中提取目标线索，第 05 章让“红色杯子”这样的指令能够指定操作对象。即使视觉模块指出杯子中心在像素 $(420,260)$，机械臂仍不能据此移动：同一像素方向上可能有近处或远处的物体，相机坐标轴也未必与机器人基座坐标轴重合。

本章沿一条有物理单位的链路前进：**像素射线与深度 → 目标的三维点 → 相机到基座的坐标变换 → 抓取目标 → 误差检查**。视觉模型负责指出哪些像素属于目标；相机内参、深度和外参负责把这些证据变成空间量。几何计算不能代替目标识别，视觉特征也不能代替已知的相机安装关系。

| 小章 | 核心问题 |
| --- | --- |
| [06-1 相机成像与 RGB-D 反投影](06-1-camera-projection-and-backprojection.md) | 一个像素为何只确定射线？深度和内参怎样给出相机坐标中的三维点？ |
| [06-2 从目标区域到三维点云](06-2-target-region-and-point-cloud.md) | 检测框、分割和关键点怎样选出目标像素？多点深度怎样形成可检查的目标几何？ |
| [06-3 坐标系与刚体变换](06-3-coordinate-frames-and-transforms.md) | 同一物理点怎样从相机坐标转到机器人基座坐标？变换方向和旋转表示怎样核对？ |
| [06-4 从物体位置到抓取目标](06-4-object-pose-and-grasp-target.md) | 一个三维中心为何还不是抓取命令？抓取位姿、可达性与安全检查如何衔接？ |
| [06-5 几何误差与标定检查](06-5-geometric-error-and-calibration.md) | 像素、深度与外参误差会造成多大的机器人定位偏差？怎样逐段排查？ |

<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/06/06-01-rgbd-backprojection.ipynb" target="_blank" rel="noopener noreferrer">实践 06-01</a>对应前两节，从单个像素走到目标点云；<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/06/06-02-transforms-and-calibration-error.ipynb" target="_blank" rel="noopener noreferrer">实践 06-02</a>对应 06-3 与 06-5，把点变到基座并比较误差。两份实验使用人工场景与已知变换，不替代真实相机标定或真机抓取；Notebook 在新标签页打开。

读完本章，应能说清一个机器人目标的坐标系、单位、测量来源与误差，而不是只报告一组三维数字。第 07 章再把这个目标与机器人本体、触觉和动作接口连接起来。

[返回基础篇概览](index.md) · [开始阅读 06-1](06-1-camera-projection-and-backprojection.md)
