// ==UserScript==
// @name        Arca Live Base64 Auto Decoder
// @namespace   github:niodtn/scripts/arcalive
// @match       *://arca.live/b/*
// @grant       none
// @version     1.0.1
// @author      Niodtn
// @description 아카라이브 Base64로 인코딩된 링크를 자동으로 디코딩
// @run-at      document-end
// @downloadURL https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/arcalive/main.js
// @updateURL   https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/arcalive/main.js
// ==/UserScript==

const urlPattern = /https?:\/\//g;
const base64Pattern =
  /(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}[A-Za-z0-9+/=]{0,2})?/g;

function convertBase64ToLink(str, element) {
  if (base64Pattern.test(str)) {
    let matches = str.match(base64Pattern);

    // forEach 대신 for...of로 변경
    for (let match of matches) {
      try {
        let decoded = atob(match); // base64 디코딩
        if (urlPattern.test(decoded)) {
          console.log(decoded); // 디코딩된 URL을 로그에 출력

          // 디코딩된 URL을 링크로 변환
          const newA = `<a href="${decoded}">${decoded}</a>`;

          // 해당 base64 문자열을 디코딩된 링크로 교체 (replace 방식)
          element.innerHTML = element.innerHTML.replace(match, newA);

          return true; // 유효한 URL을 찾으면 true 반환
        }
      } catch (error) {
        console.error("Decoding failed for:", match);
      }
    }
    return false; // 모든 base64 문자열을 처리해도 유효한 URL이 없으면 false 반환
  }
  return false; // base64Pattern에 매칭되지 않으면 false 반환
}

(function () {
  "use strict";

  let ac = document.querySelectorAll(".article-content")[0];
  let elements = ac.querySelectorAll("p");

  elements.forEach((element) => {
    if (convertBase64ToLink(element.innerHTML, element)) {
      console.log("Link added!"); // 유효한 링크를 추가했을 때
    }
  });
})();
