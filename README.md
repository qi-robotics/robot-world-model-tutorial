# 从编码到行动

机器人世界模型渐进式教程。从张量、编码与表征学习出发，逐步走向 Attention、生成模型、VLM、VLA、世界模型与机器人闭环行动。

- 文档站点：<https://qi-robotics.github.io/robot-world-model-tutorial/>
- 仓库：<https://github.com/qi-robotics/robot-world-model-tutorial>

当前仓库已经完成基础篇七章正文、配套图示与 15 份 Colab Notebook，并搭好可长期维护的文档网站框架。进阶篇和高级篇将按学习路线继续编写与验证。

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
现实交互如何成为训练数据
→ 像素如何成为视觉表征
→ 语言和几何如何明确任务目标
→ 身体状态与动作如何形成接口
→ 模型如何从历史构建 Context
→ Action Expert 如何生成动作序列
→ 世界模型如何预测动作后果
→ Planner / Policy 如何选择动作
→ 机器人如何根据新观测闭环纠错
```

三个阶段：

| 阶段 | 核心问题 | 入口 |
|---|---|---|
| 基础篇 | 观测与动作怎样成为模型接口 | `docs/basics/` |
| 进阶篇 | 机器人怎样生成动作并预见变化 | `docs/intermediate/` |
| 高级篇 | 机器人如何为了目标行动 | `docs/advanced/` |

实践项目在 `docs/projects/`，章节配套 Notebook 在 `colab/`，可复用示例在 `examples/`。

## 仓库布局

```text
docs/          Markdown 教程正文
colab/         可在 Colab 或本地运行的章节实践
examples/      可复用的项目示例与说明
scripts/       本地预览、构建与检查脚本
.github/       Issue / PR 模板与 GitHub Actions
```

## 依赖

文档站点只依赖 `requirements.txt` 中锁定的 MkDocs 构建工具，不依赖后端服务，也不把 PyTorch 或仿真器放进 Pages 构建。

## 许可证与作者

许可证、作者与最终引用信息待补充。在根目录出现 `LICENSE` 之前，请不要默认可以任意再分发。

## 贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md) 与 [写作指南](docs/contributing/writing-guide.md)。
