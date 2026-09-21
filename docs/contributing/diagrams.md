# 图示约定

图示的作用是降低模块边界的歧义，而不是装饰页面。

## 优先顺序

1. **Mermaid**：流程、模块图、闭环图。
2. **SVG / PNG**：需要精确几何或真实照片时。
3. **自定义可视化**：只有在静态图讲不清动态过程时才使用，见 [交互内容接口](interactive-content.md)。

## Mermaid

在 Markdown 中直接写：

```mermaid
flowchart LR
    A[Observation] --> B[Encoder]
    B --> C[Latent State]
```

约定：

- 节点短句化，避免在节点里写公式或长括号。
- 同一章里的模块名与正文、代码变量一致。
- 先画数据流向，再画训练损失；不要把两者混在一张拥挤的图里。
- 深色主题下依赖 Material 内置 Mermaid 样式，不要把文字颜色写死成浅灰。

## 静态资源位置

| 类型 | 目录 | 说明 |
|---|---|---|
| 插图 | `docs/assets/images/` | 照片、标志、封面图 |
| 图示 | `docs/assets/diagrams/` | 手工 SVG / 导出的结构图 |
| 视频 | `docs/assets/videos/` | 仅在确有必要时添加 |
| 小数据 | `docs/assets/data/` | 可视化用的小型 JSON，不要放大数据集 |

引用示例：

```markdown
![编码器示意](../assets/diagrams/encoder.svg)
```

## 文件命名

- 使用英文短横线：`latent-rollout.svg`
- 不要用空格或中文文件名
- 一张图只服务一个问题，避免 `final_v3_new.svg`

## 无障碍

- 给图片写有信息量的 alt 文本
- 不要只靠颜色区分“好/坏”或“真实/预测”
- 关键路径在正文里仍要用文字说一遍，避免图挂了就读不懂
