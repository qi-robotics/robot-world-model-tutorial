(function () {
  "use strict";

  function updateHeaderTitle() {
    const target = document.querySelector('[data-md-component="header-topic"] .md-ellipsis');
    if (!target) return;

    const heading = document.querySelector(".md-content__inner h1") || document.querySelector("main h1");
    if (!heading) return;

    const cleanHeading = heading.cloneNode(true);
    cleanHeading.querySelectorAll("a.headerlink").forEach((link) => link.remove());
    const title = cleanHeading.textContent.trim();
    if (title) target.textContent = title;
  }

  if (window.document$) {
    document$.subscribe(updateHeaderTitle);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateHeaderTitle);
  } else {
    updateHeaderTitle();
  }
})();
