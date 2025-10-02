// ==UserScript==
// @name         Chzzk Helpful Script
// @namespace    github:niodtn/scripts/chzzk
// @version      2025-10-03
// @description  Chzzk Custom
// @author       Niodtn
// @match        https://chzzk.naver.com/*
// @icon         https://ssl.pstatic.net/static/nng/glive/icon/favicon.png
// @grant        none
// @run-at       document-end
// @downloadURL  https://niodtn.github.io/scripts/chzzk/main.user.js
// @updateURL    https://niodtn.github.io/scripts/chzzk/main.user.js
// ==/UserScript==

function addcss() {
  const imgs = document.querySelectorAll('img[alt="채팅 운영자"]');
  imgs.forEach((img) => {
    const parent = img.closest(
      'div[class^="live_chatting_message_chatting_message"]'
    );

    if (!parent) return;
    if (parent.dataset.cssApplied) return;

    // background
    parent.style.backgroundColor = "#749ffe";
    parent.style.borderRadius = "7px";
    parent.style.backgroundColor;

    // nickname
    const nickname = parent.querySelector(
      'span[class^="live_chatting_username_nickname"]'
    );
    nickname.style.color = "#fff";

    // message
    const messageText = parent.querySelector(
      'span[class^="live_chatting_message_text"]'
    );
    messageText.style.color = "#fff";

    parent.dataset.cssApplied = "true";
  });
}

function hideElement(target) {
  const _target = document.querySelector(target);
  if (_target) _target.style.display = "none";
}

function chatting() {
  const inputContainer = document.querySelector(
    'div[class^="live_chatting_input_container"]'
  );
  if (inputContainer) inputContainer.style.display = "none";

  const button = document.querySelector("#send_chat_or_donate");
  if (button) button.style.display = "none";

  const area = document.querySelector("[class^='live_chatting_area'");
  if (area) {
    area.style.display = "flex";
    area.style.justifyContent = "center";
    area.style.alignItems = "center";
    area.style.minHeight = "auto";
  }
}

(function () {
  "use strict";

  const observer = new MutationObserver(() => {
    if (
      location.pathname.startsWith("/live") ||
      location.pathname.startsWith("/video")
    ) {
      addcss();
      chatting();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
