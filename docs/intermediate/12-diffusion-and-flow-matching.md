# 12 Diffusion 与 Flow Matching：生成连续动作

第 11 章从示范轨迹得到动作标签，训练了根据 Context 预测动作块的模型，也看到了单值预测的限制：同一情境下，左绕和右绕都可能成功，平均两条示范却可能撞上障碍。第 12 章因此转向**生成式动作模型**：模型不是只交出一个平均答案，而是从随机数出发，形成一条完整的连续动作序列。这里的“生成”发生在机器人执行之前，不等于机器人已经移动。

本章以第 10 章的任务 Context $C_t$ 为条件，以第 11 章定义的未来动作块为输出。阅读时请始终区分：机器人轨迹中的时刻 $t$、动作块内未来各步的位置，以及模型从噪声走向动作的生成进度。三者都涉及“时间”，但分别回答“何时观测”“何时执行”和“生成到了哪一步”。

| 阅读顺序 | 本节要回答的问题 |
|---|---|
| [12-1 Diffusion：构造带噪动作与训练目标](12-1-diffusion-training.md) | 怎样由一段真实示范造出带噪输入和已知的噪声答案？ |
| [12-2 Diffusion 的生成：从噪声到动作块](12-2-diffusion-sampling.md) | 训练好的网络怎样估计整段动作的噪声，采样器又怎样反复调用它完成生成？ |
| [12-3 Flow Matching：学习从噪声到动作的速度](12-3-flow-matching.md) | 怎样从随机噪声和示范动作构造速度监督，再沿速度场生成？ |
| [12-4 生成动作的约束与评价](12-4-action-generation-in-robotics.md) | 两种方法如何接到同一个动作接口，生成结果何时才可用于机器人？ |

12-1 与 12-2 合起来才是一条完整的 Diffusion 路线：前者讲训练，后者讲生成。12-3 转而讲另一条解决同一问题的 Flow Matching 路线；它不是 Diffusion 生成的后续步骤。12-4 再把两种方法的输出放到同一机器人动作接口下检查。

两份实践使用相同的二维条件双峰动作任务：它把完整动作块压缩为便于画图的二维点，用来展示训练输入、监督答案和生成轨迹，而不是模拟真实机械臂。建议先读 12-1、12-2，再运行<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/intermediate/12/12-01-conditional-diffusion.ipynb" target="_blank" rel="noopener noreferrer">实践 12-01：条件 Diffusion</a>；读完 12-3 再运行<a href="https://colab.research.google.com/github/qi-robotics/robot-world-model-tutorial/blob/main/colab/intermediate/12/12-02-conditional-flow-matching.ipynb" target="_blank" rel="noopener noreferrer">实践 12-02：条件 Flow Matching</a>。两份 Notebook 的具体看图方法分别写在对应小章末尾，链接将在新标签页打开，便于同时查看课程正文。

读完本章，学生应能说清两种方法各自如何形成训练题目、网络为什么输出与动作块同形状的数值、使用时为什么需要反复调用网络，以及为什么生成的候选动作仍要经物理约束和闭环任务检验。第 13 章会把这些生成方法接入完整 Action Model 的执行流程。

[返回进阶篇概览](index.md) · [开始阅读 12-1](12-1-diffusion-training.md)
