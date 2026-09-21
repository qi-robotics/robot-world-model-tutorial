PYTHON ?= python3
VENV ?= .venv
VENV_BIN := $(VENV)/bin
MKDOCS := $(VENV_BIN)/mkdocs
export PYTHONPATH :=

.PHONY: help setup serve build check

help:
	@echo "从编码到行动 · 常用命令"
	@echo "  make setup  创建虚拟环境并安装依赖"
	@echo "  make serve  启动本地实时预览"
	@echo "  make build  构建静态网站"
	@echo "  make check  执行 mkdocs build --strict"

setup:
	@if [ ! -x "$(PYTHON)" ] && ! command -v $(PYTHON) >/dev/null 2>&1; then \
		echo "错误：找不到 $(PYTHON)。请先安装 Python 3.10+。" >&2; \
		exit 1; \
	fi
	@if [ ! -d "$(VENV)" ]; then \
		echo "正在创建虚拟环境：$(VENV)"; \
		$(PYTHON) -m venv "$(VENV)"; \
	else \
		echo "已检测到虚拟环境：$(VENV)，将直接安装依赖"; \
	fi
	@if [ ! -x "$(VENV_BIN)/python" ]; then \
		echo "错误：虚拟环境不完整，缺少 $(VENV_BIN)/python" >&2; \
		exit 1; \
	fi
	"$(VENV_BIN)/python" -m pip install --upgrade pip
	"$(VENV_BIN)/python" -m pip install -r requirements.txt
	@echo "安装完成。激活环境：source $(VENV)/bin/activate"

serve: $(MKDOCS)
	"$(MKDOCS)" serve --dev-addr=127.0.0.1:8000

build: $(MKDOCS)
	"$(MKDOCS)" build

check: $(MKDOCS)
	"$(MKDOCS)" build --strict

$(MKDOCS):
	@echo "错误：未找到 $(MKDOCS)。请先运行 make setup，或执行：" >&2
	@echo "  python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt" >&2
	@exit 1
