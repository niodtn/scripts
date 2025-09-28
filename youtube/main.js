// ==UserScript==
// @name         Youtube
// @namespace    github:niodtn/scripts/youtube
// @version      2025-09-28
// @description  Youtube
// @author       Niodtn
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-end
// @downloadURL  https://niodtn.github.io/scripts/youtube/main.js
// @updateURL    https://niodtn.github.io/scripts/youtube/main.js
// ==/UserScript==

// === 유튜브 메인 페이지 ===

// === 유튜브 영상 페이지 ===

// 댓글 지우기
function removeComments() {
  const comments = document.querySelector("ytd-comments");
  if (comments) {
    // comments.style.display = "none";
    comments.remove();
  }
}

// 추천 영상 댓글 자리로 이동
function moveUpNextToCommentArea() {
  const commentsContainer = document.querySelector("ytd-comments");
  const upNext = document.querySelector("#related"); // 추천 영상 컨테이너
  if (upNext && commentsContainer) {
    // 댓글 위치로 이동
    commentsContainer.parentNode.insertBefore(upNext, commentsContainer);
  }
}

// 영화관 모드 자동 활성화
function enableTheaterMode() {
  const player = document.querySelector("ytd-watch-flexy");
  if (!player) return;

  if (player.hasAttribute("theater-mode-applied")) return;

  const theaterButton = document.querySelector(".ytp-size-button");
  if (theaterButton && !player.classList.contains("ytp-size-mode-theater")) {
    theaterButton.click();
    player.setAttribute("theater-mode-applied", "true");
  }
}

// 릴 섹션 제거
function removeReelShelves() {
  const reels = document.querySelectorAll("ytd-reel-shelf-renderer");
  reels.forEach((reel) => reel.remove());
}

// 보조 패널을 기본 패널 내부로 이동
function moveSecondaryToPrimaryInner() {
  const primaryInner = document.getElementById("primary-inner");
  const secondary = document.getElementById("secondary");
  if (!primaryInner || !secondary) return;

  // 이미 이동했는지 확인
  if (!secondary.hasAttribute("moved-to-primary-inner")) {
    primaryInner.appendChild(secondary);
    secondary.setAttribute("moved-to-primary-inner", "true");
  }
}

// ==========================

(function () {
  "use strict";

  const url = window.location.href;

  // 메인 페이지
  if (url === "https://www.youtube.com/") {
    const observer = new MutationObserver(() => {
      // 쇼츠 제거
      const sections = document.querySelectorAll("ytd-rich-section-renderer");
      sections.forEach((el) => el.remove());

      // 20px to 8px
      const items = document.querySelectorAll("ytd-rich-item-renderer");
      items.forEach((item) => {
        const style = window.getComputedStyle(item);
        if (style.marginLeft === "24px") {
          item.style.marginLeft = "8px";
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // 동영상 페이지
  else if (url.includes("watch?v=")) {
    const observer = new MutationObserver(() => {
      //   removeComments();
      //   moveUpNextToCommentArea();
      //   enableTheaterMode();
      //   removeReelShelves();
      //   moveSecondaryToPrimaryInner();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
