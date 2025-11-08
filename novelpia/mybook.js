function mybook() {
  document
    .querySelector(".mybook-data-list-items")
    .querySelectorAll(".novel-list-real-container")
    .forEach(processNovelData);
}

/**
 * 개별 소설 요소에 대해 진도(퍼센트) 및 남은 회차를 계산하고 DOM에 추가합니다.
 * @param {HTMLElement} novel
 */
function processNovelData(novel) {
  const numbers = getAllEpisodeNumbers(novel);
  const continueEp = getContinueEpisodeNumber(novel);
  const epNumbers = parseEpisodeNumbers(numbers, continueEp);

  if (!epNumbers) return;

  const { total, current } = epNumbers;
  let percentText = "";
  let remainText = "";

  const percent = Math.floor((current / total) * 100);
  percentText = ` ${percent}%`;

  const remain = total - current;
  remainText = ` ${remain}`;

  const numericalContainer = novel.querySelector(".novel-numerical");

  if (percentText !== "") {
    const percentDiv = createNovelInfoDiv("진도", percentText);
    numericalContainer.appendChild(percentDiv);
  }

  if (remainText !== "") {
    const remainDiv = createNovelInfoDiv("남은 회차", remainText);
    numericalContainer.appendChild(remainDiv);
  }

  if (percentText !== "" || remainText !== "") {
    const numericalDivs = numericalContainer.querySelectorAll(
      ".novel-numerical > div"
    );
    if (numericalDivs[0]) numericalDivs[0].remove();
    if (numericalDivs[2]) numericalDivs[2].remove();
  }
}

function getAllEpisodeNumbers(novel) {
  const numericalDivs = novel.querySelectorAll(".novel-numerical > div");

  return Array.from(numericalDivs)
    .map((div) => {
      const spans = div.querySelectorAll("span");
      if (spans.length !== 2) return null;

      const [span1, span2] = spans;
      const text1 = span1.textContent.trim();
      const text2 = span2.textContent.trim();

      if (text1 === "회차") return text2;
      if (text2 === "회차") return text1;

      return null;
    })
    .filter((number) => number !== null);
}

function getContinueEpisodeNumber(novel) {
  const btn = novel.querySelector(".novel-btn-continue");
  if (!btn) return null;
  const match = btn.textContent.match(/EP\.(\d+)/);
  return match ? match[1] : null;
}

/**
 * 소설 요소에서 전체/현재 회차 정보를 파싱하여 숫자로 반환합니다.
 * @param {string[]} numbers - getAllEpisodeNumbers의 결과
 * @param {string | null} continueEp - getContinueEpisodeNumber의 결과
 * @returns {{total: number, current: number} | null}
 */
function parseEpisodeNumbers(numbers, continueEp) {
  if (numbers.length === 0 || continueEp === null) return null;

  // 문자열에서 숫자만 추출하여 정수로 변환
  const total = parseInt(numbers[0].replace(/[^\d]/g, ""), 10);
  const current = parseInt(continueEp.replace(/[^\d]/g, ""), 10);

  if (isNaN(total) || isNaN(current) || total <= 0) return null;

  return { total, current };
}

function createNovelInfoDiv(title, content) {
  const div = document.createElement("div");
  const span_title = document.createElement("span");
  const span_content = document.createElement("span");

  span_title.className = "novel-numerical-title";
  span_title.textContent = title;
  div.appendChild(span_title);

  span_content.className = "novel-numerical-content";
  span_content.textContent = content;
  div.appendChild(span_content);

  return div;
}
