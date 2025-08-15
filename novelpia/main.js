// ==UserScript==
// @name         Novelpia Script
// @namespace    github:niodtn/scripts/novelpia
// @version      2025-08-16a
// @description  Novelpia
// @author       Niodtn
// @match        *://novelpia.com/*
// @match        *://*.novelpia.com/*
// @match        *://www.novelpia.com/*
// @grant        none
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/novelpia/main.js
// @updateURL    https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/novelpia/main.js
// ==/UserScript==

function createNovelInfoDiv(title, content) {
  const div = document.createElement("div");
  const span_title = document.createElement("span");
  const span_content = document.createElement("span");

  span_title.className = "novel-numerical-title";
  span_title.textContent = title;
  div.appendChild(span_title);

  span_content.className = "novel-numerical-content";
  span_content.textContent = content;
  div.appendChild(span_content);

  return div;
}

function getAllEpisodeNumbers(novel) {
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

function getContinueEpisodeNumber(novel) {
  const btn = novel.querySelector(".novel-btn-continue");
  if (!btn) return null;
  const match = btn.textContent.match(/EP\.(\d+)/);
  return match ? match[1] : null;
}

(function () {
  "use strict";
  const path = window.location.pathname;

  if (path.startsWith("/mybook")) {
    document
      .querySelector(".mybook-data-list-items")
      .querySelectorAll(".novel-list-real-container")
      .forEach((novel) => {
        const numbers = getAllEpisodeNumbers(novel);
        const continueEp = getContinueEpisodeNumber(novel);

        // 읽은 퍼센트 계산
        let percentText = "";
        if (numbers.length > 0 && continueEp !== null) {
          const total = parseInt(numbers[0].replace(/[^\d]/g, ""), 10);
          const current = parseInt(continueEp.replace(/[^\d]/g, ""), 10);
          if (!isNaN(total) && !isNaN(current) && total > 0) {
            const percent = Math.floor((current / total) * 100);
            percentText = ` ${percent}%`;
          }
        }
        if (percentText !== "") {
          const percentDiv = createNovelInfoDiv("진도", percentText);
          novel.querySelector(".novel-numerical").appendChild(percentDiv);
        }

        // 남은 회차 계산
        let remainText = "";
        if (numbers.length > 0 && continueEp !== null) {
          const total = parseInt(numbers[0].replace(/[^\d]/g, ""), 10);
          const current = parseInt(continueEp.replace(/[^\d]/g, ""), 10);
          if (!isNaN(total) && !isNaN(current)) {
            const remain = total - current;
            remainText = ` ${remain}`;
          }
        }
        if (remainText !== "") {
          const remainDiv = createNovelInfoDiv("남은 회차", remainText);
          novel.querySelector(".novel-numerical").appendChild(remainDiv);
        }

        if (percentText !== "" || remainText !== "") {
          const numerical = novel.querySelectorAll(".novel-numerical > div");
          numerical[0].remove();
          numerical[2].remove();
        }
      });
  }
})();
