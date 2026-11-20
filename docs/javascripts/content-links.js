// Open every link in the page body in a new tab.
// Header, sidebar, search, table of contents and footer navigation stay in this tab.
(function () {
  function openContentLinksInNewTab() {
    var links = document.querySelectorAll(".md-content a[href]");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.target = "_blank";
      var rel = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (rel.indexOf("noopener") === -1) rel.push("noopener");
      link.setAttribute("rel", rel.join(" "));
    }
  }

  // Material re-renders the article on instant navigation and does not re-run this file.
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(openContentLinksInNewTab);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", openContentLinksInNewTab);
  } else {
    openContentLinksInNewTab();
  }
})();
