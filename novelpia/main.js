// ==UserScript==
// @name         Novelpia Script
// @namespace    github:niodtn/scripts/novelpia
// @version      2025-08-15
// @description  Novelpia
// @author       Niodtn
// @match        *://novelpia.com/*
// @match        *://*.novelpia.com/*
// @match        *://www.novelpia.com/*
// @grant        none
// @run-at       document-end
// @downloadURL https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/novelpia/main.js
// @updateURL   https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/novelpia/main.js
// ==/UserScript==

(function () {
  "use strict";
  const path = window.location.pathname;

  if (path.startsWith("/mybook")) {
    document
      .querySelector(".mybook-data-list-items")
      .querySelectorAll(".novel-list-real-container")
      .forEach((novel) => {
        novel.querySelectorAll(".novel-numerical");

        // Injecting a new div and span element
        const div = document.createElement("div");
        const span = document.createElement("span");

        span.className = "novel-numerical-content";
        span.textContent = "내용";

        div.appendChild(span);
        novel.querySelector(".novel-numerical").appendChild(div);
      });
  }
})();
