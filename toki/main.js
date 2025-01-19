// ==UserScript==
// @name        Toki autoHide
// @namespace   Niodtn/Toki
// @match       *://newtoki*.com/*
// @include     /^https?:\/\/newtoki\d*.com\/.*/
// @grant       none
// @version     1.1.2
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
          .filter(Boolean);
        return remove;
      })
      .catch((error) => {
        console.error("Niodtn/Toki: ", error);
      });
  }

  const domain = window.location.hostname;
  if (/^newtoki\d+\.com$/.test(domain)) {
    const ulElement = document.querySelector("#webtoon-list-all");
    if (ulElement) {
      console.log(ulElement);
      getList(
        "https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/newtoki/CN.txt"
      ).then((result) => {
        result.forEach((dt) => {
          const liElements = ulElement.querySelectorAll("li");
          liElements.forEach((li) => {
            const dateTitle = li.getAttribute("date-title");
            if (dateTitle === dt) {
              li.remove();
            }
          });
        });
      });
    }
  }
})();
