# 从编码到行动

机器人世界模型渐进式教程。从张量、编码与表征学习出发，逐步走向 Attention、生成模型、VLM、VLA、世界模型与机器人闭环行动。

- 文档站点：<https://qi-robotics.github.io/robot-world-model-tutorial/>
- 仓库：<https://github.com/qi-robotics/robot-world-model-tutorial>

当前仓库已经搭好可长期维护的文档网站框架。各章节是结构化占位页，便于之后直接填写正文，而不是从零设计目录。

## 本地预览

需要 Python 3.10 或更高版本。

### Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

### Windows

```bat
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
```

浏览器打开 <http://127.0.0.1:8000>。之后编辑任意 `docs/**/*.md` 并保存，页面会自动刷新。

如果使用 Make：

```bash
make setup
make serve
```

也可以运行：

```bash
./scripts/serve.sh
```

## 构建与检查

```bash
mkdocs build --strict
```

等价命令：

```bash
make check
./scripts/check.sh
```

`site/` 是生成结果，不要提交。

## GitHub Pages

推送到 `main` 后，GitHub Actions 会安装 `requirements.txt` 中的固定依赖，执行 `mkdocs build --strict`，并使用官方 artifact 流程部署。

请在 GitHub 网页端确认：

```text
Settings
→ Pages
→ Build and deployment
→ Source
→ GitHub Actions
```

项目型 GitHub Pages 地址为：

```text
https://qi-robotics.github.io/robot-world-model-tutorial/
```

## 教程结构

能力演进：

```text
现实世界如何变成数字
→ 数字如何变成特征
→ 特征如何表示当前状态
→ 模型如何关联历史信息
→ 模型如何表达多个未来
→ 语言如何定义任务目标
→ 模型如何生成机器人动作
→ 世界模型如何预测动作后果
→ Planner / Policy 如何选择动作
→ 机器人如何根据新观测闭环纠错
```

三个阶段：

| 阶段 | 核心问题 | 入口 |
|---|---|---|
| 基础篇 | 世界如何被表示 | `docs/basics/` |
| 进阶篇 | 世界如何变化 | `docs/intermediate/` |
| 高级篇 | 机器人如何为了目标行动 | `docs/advanced/` |

实践项目在 `docs/projects/`，配套代码目录在 `examples/`。

## 仓库布局

```text
docs/          Markdown 教程正文
examples/      最小代码示例（当前为占位）
notebooks/     探索性笔记本（默认不嵌入站点）
scripts/       本地预览、构建与检查脚本
.github/       Issue / PR 模板与 GitHub Actions
```

## 依赖

文档站点只依赖 `requirements.txt` 中锁定的 MkDocs 构建工具，不依赖后端服务，也不把 PyTorch 或仿真器放进 Pages 构建。

## 许可证与作者

许可证、作者与最终引用信息待补充。在根目录出现 `LICENSE` 之前，请不要默认可以任意再分发。

## 贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md) 与 [写作指南](docs/contributing/writing-guide.md)。
