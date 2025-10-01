// ==UserScript==
// @name        Chzzk Helpful Script
// @namespace   github:niodtn/scripts/chzzk
// @version     2025-10-02
// @description Chzzk Custom
// @author      Niodtn
// @match       *://chzzk.naver.com/live/*
// @grant       none
// @run-at      document-end
// @downloadURL https://niodtn.github.io/scripts/chzzk/main.user.js
// @updateURL   https://niodtn.github.io/scripts/chzzk/main.user.js
// ==/UserScript==

function findAndRun(func, target) {
  const runFunc = () => {
    const _target = document.querySelector(target);
    if (_target) func(_target);
  };

  runFunc();

  const observer = new MutationObserver(runFunc);
  observer.observe(document, { childList: true, subtree: true });

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  const onUrlChange = () => {
    runFunc();
  };

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    onUrlChange();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    onUrlChange();
  };

  window.addEventListener("popstate", onUrlChange);
}

function removeElement(el) {
  // el.remove();
  el.style.display = "none";
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
