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
  const followingNames = GM_getValue("following_channel_names", []);
  const msgSelector = 'div[class^="live_chatting_message_chatting_message"]';

  document.querySelectorAll(msgSelector).forEach((msg) => {
    // If CSS has already been applied, skip
    if (msg.dataset.cssApplied) return;

    // nickname extraction
    const nicknameSelector = 'span[class^="name_text__"]';
    const nickname = msg.querySelector(nicknameSelector)?.textContent.trim();

    const adminIconSelector = 'img[alt="채팅 운영자"], img[alt="채널 관리자"]';
    const isAdmin = msg.querySelector(adminIconSelector) !== null;
    const isFollowing = nickname && followingNames.includes(nickname);

    const textElementsSelector =
      'span[class^="live_chatting_username_nickname"], span[class^="live_chatting_message_text"]';

    if (isAdmin) {
      // 1. Apply background styles
      msg.style.cssText = `
        background-color: #749ffe;
        border-radius: 7px;
        `;
      // 2. Change text color
      msg.querySelectorAll(textElementsSelector).forEach((element) => {
        element.style.color = "#fff";
      });
    } else if (isFollowing) {
      // 1. Apply background styles
      msg.style.cssText = `
          background-color: #d9b04f;
          border-radius: 7px;
        `;
      // 2. Change text color
      msg.querySelectorAll(textElementsSelector).forEach((element) => {
        element.style.color = "#fff";
      });
    }
    // Mark that CSS has been applied
    msg.dataset.cssApplied = "true";
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
