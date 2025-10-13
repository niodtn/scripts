// ==UserScript==
// @name         Chzzk Helpful Script
// @namespace    github:niodtn/scripts/chzzk
// @version      2025-10-04
// @description  Chzzk Custom
// @author       Niodtn
// @match        https://chzzk.naver.com/*
// @icon         https://ssl.pstatic.net/static/nng/glive/icon/favicon.png
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// @downloadURL  https://niodtn.github.io/scripts/chzzk/main.user.js
// @updateURL    https://niodtn.github.io/scripts/chzzk/main.user.js
// ==/UserScript==

function highlightChat() {
  const userSelector = 'img[alt="채팅 운영자"], img[alt="채널 관리자"]';
  const chatParentSelector =
    'div[class^="live_chatting_message_chatting_message"]';

  document.querySelectorAll(userSelector).forEach((img) => {
    const chatMessage = img.closest(chatParentSelector);

    // If chatMessage is not found or CSS has already been applied, skip
    if (!chatMessage || chatMessage.dataset.cssApplied) return;

    // 1. Apply background styles
    chatMessage.style.cssText = `
      background-color: #749ffe;
      border-radius: 7px;
    `;

    // 2. Change nickname color
    const nickname = chatMessage.querySelector(
      'span[class^="live_chatting_username_nickname"]'
    );
    if (nickname) nickname.style.color = "#fff";

    const messageText = chatMessage.querySelector(
      'span[class^="live_chatting_message_text"]'
    );
    if (messageText) messageText.style.color = "#fff";

    // 3. Mark that CSS has been applied
    chatMessage.dataset.cssApplied = "true";
  });
}

function hideChatInput() {
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

function saveFollowingChannelNames() {
  // Find "팔로잉 채널" navigation element
  const foundElement = Array.from(document.querySelectorAll("strong")).find(
    (element) => element.textContent.trim() === "팔로잉 채널"
  );
  const nav = foundElement?.closest("nav");
  if (!nav) return;

  // Add click event listener to the button with aria-label "더보기"
  const targetButton = nav.querySelector("button[aria-label='더보기']");
  if (targetButton) {
    if (targetButton.dataset.listenerAdded) return; // Prevent adding multiple listeners
    targetButton.addEventListener("click", () => {
      if (targetButton.textContent.trim() === "접기") {
        const selector = "span[class^='name_text__']";
        const channelNameElements = nav.querySelectorAll(selector);

        const names = Array.from(channelNameElements)
          .map((el) => el.textContent.trim())
          .filter((name) => name.length > 0);
        GM_setValue("following_channel_names", names);
      }
    });
    targetButton.dataset.listenerAdded = "true"; // Mark that listener has been added
  }
}

(function () {
  "use strict";

  const observer = new MutationObserver(() => {
    saveFollowingChannelNames();
    if (
      location.pathname.startsWith("/live") ||
      location.pathname.startsWith("/video")
    ) {
      highlightChat();
      hideChatInput();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
