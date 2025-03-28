// ==UserScript==
// @name        Chzzk Helpful Script
// @namespace   github:niodtn/scripts/chzzk
// @match       *://chzzk.naver.com/live/*
// @grant       none
// @version     0.0.1
// @author      Niodtn
// @run-at      document-end
// @description Personal Tampermonkey script to filter content on newtoki.com
// @downloadURL https://raw.githubusercontent.com/niodtn/scripts/refs/heads/chzzk/chzzk/main.js
// @updateURL   https://raw.githubusercontent.com/niodtn/scripts/refs/heads/chzzk/chzzk/main.js
// ==/UserScript==

function removeChattingInput(target) {
  console.log("test!");
  console.log(target);
}

(function () {
  "use strict";

  const observer = new MutationObserver((mutations, obs) => {
    const target = document.querySelector("#aside-chatting");
    if (target) {
      removeChattingInput(target);
      obs.disconnect();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
})();
