# Colab 配套实践

本目录存放教程的可运行 Notebook。在线学习时可以从课程网站跳转到 Google Colab；作者在推送到 GitHub 前，也可以使用独立的本地环境检查显示效果。

## 本地环境

不要使用文档网站的 `.venv` 运行 Notebook。根目录 `.venv` 只负责 MkDocs；`.venv-colab` 会根据 `colab/requirements.txt` 安装 JupyterLab、NumPy、Matplotlib 和 CPU 版 PyTorch。

Linux 和 macOS：

```bash
python3 -m venv .venv-colab
env -u PYTHONPATH -u LD_LIBRARY_PATH -u LD_PRELOAD \
  .venv-colab/bin/python -m pip install --upgrade pip
env -u PYTHONPATH -u LD_LIBRARY_PATH -u LD_PRELOAD \
  .venv-colab/bin/python -m pip install -r colab/requirements.txt
./scripts/colab.sh
```

安装完成后可以先确认 PyTorch 来自这个独立环境：

```bash
.venv-colab/bin/python -c "import torch; print(torch.__version__)"
```

第一次安装 PyTorch 需要下载较大的 wheel，请等待命令完整结束。Linux 和 Windows 默认安装 CPU 版，不需要 CUDA；macOS 使用官方通用 wheel。

Windows PowerShell：

```powershell
python -m venv .venv-colab
.venv-colab\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r colab/requirements.txt
python -c "import torch; print(torch.__version__)"
python -m jupyter lab
```

JupyterLab 启动后，在文件浏览器中进入对应章节目录，例如 `colab/basics/03/` 或 `colab/intermediate/08/`，打开 Notebook，再选择 `Run → Run All Cells`。启动页中的 Python 3 内核就是 `.venv-colab` 的解释器，无需再次安装依赖。

启动脚本会主动清除本机 ROS、OpenVINO 或其他工程留下的 `PYTHONPATH`、`LD_LIBRARY_PATH` 和 `LD_PRELOAD`，避免系统包覆盖 `.venv-colab` 中的 NumPy、Matplotlib 和 Jupyter 依赖。

如果环境是在本次更新前创建的，不必删除重建，重新执行安装命令即可补上 PyTorch：

```bash
env -u PYTHONPATH -u LD_LIBRARY_PATH -u LD_PRELOAD \
  .venv-colab/bin/python -m pip install -r colab/requirements.txt
```

## 在 VS Code 中运行

安装 VS Code 的 Python 和 Jupyter 扩展。打开 Notebook 后，点击右上角的内核名称，选择 `.venv-colab` 对应的 Python 解释器。不要选择项目的 `.venv`，也不要选择系统 Python。

Linux 环境下解释器通常位于：

```text
.venv-colab/bin/python
```

Windows 环境下通常位于：

```text
.venv-colab\Scripts\python.exe
```

如果 VS Code 是从已经加载 ROS 环境的终端启动，并仍然出现 NumPy、Matplotlib 或其他系统包冲突，可以关闭该 VS Code 窗口，然后从仓库根目录使用下面的命令重新打开：

```bash
env -u PYTHONPATH -u LD_LIBRARY_PATH -u LD_PRELOAD code .
```

## 推送前检查

依次执行所有单元格，确认：

- 没有红色错误输出；
- 所有图像均能正常显示；
- 修改练习参数后仍能从头运行；
- 每一行非空代码都有说明其实际作用的中文注释；
- Notebook 不依赖本机绝对路径；
- Notebook 中没有账号、密钥或私人数据。
- `import torch`、`import numpy` 和 `import matplotlib` 均来自 `.venv-colab`。

本地运行生成的单元格输出可以用于检查，但是否保留在提交中应保持一致。当前建议提交前清空输出，让学生打开后按顺序运行。
