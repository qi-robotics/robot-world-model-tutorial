"""执行高级篇单元一 Notebook，检查注释并将运行结果存到临时目录。"""

import ast
import base64
import io
import os
from pathlib import Path
import re
import sys
import tempfile
import tokenize

import nbformat
from nbclient import NotebookClient

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(tempfile.mkdtemp(prefix="advanced-unit-one-check-"))
os.environ["PATH"] = str(Path(sys.executable).parent) + os.pathsep + os.environ["PATH"]

for chapter in ("14", "15", "16", "17"):
    notebooks = sorted((ROOT / "colab" / "advanced" / chapter).glob("*.ipynb"))
    assert len(notebooks) == 1, f"第 {chapter} 章应有一份第一版实践"
    path = notebooks[0]
    notebook = nbformat.read(path, as_version=4)
    nbformat.validate(notebook)
    for index, cell in enumerate(notebook.cells):
        if cell.cell_type != "code":
            continue
        ast.parse(cell.source)
        comments = {t.start[0]: t.string for t in tokenize.generate_tokens(io.StringIO(cell.source).readline) if t.type == tokenize.COMMENT}
        for line_number, line in enumerate(cell.source.splitlines(), start=1):
            if line.strip():
                assert re.search(r"[\u4e00-\u9fff]", comments.get(line_number, "")), f"{path.name} 单元 {index} 第 {line_number} 行缺中文注释"
        assert index + 1 < len(notebook.cells) and notebook.cells[index + 1].cell_type == "markdown", f"{path.name} 缺少输出解释"
    client = NotebookClient(notebook, timeout=180, kernel_name="python3", resources={"metadata": {"path": str(ROOT)}})
    executed = client.execute()
    nbformat.write(executed, OUTPUT / path.name)
    figure_count = 0
    for cell in executed.cells:
        for output in cell.get("outputs", []):
            assert output.output_type != "error", f"{path.name} 执行失败"
            if output.output_type == "stream":
                print(output.text.rstrip())
            if "image/png" in output.get("data", {}):
                figure_count += 1
                (OUTPUT / f"{chapter}-{figure_count}.png").write_bytes(base64.b64decode(output.data["image/png"]))
    print(f"PASS {path.name}: {figure_count} 幅输出图；逐行中文注释与输出解释检查通过", flush=True)

print(f"执行后的 Notebook 与图像保存在：{OUTPUT}")
