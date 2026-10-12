# 07 本体、触觉与动作：机器人怎样描述自身并执行指令

第 06 章已经把“红杯在哪里”转换为带坐标系和单位的三维信息。但机器人要接近并抓住杯子，还得知道自己当前的关节与夹爪状态、是否已接触物体，并说明下一条命令究竟控制什么。相机主要观察外部场景，本体与触觉补充机器人身体和接触的信息；动作接口则把模型提出的数值送往真实控制器。

作为基础篇的最后一章，本章沿“**身体状态 → 接触状态 → 动作语义 → 安全执行 → 统一数据契约**”展开。每一步都区分模型想做什么与传感器证实发生了什么。第 08 章开始将使用这些带时间含义的数据，构造可供动作生成读取的 Context。

| 小章 | 核心问题 |
| --- | --- |
| [07-1 本体状态与机械臂运动学](07-1-proprioception-and-kinematics.md) | 关节、末端和夹爪各表示什么？正向运动学、雅可比和逆运动学怎样连接两种空间？ |
| [07-2 力、触觉与接触状态](07-2-force-tactile-and-contact.md) | 视觉看见“靠近”与传感器测到“接触”有何不同？接触和滑移为什么需要时间信息？ |
| [07-3 动作空间与坐标语义](07-3-action-spaces-and-coordinate-semantics.md) | 七个动作数值可能控制什么？绝对目标、增量、速度和离散命令怎样区分？ |
| [07-4 动作尺度、频率与安全执行](07-4-action-scaling-and-execution.md) | 归一化输出怎样还原为物理命令？频率、延迟、限幅与控制反馈为什么都属于接口？ |
| [07-5 多模态观测—动作数据契约](07-5-observation-action-schema.md) | 怎样统一字段、时间、有效位和版本，并把基础篇交给进阶篇？ |

<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/07/07-01-two-link-forward-kinematics.ipynb" target="_blank" rel="noopener noreferrer">实践 07-01</a>对应 07-1 的二连杆运动学；<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/basics/07/07-02-observation-action-schema.ipynb" target="_blank" rel="noopener noreferrer">实践 07-02</a>对应 07-4、07-5 的动作还原和数据检查。两份 Notebook 都是教学模拟，不可当成真实机械臂的安全控制程序；它们在新标签页打开。

读完本章，应能说清视觉目标、本体读数、接触证据和动作命令如何在时间上相接，也能指出任何一个数组形状之外必须保留的物理约定。

[返回基础篇概览](index.md) · [开始阅读 07-1](07-1-proprioception-and-kinematics.md)
