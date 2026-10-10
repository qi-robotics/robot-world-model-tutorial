window.MathJax = {
  tex: {
    inlineMath: [
      ["\\(", "\\)"],
      ["$", "$"],
    ],
    displayMath: [
      ["\\[", "\\]"],
      ["$$", "$$"],
    ],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
  },
};

// 首次打开页面时，Material 的事件可能早于下方的 MathJax CDN 脚本完成加载。
function waitForMathJaxScript() {
  if (typeof window.MathJax?.typesetPromise === "function") {
    return Promise.resolve();
  }
  if (document.readyState === "complete") {
    return Promise.resolve();
  }
  return new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
}

// 逐次处理即时导航，避免上一章的排版尚未结束就开始处理下一章。
let typesetQueue = Promise.resolve();

document$.subscribe(() => {
  typesetQueue = typesetQueue
    .catch(() => {})
    .then(async () => {
      await waitForMathJaxScript();
      const mathJax = window.MathJax;
      if (typeof mathJax?.typesetPromise !== "function") {
        return;
      }
      await mathJax.startup.promise;
      // 清除上一章的公式记录与编号，再排版当前页面的 arithmatex 节点。
      mathJax.startup.output.clearCache();
      mathJax.typesetClear();
      mathJax.texReset();
      await mathJax.typesetPromise();
    })
    .catch((error) => console.error("MathJax 排版失败：", error));
});
