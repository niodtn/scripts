function mybook() {
  // --- HTML 주입 관련 ---

  /** 제목과 내용으로 구성된 div를 생성합니다. */
  function createNovelInfoDiv(title, content) {
    /** 인자를 받아 span 요소를 생성하고 반환합니다. */
    const createSpan = (className, textContent) => {
      const span = document.createElement("span");
      span.className = className;
      span.textContent = textContent;
      return span;
    };

    const div = document.createElement("div");

    div.appendChild(createSpan("novel-numerical-title", title));
    div.appendChild(createSpan("novel-numerical-content", content));

    return div;
  }

  // --- 파싱 관련 ---

  /** 마지막으로 읽은 회차 숫자 가져오기 */
  function lastReadEpisode(novel) {
    const continueButton = novel.querySelector("button.novel-btn-continue");
    if (!continueButton) return null;

    const number = continueButton.textContent.trim().replace(/[^0-9]/g, ""); // replace -> 숫자 제외 전부 제거
    return number;
  }

  /** 최신 회차 숫자 가져오기 */
  function latestEpisode(novel) {
    const spans = novel.querySelectorAll("span.novel-numerical-title");
    const titleSpan = Array.from(spans).find((span) => {
      return span.textContent.trim() === "회차";
    });

    if (!titleSpan) return;
    const contentSpan = titleSpan.parentElement.querySelector(
      "span.novel-numerical-content"
    );

    return contentSpan.textContent.trim();
  }

  // --- 메인 로직 ---
  document
    .querySelector(".mybook-data-list-items")
    ?.querySelectorAll(".novel-list-real-container")
    .forEach((novel) => {
      const lastRead = lastReadEpisode(novel);
      const latest = latestEpisode(novel);
      if (!lastRead) return;

      const remain = latest - lastRead;
      const percent = Math.floor((lastRead / latest) * 100);

      const remainDiv = createNovelInfoDiv("남은 회차", ` ${remain}`);
      const percentDiv = createNovelInfoDiv("진도", ` ${percent}%`);

      const numericalContainer = novel.querySelector(".novel-numerical");
      numericalContainer.appendChild(remainDiv);
      numericalContainer.appendChild(percentDiv);

      const numericalDivs = numericalContainer.querySelectorAll(
        ".novel-numerical > div"
      );
      numericalDivs[0]?.remove();
      numericalDivs[2]?.remove();
    });
}
