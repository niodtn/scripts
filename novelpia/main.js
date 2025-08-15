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

function extractNumberFromNovel(novel) {
  // .novel-numerical > div > span 2개 중, 하나가 '회차'인 경우 나머지 span의 숫자 추출
  const numericalDivs = novel.querySelectorAll(".novel-numerical > div");
  let result = [];
  numericalDivs.forEach((div) => {
    const spans = div.querySelectorAll("span");
    if (spans.length === 2) {
      let number = null;
      if (spans[0].textContent.trim() === "회차") {
        number = spans[1].textContent.trim();
      } else if (spans[1].textContent.trim() === "회차") {
        number = spans[0].textContent.trim();
      }
      if (number !== null) {
        result.push(number);
      }
    }
  });
  return result;
}

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

        const numbers = extractNumberFromNovel(novel);
        span.className = "novel-numerical-content";
        span.textContent = numbers.length > 0 ? numbers[0] : "";

        div.appendChild(span);
        novel.querySelector(".novel-numerical").appendChild(div);
      });
  }
})();
