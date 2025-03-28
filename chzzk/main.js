// ==UserScript==
// @name        Chzzk Helpful Script
// @namespace   github:niodtn/scripts/chzzk
// @match       *://chzzk.naver.com/live/*
// @grant       none
// @version     1.0.0
// @author      Niodtn
// @run-at      document-end
// @description Chzzk Custom
// @downloadURL https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/chzzk/main.js
// @updateURL   https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/chzzk/main.js
// ==/UserScript==

function findAndRun(func, target) {
  const observer = new MutationObserver((mutations, obs) => {
    const _target = document.querySelector(target);
    if (_target) {
      func(_target);
      obs.disconnect();
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

function removeElement(el) {
  el.remove();
}

function alignToCenter(el) {
  el.style.display = "flex";
  el.style.justifyContent = "center";
  el.style.alignItems = "center";
  el.style.minHeight = "auto";
}

(function () {
  "use strict";

  // Remove Popup
  findAndRun(removeElement, "[class^='popup_dimmed']");

  // Remove Chatting Input
  findAndRun(removeElement, "[class^='live_chatting_input_container']");
  findAndRun(removeElement, "#send_chat_or_donate");
  findAndRun(alignToCenter, "[class^='live_chatting_area'");
})();
