(function () {
  "use strict";

  const tocCache = new Map();
  let lastPagePath = null;

  function normalizedPath(pathname) {
    return pathname.replace(/index\.html$/, "").replace(/\/?$/, "/");
  }

  function ownControls(item) {
    return {
      toggle: item.querySelector(
        ":scope > .chapter-toc__toggle, :scope > .md-nav__container > .chapter-toc__toggle"
      ),
      list: item.querySelector(":scope > .chapter-toc__list"),
    };
  }

  function setExpanded(item, expanded) {
    const { toggle, list } = ownControls(item);
    if (!toggle || !list) return;
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute(
      "aria-label",
      `${expanded ? "收起" : "展开"}${toggle.dataset.pageTitle}的小节目录`
    );
    list.hidden = !expanded;
  }

  function closeOtherLists(keepItem) {
    document.querySelectorAll(".chapter-toc__host").forEach((item) => {
      if (item !== keepItem) setExpanded(item, false);
    });
  }

  function createSectionList(sourceList, pageUrl, nested) {
    const list = document.createElement("ul");
    list.className = nested ? "chapter-toc__sublist" : "chapter-toc__list";
    const pagePath = normalizedPath(new URL(pageUrl).pathname);

    for (const sourceItem of sourceList.children) {
      const sourceLink = sourceItem.querySelector(":scope > a.md-nav__link[href]");
      if (!sourceLink) continue;
      const target = new URL(sourceLink.getAttribute("href"), pageUrl);
      if (!target.hash || normalizedPath(target.pathname) !== pagePath) continue;

      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = target.href;
      link.textContent = sourceLink.textContent.trim();
      item.appendChild(link);

      const childList = sourceItem.querySelector(":scope > nav > ul.md-nav__list");
      if (childList) {
        const children = createSectionList(childList, pageUrl, true);
        if (children.childElementCount) item.appendChild(children);
      }
      list.appendChild(item);
    }
    return list;
  }

  function showMessage(list, message) {
    const item = document.createElement("li");
    item.className = "chapter-toc__message";
    item.textContent = message;
    list.replaceChildren(item);
  }

  function fillSectionList(list, sourceList, pageUrl) {
    const sections = createSectionList(sourceList, pageUrl, false);
    if (sections.childElementCount) {
      list.replaceChildren(...sections.childNodes);
    } else {
      showMessage(list, "本页暂无小节");
    }
    list.dataset.loadedFor = normalizedPath(new URL(pageUrl).pathname);
  }

  async function getRemoteToc(pageUrl) {
    if (!tocCache.has(pageUrl)) {
      const request = fetch(pageUrl, { credentials: "same-origin" }).then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const page = new DOMParser().parseFromString(await response.text(), "text/html");
        return page.querySelector(
          '.md-sidebar--secondary .md-nav__list[data-md-component="toc"]'
        );
      });
      tocCache.set(pageUrl, request);
    }
    try {
      return await tocCache.get(pageUrl);
    } catch (error) {
      tocCache.delete(pageUrl);
      throw error;
    }
  }

  async function loadSections(list, pageUrl) {
    const pagePath = normalizedPath(new URL(pageUrl).pathname);
    if (list.dataset.loadedFor === pagePath || list.dataset.loading === "true") return;

    const currentPath = normalizedPath(window.location.pathname);
    const currentToc = document.querySelector(
      '.md-sidebar--secondary .md-nav__list[data-md-component="toc"]'
    );
    if (pagePath === currentPath && currentToc) {
      fillSectionList(list, currentToc, pageUrl);
      return;
    }

    list.dataset.loading = "true";
    showMessage(list, "正在加载小节目录…");
    try {
      const remoteToc = await getRemoteToc(pageUrl);
      if (!list.isConnected) return;
      if (remoteToc) {
        fillSectionList(list, remoteToc, pageUrl);
      } else {
        showMessage(list, "本页暂无小节");
        list.dataset.loadedFor = pagePath;
      }
    } catch (error) {
      if (list.isConnected) showMessage(list, "目录加载失败，请再次点击重试");
    } finally {
      delete list.dataset.loading;
    }
  }

  function addPageToggle(link, index) {
    const item = link.closest("li.md-nav__item");
    if (!item) return null;
    if (ownControls(item).toggle) return item;

    const title = link.textContent.replace(/\s+/g, " ").trim();
    const list = document.createElement("ul");
    list.className = "chapter-toc__list";
    list.id = `chapter-section-list-${index}`;
    list.hidden = true;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "chapter-toc__toggle";
    toggle.dataset.pageTitle = title;
    toggle.setAttribute("aria-label", `展开${title}的小节目录`);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", list.id);
    toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>';

    const pageUrl = link.href;
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") {
        setExpanded(item, false);
        return;
      }
      closeOtherLists(item);
      setExpanded(item, true);
      void loadSections(list, pageUrl);
    });

    const categoryContainer = link.parentElement?.classList.contains("md-nav__container")
      ? link.parentElement
      : null;
    item.classList.add("chapter-toc__host");
    item.classList.toggle("chapter-toc__host--category", Boolean(categoryContainer));
    link.insertAdjacentElement("afterend", toggle);
    (categoryContainer || toggle).insertAdjacentElement("afterend", list);
    return item;
  }

  function updatePageNavigation() {
    const primarySidebar = document.querySelector(".md-sidebar--primary");
    if (!primarySidebar) return;

    const currentPath = normalizedPath(window.location.pathname);
    const pageChanged = currentPath !== lastPagePath;
    lastPagePath = currentPath;
    let currentItem = null;
    let currentItemCreated = false;

    const links = Array.from(primarySidebar.querySelectorAll("a.md-nav__link[href]"));
    links.forEach((link, index) => {
      const target = new URL(link.href, window.location.href);
      if (target.origin !== window.location.origin || target.hash) return;
      const existing = link.closest("li.md-nav__item");
      const created = existing && !ownControls(existing).toggle;
      const item = addPageToggle(link, index);
      if (item && normalizedPath(target.pathname) === currentPath && !currentItem) {
        currentItem = item;
        currentItemCreated = created;
      }
    });

    document.body.classList.add("chapter-nav-ready");
    const currentToc = document.querySelector(
      '.md-sidebar--secondary .md-nav__list[data-md-component="toc"]'
    );
    if (!currentItem || !currentToc) {
      document.body.classList.remove("chapter-nav");
      return;
    }

    const { list } = ownControls(currentItem);
    const sections = createSectionList(currentToc, window.location.href, false);
    if (!sections.childElementCount) {
      document.body.classList.remove("chapter-nav");
      return;
    }
    document.body.classList.add("chapter-nav");
    if (pageChanged || currentItemCreated) {
      closeOtherLists(currentItem);
      list.replaceChildren(...sections.childNodes);
      list.dataset.loadedFor = currentPath;
      setExpanded(currentItem, true);
    }
  }

  // 页面主体已经位于此脚本之前，首次加载无需等待外部资源。
  updatePageNavigation();
  if (window.document$) {
    window.document$.subscribe(updatePageNavigation);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updatePageNavigation);
  }
})();
