# 贡献指南

感谢你愿意一起完善《从编码到行动》。当前阶段的目标是把章节骨架填成可靠的中文教程，而不是堆未核对的结论。

## 最小工作流

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

改完后：

```bash
mkdocs build --strict
```

Windows 用户请使用：

```bat
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
mkdocs build --strict
```

## 应该改哪里

| 目的 | 位置 |
|---|---|
| 教程正文 | `docs/**/*.md` |
| 站点配置 | `mkdocs.yml` |
| 样式与交互接口 | `docs/assets/` |
| 代码示例 | `examples/` |
| 笔记本 | `notebooks/` |

更详细的写作约定见：

- [写作指南](docs/contributing/writing-guide.md)
- [图示约定](docs/contributing/diagrams.md)
- [交互内容接口](docs/contributing/interactive-content.md)
- [笔记本约定](docs/contributing/notebooks.md)

## 提交要求

- 不要提交 `site/`、`.venv/` 或生成缓存
- 不要编造实验数字、未核对的论文结论或虚假引用
- 新增内部链接必须指向真实 Markdown 文件
- Pull Request 请说明影响了哪些页面

Issue 模板：

- 内容问题或站点缺陷
- 内容建议
