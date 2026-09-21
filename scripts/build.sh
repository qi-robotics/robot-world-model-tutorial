#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

source "${ROOT}/scripts/_common.sh"

resolve_mkdocs
echo "正在构建静态网站到 site/"
exec "${MKDOCS}" build
