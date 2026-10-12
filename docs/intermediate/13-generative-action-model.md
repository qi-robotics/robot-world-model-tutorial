# 13 生成式 Action Model：从候选动作到滚动执行

第 11 章规定了动作数据契约，第 12 章展示了怎样从噪声生成多种可能的动作。但能生成动作样本，还不等于机器人可以稳定执行：模型输出的数值要恢复成物理命令、经过约束检查，并在控制器持续运行的同时及时交出下一段动作。第 13 章把 Context Model、动作生成模块和执行环节连成一条实际数据流，也是进阶篇的收束。这里的“动作生成模块”是功能名称，指根据 Context 产生候选动作块的部分，不预设它一定采用哪一种网络或采样算法。

本章按“**谁生成 → 交出什么 → 怎样执行**”阅读：

| 阅读顺序 | 本节要回答的问题 |
|---|---|
| [13-1 Action Model 的组成与动作专家](13-1-action-experts.md) | Context Model、动作生成模块和后处理器各负责什么？自回归、ACT、Diffusion 与 Flow Matching 怎样产生动作块？ |
| [13-2 统一动作接口与滚动执行](13-2-action-interface-and-execution.md) | 不同生成方法怎样交出同样含义的候选？动作怎样恢复单位、通过检查，并只执行一部分？ |
| [13-3 推理延迟与动作块衔接](13-3-realtime-action-chunking.md) | 模型计算期间控制器怎样不断档？RTC 怎样接续旧块，完整系统又怎样评价？ |

图 13-1 至图 13-4 分别承担不同作用：先看模块边界，再看 ACT 训练与使用时不同的数据流，随后追踪统一候选进入执行器，最后沿绝对控制时刻读 RTC 接管过程。阅读中要特别区分：**生成动作**不等于**执行动作**，**约束检查**不等于**预测动作后果**。后一个问题将进入高级篇。

配套实践也依照这个顺序使用。读完 13-2 后，可在新标签页运行<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/intermediate/13/13-01-unified-action-expert.ipynb" target="_blank" rel="noopener noreferrer">实践 13-01：统一动作生成接口</a>，比较不同简化生成方法交出的候选；读完 13-3 后再运行<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/intermediate/13/13-02-buffered-receding-horizon.ipynb" target="_blank" rel="noopener noreferrer">实践 13-02：动作缓冲与异步执行</a>，观察推理延迟和过期结果。第二份实践不实现 RTC 的生成引导，不能把缓冲模拟结果当作 RTC 实验效果。

读完本章，学生应能说清一条候选动作如何从 Context 出发，经过动作生成模块、动作接口、物理检查和缓冲区，只执行前缀，再用新观测生成下一块；也应能指出这条链仍不知道候选动作将对环境造成什么影响。

[返回进阶篇概览](index.md) · [开始阅读 13-1](13-1-action-experts.md)
