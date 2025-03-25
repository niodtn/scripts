// ==UserScript==
// @name        Toki autoHide
// @namespace   github:niodtn/scripts/toki
// @match       *://newtoki*.com/*
// @match       *://booktoki*.com/*
// @include     /^https?:\/\/\w*toki\d*.com\/.*/
// @grant       none
// @version     1.2.7
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
  data = data.filter((item) => !item.startsWith("# ")); // #으로 시작하는 줄 필터링
  return data;
}

async function newtoki(ulElement) {
  let data = (await Promise.all([
    getList("https://raw.githubusercontent.com/niodtn/scripts/refs/heads/main/toki/newtoki.txt"),
  ])).flat();
  let nodups = [...new Set(data)];

  ulElement.querySelectorAll("li").forEach((li) => {
    const dateTitle = li.getAttribute("date-title");
    let tt = nodups.some((x) => x === dateTitle);
    if (tt) li.remove();
  });
}

function removeDivElementsFromManatoki(list) {
  list.forEach((dt) => {
    const buttons = document.querySelectorAll("a.btn.btn-xs.btn-primary");
    buttons.forEach((button) => {
      if (button.innerText == "전편보기") {
        console.log(button.href);
        console.log(button.getAttribute("rel"));
      }
    });
  });
}

(function () {
  "use strict";

  const domain = window.location.hostname;
  const path = window.location.pathname;

  if (
    /^newtoki\d+\.com$/.test(domain) &&
    /^\/webtoon(?:\/p\w{1,2})?$/.test(path)
  ) {
    // newtoki
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
  } else if (/^booktoki\d+\.com$/.test(domain) && path == `/novel`) {
    // booktoki

    // Styles
    let elements_listItem = document.querySelectorAll(".list-item");
    elements_listItem.forEach(function (element) {
      element.style.marginRight = "5px";
      element.style.marginBottom = "5px";
    });
    let element_webtoonList = document.querySelector("#webtoon-list");
    element_webtoonList.style.marginRight = "-5px";
  } else if (
    /^manatoki\d+\.net$/.test(domain) &&
    (path = `/page/update` || path == `/bbs/page.php`)
  ) {
    // manatoki
  }
})();
