# 机器人世界模型教程

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

### 同一局域网内的其他电脑访问

默认的 `mkdocs serve` 通常只监听本机地址，因此同一局域网中的其他电脑无法直接访问。要临时分享本地预览页面，请在运行 MkDocs 的电脑上停止当前服务（终端按 `Ctrl+C`），然后让 MkDocs 监听所有网络接口：

```bash
mkdocs serve --dev-addr 0.0.0.0:8000
```

如果使用本项目的虚拟环境，也可以直接运行：

```bash
.venv/bin/mkdocs serve --dev-addr 0.0.0.0:8000
```

Windows 虚拟环境对应命令为：

```bat
.venv\Scripts\mkdocs.exe serve --dev-addr 0.0.0.0:8000
```

然后在运行服务的电脑上查询它在局域网中的 IPv4 地址：

- Linux：运行 `hostname -I`，选择类似 `192.168.1.23` 或 `10.0.0.15` 的地址。
- macOS：在“系统设置 → 网络”中查看当前 Wi-Fi 或以太网连接的 IP 地址；也可以在终端运行 `ipconfig getifaddr en0`（无线网络常用）。
- Windows：在命令提示符运行 `ipconfig`，查看当前 Wi-Fi 或以太网适配器的“IPv4 地址”。

在另一台连接同一局域网的电脑上，用浏览器访问：

```text
http://运行服务的电脑的局域网IP:8000
```

例如服务电脑的地址是 `192.168.1.23`，则访问 <http://192.168.1.23:8000>。两台电脑需要连到彼此可通信的同一网络；访客 Wi-Fi、客户端隔离或 VPN 设置可能会阻止设备互访。如果连接超时，请检查服务终端仍在运行，并确认电脑防火墙允许局域网内的 TCP 8000 端口连接。

`0.0.0.0` 是服务的监听地址，不是浏览器中要访问的地址。该设置会让当前预览服务可从本机的其他网络接口访问，因此只应在可信的局域网中临时使用；不需要时按 `Ctrl+C` 停止服务。不要为此在路由器上配置公网端口转发。

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
