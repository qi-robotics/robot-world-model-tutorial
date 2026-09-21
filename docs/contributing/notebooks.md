# 笔记本约定

Jupyter 笔记本适合探索实验，不适合作为本教程的主叙事。主叙事永远写在 `docs/**/*.md`。

## 目录

- 网站正文：`docs/`
- 可执行示例：`examples/`
- 探索性笔记本：`notebooks/`

当前站点 **没有** 启用 `mkdocs-jupyter`。因此 `notebooks/` 里的文件不会自动出现在 GitHub Pages 中。这是有意为之：避免文档构建依赖 PyTorch 或其他训练栈。

## 以后若要嵌入笔记本

只有在确认读者确实需要“打开页面就能看到执行结果”时，再考虑增加插件。届时需要：

1. 把稳定版本写入 `requirements.txt`
2. 明确哪些笔记本进入 `nav`
3. 保证 `mkdocs build --strict` 仍能在 GitHub Actions 的精简环境中运行

在此之前，章节中的“最小实现”应链接到 `examples/` 或给出短代码块。

## 笔记本文件名

使用数字前缀，并与章节或项目对应：

```text
notebooks/01-autoencoder.ipynb
notebooks/07-mini-vla.ipynb
```

每个笔记本开头用 Markdown 单元格写清：

- 对应教程章节
- 依赖
- 期望在什么硬件上运行
- 它验证哪一个问题，而不是“运行某个模型”

## 与章节的关系

章节负责解释问题、符号和模块位置；笔记本负责试错。如果实验结果改变了我们对模块的理解，先改章节正文，再保留笔记本。
