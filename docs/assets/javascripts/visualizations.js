(function (global) {
  "use strict";

  const registry = Object.create(null);

  function parseConfig(node) {
    const raw = node.getAttribute("data-viz-config");
    if (!raw) {
      return {};
    }
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.error("[tutorial-viz] invalid JSON in data-viz-config", node, error);
      return {};
    }
  }

  function showFallback(node) {
    const fallback = node.querySelector("[data-viz-fallback]");
    if (fallback) {
      fallback.hidden = false;
    }
  }

  function renderPlaceholder(node, config) {
    const title = config.title || "可视化占位";
    const note = config.note || "本章交互演示尚未接入。阅读正文不依赖这段可视化。";
    node.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "viz-placeholder";
    wrap.innerHTML =
      '<p class="viz-placeholder-title"></p>' +
      '<p class="viz-fallback" data-viz-fallback></p>';
    wrap.querySelector(".viz-placeholder-title").textContent = title;
    wrap.querySelector("[data-viz-fallback]").textContent = note;
    node.appendChild(wrap);
  }

  function register(name, factory) {
    if (!name || typeof factory !== "function") {
      throw new Error("[tutorial-viz] register(name, factory) requires a name and function");
    }
    registry[name] = factory;
  }

  function addAnimationToggle(node) {
    const button = node.querySelector("[data-viz-toggle]");
    if (!button) {
      return;
    }
    button.addEventListener("click", function () {
      const paused = node.classList.toggle("is-paused");
      button.textContent = paused ? "继续" : "暂停";
      button.setAttribute("aria-pressed", paused ? "true" : "false");
    });
  }

  function setTitle(node, config, fallbackTitle) {
    const title = node.querySelector("[data-viz-title]");
    if (title) {
      title.textContent = config.title || fallbackTitle;
    }
  }

  function renderConvolutionWindow(node, config) {
    node.innerHTML = `
      <div class="tutorial-viz">
        <div class="tutorial-viz__header">
          <div>
            <p class="tutorial-viz__title" data-viz-title></p>
            <p class="tutorial-viz__hint">卷积核读取局部窗口；颜色越深表示响应越强。</p>
          </div>
          <button class="tutorial-viz__toggle" type="button" data-viz-toggle aria-pressed="false">暂停</button>
        </div>
        <svg class="tutorial-viz__canvas" viewBox="0 0 720 250" role="img" aria-label="卷积核在输入网格上移动并产生特征响应">
          <defs>
            <pattern id="conv-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <rect width="36" height="36" fill="none" stroke="currentColor" stroke-opacity="0.16"/>
            </pattern>
            <marker id="conv-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="currentColor"/>
            </marker>
          </defs>
          <text x="45" y="28" class="tutorial-viz__strong-label">输入图像</text>
          <rect x="45" y="42" width="252" height="180" rx="10" fill="url(#conv-grid)" stroke="currentColor" stroke-opacity="0.3"/>
          <circle cx="210" cy="135" r="34" fill="#ef4444" fill-opacity="0.8"/>
          <rect x="57" y="55" width="108" height="108" rx="7" fill="#7c3aed" fill-opacity="0.15" stroke="#7c3aed" stroke-width="3" class="viz-conv-kernel"/>
          <text x="73" y="183" class="tutorial-viz__label">3 × 3 局部窗口</text>
          <path d="M322 132 H410" stroke="currentColor" stroke-width="2.5" marker-end="url(#conv-arrow)"/>
          <text x="331" y="113" class="tutorial-viz__label">共享参数</text>
          <text x="445" y="28" class="tutorial-viz__strong-label">输出特征图</text>
          <rect x="445" y="42" width="216" height="180" rx="10" fill="url(#conv-grid)" stroke="currentColor" stroke-opacity="0.3"/>
          <circle cx="570" cy="135" r="27" fill="#f97316" class="viz-conv-response"/>
          <text x="485" y="198" class="tutorial-viz__label">空间位置仍然对应</text>
        </svg>
      </div>`;
    setTitle(node, config, "卷积核怎样在图像上滑动");
    addAnimationToggle(node);
  }

  function renderRgbdBackprojection(node, config) {
    node.innerHTML = `
      <div class="tutorial-viz">
        <div class="tutorial-viz__header">
          <div>
            <p class="tutorial-viz__title" data-viz-title></p>
            <p class="tutorial-viz__hint">像素给出射线，深度确定三维点，外参再改变参考坐标系。</p>
          </div>
          <button class="tutorial-viz__toggle" type="button" data-viz-toggle aria-pressed="false">暂停</button>
        </div>
        <svg class="tutorial-viz__canvas" viewBox="0 0 760 260" role="img" aria-label="像素和深度恢复相机坐标点，再变换到机器人基座坐标">
          <defs>
            <marker id="depth-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="currentColor"/>
            </marker>
          </defs>
          <text x="32" y="28" class="tutorial-viz__strong-label">相机坐标</text>
          <circle cx="80" cy="205" r="8" fill="currentColor"/>
          <path d="M80 205 L370 52" stroke="#f97316" stroke-width="3"/>
          <line x1="165" y1="38" x2="165" y2="224" stroke="#2563eb" stroke-width="4"/>
          <circle cx="165" cy="160" r="8" fill="#7c3aed"/>
          <text x="135" y="241" class="tutorial-viz__label">像平面 (u, v)</text>
          <circle cx="245" cy="118" r="16" fill="#ef4444" class="viz-depth-point"/>
          <text x="218" y="78" class="tutorial-viz__label">深度 d</text>
          <path d="M395 130 H492" stroke="currentColor" stroke-width="2.5" marker-end="url(#depth-arrow)"/>
          <rect x="400" y="93" width="84" height="28" rx="14" fill="#7c3aed" fill-opacity="0.12" stroke="#7c3aed"/>
          <text x="442" y="112" text-anchor="middle" class="tutorial-viz__label">外参 B←C</text>
          <text x="525" y="28" class="tutorial-viz__strong-label">机器人基座坐标</text>
          <path d="M570 204 H690 M570 204 V82" stroke="currentColor" stroke-width="3"/>
          <circle cx="570" cy="204" r="8" fill="currentColor"/>
          <circle cx="645" cy="115" r="18" fill="#16a34a" class="viz-base-point"/>
          <text x="654" y="99" class="tutorial-viz__label">ᴮp</text>
          <text x="692" y="222" class="tutorial-viz__label">xᴮ</text>
          <text x="548" y="82" class="tutorial-viz__label">zᴮ</text>
        </svg>
      </div>`;
    setTitle(node, config, "从像素射线到机器人基座坐标");
    addAnimationToggle(node);
  }

  function mount(root) {
    const scope = root || document;
    const nodes = scope.querySelectorAll("[data-viz]");
    nodes.forEach((node) => {
      if (node.getAttribute("data-viz-mounted") === "true") {
        return;
      }
      const name = node.getAttribute("data-viz");
      const config = parseConfig(node);
      const factory = name && registry[name];
      if (!factory) {
        showFallback(node);
        return;
      }
      try {
        factory(node, config);
        node.setAttribute("data-viz-mounted", "true");
      } catch (error) {
        console.error("[tutorial-viz] failed to mount", name, error);
        showFallback(node);
      }
    });
  }

  register("placeholder", renderPlaceholder);
  register("convolution-window", renderConvolutionWindow);
  register("rgbd-backprojection", renderRgbdBackprojection);

  global.TutorialViz = {
    register: register,
    mount: mount,
    registry: registry,
  };
})(window);
