#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

if [[ ! -x "${ROOT}/.venv-colab/bin/python" ]]; then
  echo "错误：未找到 .venv-colab。请先按照 colab/README.md 安装本地 Notebook 环境。" >&2
  exit 1
fi

# 避免本机 ROS、OpenVINO 或其他项目的 Python/动态库路径污染 Notebook 环境。
unset PYTHONPATH
unset LD_LIBRARY_PATH
unset LD_PRELOAD

# 将 Matplotlib 缓存留在虚拟环境内，避免只读 HOME 或容器环境产生警告。
export MPLCONFIGDIR="${ROOT}/.venv-colab/.matplotlib"
mkdir -p "${MPLCONFIGDIR}"

if ! "${ROOT}/.venv-colab/bin/python" -c "import jupyterlab, numpy, matplotlib, torch" >/dev/null 2>&1; then
  echo "错误：Notebook 依赖不完整。请重新运行 colab/README.md 中的 pip install -r colab/requirements.txt。" >&2
  exit 1
fi

exec "${ROOT}/.venv-colab/bin/python" -m jupyter lab
