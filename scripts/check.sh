#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

source "${ROOT}/scripts/_common.sh"

resolve_mkdocs
echo "正在执行严格构建：mkdocs build --strict"
exec "${MKDOCS}" build --strict
