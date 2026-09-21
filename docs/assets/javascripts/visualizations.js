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

  global.TutorialViz = {
    register: register,
    mount: mount,
    registry: registry,
  };
})(window);
