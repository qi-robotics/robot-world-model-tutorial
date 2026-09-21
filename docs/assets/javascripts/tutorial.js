(function () {
  "use strict";

  function enhanceComponents(root) {
    const scope = root || document;
    const components = scope.querySelectorAll("[data-component]");
    components.forEach((node) => {
      node.classList.add("tutorial-component");
      node.setAttribute("data-component-ready", "true");
    });
  }

  function boot(root) {
    enhanceComponents(root);
    if (window.TutorialViz && typeof window.TutorialViz.mount === "function") {
      window.TutorialViz.mount(root || document);
    }
  }

  if (window.document$) {
    document$.subscribe(function () {
      boot(document);
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      boot(document);
    });
  } else {
    boot(document);
  }
})();
