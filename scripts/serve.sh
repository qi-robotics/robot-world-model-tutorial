#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

source "${ROOT}/scripts/_common.sh"

resolve_mkdocs
echo "启动本地预览：http://127.0.0.1:8000"
echo "编辑 docs/**/*.md 并保存后，浏览器应自动刷新。"
exec "${MKDOCS}" serve --dev-addr=127.0.0.1:8000
