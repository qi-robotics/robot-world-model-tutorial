# 交互内容接口

第一版网站必须能在关闭 JavaScript 的情况下读完正文。自定义脚本只用于增强，不承担关键内容。

## 已经接入的文件

这些文件通过 `mkdocs.yml` 的 `extra_css` 与 `extra_javascript` 加载：

- `docs/assets/stylesheets/extra.css`
- `docs/assets/stylesheets/components.css`
- `docs/assets/javascripts/mathjax.js`
- `docs/assets/javascripts/visualizations.js`
- `docs/assets/javascripts/tutorial.js`

不要在章节里临时插入第三方大框架。

## 可视化占位

使用 `data-viz` 声明一个可被脚本挂载的槽位：

```html
<div class="viz-slot" data-viz="placeholder" data-viz-config='{"title":"Latent rollout","note":"交互演示待接入"}'>
  <p data-viz-fallback>静态说明：这里以后会展示给定动作后 latent 如何演化。没有脚本时请阅读正文。</p>
</div>
```

下面是一个真实占位，保存本页后应看到脚本渲染的占位卡片：

<div class="viz-slot" data-viz="placeholder" data-viz-config='{"title":"示例占位","note":"这是接口演示，不是正式实验动画。"}'>
  <p data-viz-fallback>如果看到这段文字，说明可视化脚本尚未运行；正文仍可继续阅读。</p>
</div>

## 注册新可视化

在 `visualizations.js` 中注册，或后续新增独立文件并写入 `extra_javascript`：

```javascript
window.TutorialViz.register("latent-rollout", function (element, config) {
  // 读取 config.horizon 等字段
  // 在 element 内创建静态控件，避免循环播放的炫光动画
});
```

然后：

```html
<div class="viz-slot" data-viz="latent-rollout" data-viz-config='{"horizon": 8}'>
  <p data-viz-fallback>将在这里展示 8 步 latent rollout。</p>
</div>
```

## 通用组件标记

任意增强型 HTML 可加上 `data-component`，由 `tutorial.js` 标记为已增强：

```html
<section data-component="pipeline">...</section>
```

现有 CSS 类：

- `.stage-card` / `.project-card` / `.feature-card`
- `.wm-pipeline`
- `.viz-slot`
- `.citation-block`

新增样式请优先写进 `components.css`，并同时验证浅色和深色主题。

## 明确不要做的事

- 不要自动循环播放大动画
- 不要在没有 `noscript` / `data-viz-fallback` 的情况下只把结论放进 canvas
- 不要让可视化成为唯一的公式解释
- 不要为了单页效果引入 React、Vue 或其他重量级框架
