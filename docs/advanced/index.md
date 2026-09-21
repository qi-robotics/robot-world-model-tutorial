# 高级篇：机器人如何为了目标行动

核心问题：

> 机器人如何理解语言任务、生成动作、预测后果并闭环执行？

高级篇把前面的编码器、序列模型和动力学模型接到机器人系统里：语言成为任务接口，动作成为输出，世界模型成为对后果的想象，planner / policy 负责选择，真机部署要求还能纠错和变安全。

## 本阶段要打通的能力

```text
语言如何定义任务目标
→ 模型如何生成机器人动作
→ 世界模型如何预测动作后果
→ Planner / Policy 如何选择动作
→ 机器人如何根据新观测闭环纠错
```

```mermaid
flowchart LR
    L["语言目标"] --> VLM["VLM / Grounding"]
    VLM --> VLA["VLA 生成动作"]
    VLA --> WM["世界模型预测后果"]
    WM --> PL["Planner / Policy"]
    PL --> R["执行"]
    R --> F["新观测 / 失败恢复"]
    F --> VLM
```

## 章节地图

| 章节 | 要补上的缺口 | 状态 |
|---|---|---|
| [视觉语言模型](vlm.md) | 语言如何理解视觉世界 | 占位 |
| [Visual Grounding](visual-grounding.md) | 语言如何落到物体、空间和可操作区域 | 占位 |
| [视觉语言动作模型](vla.md) | 如何从视觉和语言直接生成动作 | 占位 |
| [动作表示](action-representation.md) | 连续动作、token、chunk、ACT 与 Diffusion Policy | 占位 |
| [世界模型](world-model.md) | 如何把“预测后果”变成系统模块 | 占位 |
| [RSSM 与 Dreamer](rssm-and-dreamer.md) | 经典隐变量世界模型如何工作 | 占位 |
| [V-JEPA](v-jepa.md) | 如何在表示空间预测视觉未来 | 占位 |
| [VLA-JEPA](vla-jepa.md) | 如何把动作生成和世界预测放到同一套预测式架构中 | 占位 |
| [规划与策略](planning-and-policy.md) | 谁来在候选未来中做选择 | 占位 |
| [泛化](generalization.md) | 新物体、新指令、新布局时什么会坏掉 | 占位 |
| [Sim-to-Real](sim-to-real.md) | 仿真里学到的东西如何迁移到真机 | 占位 |
| [安全与失败恢复](safety-and-recovery.md) | 失败后如何停、如何退、如何重新规划 | 占位 |

## 学完高级篇应该能解释

- [ ] VLM 和 VLA 差在哪一个输出接口
- [ ] 世界模型为什么不是 VLA 的替代品，而是对动作后果的补充
- [ ] JEPA 类方法为什么把预测目标放在表示空间
- [ ] 一个最小闭环系统需要哪些模块，哪些可以先用占位实现

## 本阶段结束后去哪里

高级篇之后，应进入 [实践项目](../projects/index.md)，把模块接成可运行的最小系统，而不是继续增加名词。
