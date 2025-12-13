function novel() {
  new _novel();
}

class _novel {
  constructor() {
    console.debug("ID:", this.getId());
    console.debug("작품 이름:", this.getTitle());
    console.debug("작가 이름:", this.getWriterName());
    console.debug("선호작:", this.isLike());
    console.debug("태그:", this.getTags());
    console.debug("마지막 회차:", this.getLatestEpisode());
    console.debug("마지막으로 읽은 회차:", this.getLastReadEpisode());
    console.debug("연재 지연/중단:", this.getStopped());
    console.debug("완결 여부:", this.getEnded());

    if (this.getLastReadEpisode()) this.spreadsheet();
    else return;
  }

  /** 작품 ID */
  getId() {
    const parts = window.location.pathname.split("/");
    const id = parts.pop();
    return id;
  }

  /** 작품 이름 */
  getTitle() {
    const selector = ".epnew-novel-title";
    const title = document.querySelector(selector);
    if (!title) return;

    return title.textContent.trim();
  }

  /** 작가 이름 */
  getWriterName() {
    const selector = ".writer-name";
    const writerName = document.querySelector(selector);
    if (!writerName) return;

    return writerName.textContent.trim();
  }

  /** 선호작 여부 */
  isLike() {
    const selector = ".btn-like";
    const likeButton = document.querySelector(selector);
    if (likeButton) {
      const isActive = likeButton.classList.contains("active");
      return isActive;
    } else return false;
  }

  /** 태그 */
  getTags() {
    const selector = ".writer-tag";
    const parentElement = document.querySelector(selector);
    if (!parentElement) return;

    const spanElements = parentElement.querySelectorAll("span");
    const tagsArray = Array.from(spanElements).map((span) => {
      return span.textContent.trim();
    });
    return tagsArray;
  }

  /** 최신 회차 숫자 */
  getLatestEpisode() {
    const elements = document.querySelectorAll("span.writer-name");
    const episodeNumbers = [];

    elements.forEach((element) => {
      const textContent = element.innerText;
      const match = textContent.match(/[\d,]+회차/);

      if (match) {
        const numberStringWithComma = match[0];
        const numberStringClean = numberStringWithComma.replace(/,/g, "");
        const number = parseInt(numberStringClean, 10);
        episodeNumbers.push(number);
      }
    });
    return episodeNumbers[0];
  }

  /** 마지막으로 읽은 회차 숫자 */
  getLastReadEpisode() {
    const btn = document.querySelector(".btn-view-run");
    if (!btn) return null;
    const match = btn.textContent.match(/EP\.(\d+)/);
    return match ? match[1] : null;
  }

  /** 연재 중단 또는 지연 여부 **/
  getStopped() {
    const badge = document.querySelector(".in-badge");
    if (!badge) return false;

    for (const e of badge.children) {
      const text = e.innerText.trim();
      if (text === "연재중단" || text === "연재지연") {
        return true;
      }
    }
    return false;
  }

  getEnded() {
    const badge = document.querySelector(".in-badge");
    if (!badge) return false;

    for (const e of badge.children) {
      const text = e.innerText.trim();
      if (text === "완결") {
        return true;
      }
    }
    return false;
  }

  /** 스프레드시트로 데이터 전송 */
  spreadsheet() {
    const APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwsI6Fah7OaeRhkSjsp65leY2SYpdVquf4GBH8xxXY7dNqsHn8HskCuR_XXyIja-rfU/exec";

    const novelData = {
      id: this.getId(),
      title: this.getTitle(),
      writer: this.getWriterName(),
      tags: this.getTags(),
      isLiked: this.isLike(),
      continueEpisodeNumber: this.getLastReadEpisode(),
      allEpisodeNumber: this.getLatestEpisode(),
      isStopped: this.getStopped(),
      isEnded: this.getEnded(),
    };

    GM.xmlHttpRequest({
      method: "POST",
      url: APPS_SCRIPT_URL,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(novelData),
    });
  }
}
