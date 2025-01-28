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


function isValidBase64(str) {
  const urlPattern = /https?/g;
  const base64Pattern = /(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}[A-Za-z0-9+/=]{0,2})?/g;
  if (base64Pattern.test(str)){
    const matches = str.match(base64Pattern).filter(match => match !== "");
    matches.forEach(match => {
      let url = atob(match)
      if (urlPattern.test(url)) {
        console.log(url)
      }
    });
  }
}

(function () {
  let elements = document.querySelectorAll('.article-content');
  isValidBase64("fuck you\n kimchi");
})();
