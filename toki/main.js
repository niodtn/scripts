// ==UserScript==
// @name        Toki autoHide
// @namespace   Niodtn/Toki
// @match       *://newtoki*.com/*
// @include     /^https?:\/\/\w*toki\d*.com\/.*/
// @grant       none
// @version     1.1.3
// @author      Niodtn
// @description Personal Tampermonkey script to filter content on newtoki.com
// @run-at      document-end
// @downloadURL https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/main.js
// @updateURL   https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/main.js
// ==/UserScript==

(function () {
  "use strict";

  function getList(url) {
    return fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const remove = data
          .split("\n")
          .map((line) => line.trim())
          .filter((item) => !item.startsWith("# "))
          .filter(Boolean);

        return remove;
      })
      .catch((error) => {
        console.error("Niodtn/Toki: ", error);
      });
  }

  function removeLiElementsFromNewtoki(list) {
    list.forEach((dt) => {
      const ulElement = document.querySelector("#webtoon-list-all");
      const liElements = ulElement.querySelectorAll("li");
      liElements.forEach((li) => {
        const dateTitle = li.getAttribute("date-title");
        if (dateTitle === dt) {
          li.remove();
        }
      });
    });
  }

  const domain = window.location.hostname;
  if (/^newtoki\d+\.com$/.test(domain)) {
    const CN =
      "https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/newtoki/CN.txt";
    const ulElement = document.querySelector("#webtoon-list-all");
    if (ulElement) {
      getList(CN).then((result) => {
        removeLiElementsFromNewtoki(result);
      });
    }
  }
})();
