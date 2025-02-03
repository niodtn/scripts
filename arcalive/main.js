// ==UserScript==
// @name        Arca Live Base64 Auto Decoder
// @namespace   github:niodtn/scripts/arcalive
// @match       *://arca.live/b/*
// @grant       none
// @version     1.0.0
// @author      Niodtn
// @description 아카라이브 Base64로 인코딩된 링크를 자동으로 디코딩
// @run-at      document-end
// @downloadURL https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/arcalive/main.js
// @updateURL   https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/arcalive/main.js
// ==/UserScript==

const urlPattern = /https?/g;
const base64Pattern = /(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}[A-Za-z0-9+/=]{0,2})?/g;

(function () {
  let ac = document.querySelectorAll(".article-content")[0];

  let elements = ac.querySelectorAll("p");
  elements.forEach((element) => {
    let target = element.textContent;

    if (base64Pattern.test(target)) {
      // base64Pattern test
      try {
        let url = atob(target);
        if (urlPattern.test(url)) {
          // urlPattern test
          element.innerHTML = url;
        }
      } catch (error) {
        console.log(target);
        console.error(error);
      }
    }
  });
})();
