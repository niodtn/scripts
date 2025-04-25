// ==UserScript==
// @name        Toki autoHide
// @namespace   github:niodtn/scripts/toki
// @include     /https:\/\/\w*toki\d*.(com|net)\/.*/
// @grant       none
// @version     1.4.0
// @author      Niodtn
// @description Personal Tampermonkey script to filter content on newtoki.com
// @run-at      document-end
// @downloadURL https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/main.js
// @updateURL   https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/main.js
// ==/UserScript==

async function getList(url) {
  let response = await fetch(url);
  let data = await response.text();

  data = data.split("\n");
  data = data.filter(Boolean); // 빈줄 필터링
  data = data.filter((item) => !item.startsWith("# ")); // `#`으로 시작하는 줄 필터링
  return data;
}

function isNewtoki(domain, path) {
  const domainRegex = /^newtoki\d+\.com$/;
  const pathRegex = /^\/webtoon(?:\/p\w{1,2})?$/;
  return domainRegex.test(domain) && pathRegex.test(path);
}

async function newtoki(ulElement) {
  let data = (
    await Promise.all([
      getList(
        "https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/newtoki.txt"
      ),
    ])
  ).flat();
  let nodups = [...new Set(data)];

  ulElement.querySelectorAll("li").forEach((li) => {
    const dateTitle = li.getAttribute("date-title");
    if (nodups.some((x) => x === dateTitle)) li.remove();
  });
}

function isBooktoki(domain, path) {
  const domainRegex = /^booktoki\d+\.com$/;
  const pathRegex = /^\/novel(?:\/p\w{1,2})?$/;
  return domainRegex.test(domain) && pathRegex.test(path);
}

async function booktoki(ulElement) {
  let data = (
    await Promise.all([
      getList(
        "https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/booktoki.txt"
      ),
    ])
  ).flat();
  let nodups = [...new Set(data)];

  ulElement.querySelectorAll("li").forEach((li) => {
    const dateTitle = li.getAttribute("date-title");
    if (nodups.some((x) => x === dateTitle)) li.remove();
  });
}

function isManatoki(domain, path) {
  const domainRegex = /^manatoki\d+\.net$/;
  return (
    domainRegex.test(domain) &&
    (path = `/page/update` || path == `/bbs/page.php`)
  );
}

async function manatoki(divElement) {
  let data = (
    await Promise.all([
      getList(
        "https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/manatoki.txt"
      ),
    ])
  ).flat();
  let nodups = [...new Set(data)];

  divElement.querySelectorAll(".post-row").forEach((div) => {
    const a = div.querySelector(".media-body").querySelector("a");
    let text = a.textContent;
    text = text.replace(/\s+/g, " ").trim();
    text = text.replace(/\s[\d.~\-]+화\s\w*\s\w*/, "");
    if (nodups.some((x) => x === text)) div.remove();
  });
}

(function () {
  "use strict";

  const domain = window.location.hostname;
  const path = window.location.pathname;

  if (isNewtoki(domain, path)) {
    const ulElement = document.querySelector("#webtoon-list-all");
    if (ulElement) {
      newtoki(ulElement);
    }

    // Styles
    let elements_listItem = document.querySelectorAll(".list-item");
    elements_listItem.forEach(function (element) {
      element.style.marginRight = "5px";
      element.style.marginBottom = "5px";
    });
    let element_webtoonList = document.querySelector("#webtoon-list");
    element_webtoonList.style.marginRight = "-5px";
  } else if (isBooktoki(domain, path)) {
    const ulElement = document.querySelector("#webtoon-list-all");
    if (ulElement) {
      booktoki(ulElement);
    }

    // Styles
    let elements_listItem = document.querySelectorAll(".list-item");
    elements_listItem.forEach(function (element) {
      element.style.marginRight = "5px";
      element.style.marginBottom = "5px";
    });
    let element_webtoonList = document.querySelector("#webtoon-list");
    element_webtoonList.style.marginRight = "-5px";
  } else if (isManatoki(domain, path)) {
    const divElement = document
      .querySelector("#at-main")
      .querySelector(".post-wrap");
    if (divElement) {
      manatoki(divElement);
    }
  }
})();
