function novel(APPS_SCRIPT_URL) {
  if (!APPS_SCRIPT_URL) return;
  if (!APPS_SCRIPT_URL.startsWith("https://script.google.com/")) return;

  const novelData = {
    id: getId(),
    title: getTitle(),
    writer: getWriterName(),
    tags: getTags(),
    isLiked: isLike(),
    continueEpisodeNumber: getContinueEpisodeNumber(),
    allEpisodeNumber: getAllEpisodeNumber(),
  };

  GM.xmlHttpRequest({
    method: "POST",
    url: APPS_SCRIPT_URL,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(novelData),
    onload: function (response) {
      try {
        const responseData = JSON.parse(response.responseText);

        if (responseData.success) console.log("데이터 전송 성공");
        else console.error("Apps Script 처리 실패: ", responseData.error);
      } catch (e) {
        console.error("응답 파싱 오류:", response.responseText);
      }
    },
    onerror: function (response) {
      console.error("통신 오류:", response.statusText);
    },
  });
}

function getId() {
  const parts = window.location.pathname.split("/");
  const id = parts.pop();
  return id;
}

function getTitle() {
  const selector = ".epnew-novel-title";
  const title = document.querySelector(selector);
  if (!title) return;

  return title.textContent.trim();
}

function getWriterName() {
  const selector = ".writer-name";
  const writerName = document.querySelector(selector);
  if (!writerName) return;

  return writerName.textContent.trim();
}

function getTags() {
  const selector = ".writer-tag";
  const parentElement = document.querySelector(selector);
  if (!parentElement) return;

  const spanElements = parentElement.querySelectorAll("span");
  const tagsArray = Array.from(spanElements).map((span) => {
    return span.textContent.trim();
  });
  return tagsArray;
}

function isLike() {
  const selector = ".btn-like";
  const likeButton = document.querySelector(selector);
  if (likeButton) {
    const isActive = likeButton.classList.contains("active");
    return isActive;
  } else return false;
}

function getContinueEpisodeNumber() {
  const btn = document.querySelector(".btn-view-run");
  if (!btn) return null;
  const match = btn.textContent.match(/EP\.(\d+)/);
  return match ? match[1] : null;
}

function getAllEpisodeNumber() {
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
