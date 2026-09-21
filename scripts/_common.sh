#!/usr/bin/env bash
# 供 serve/build/check 脚本复用。调用前必须先 cd 到仓库根目录。

# 避免本机 ROS 或其他项目的 PYTHONPATH 干扰文档构建。
unset PYTHONPATH

resolve_mkdocs() {
  if [[ -x ".venv/bin/mkdocs" ]]; then
    MKDOCS=".venv/bin/mkdocs"
  elif command -v mkdocs >/dev/null 2>&1; then
    MKDOCS="$(command -v mkdocs)"
  else
    echo "错误：找不到 mkdocs。" >&2
    echo "请先创建虚拟环境并安装依赖：" >&2
    echo "  python3 -m venv .venv" >&2
    echo "  source .venv/bin/activate" >&2
    echo "  pip install -r requirements.txt" >&2
    return 1
  fi
}
