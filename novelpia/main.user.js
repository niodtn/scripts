// ==UserScript==
// @name         Novelpia Script
// @namespace    github:niodtn/scripts/novelpia
// @version      2026-01-07
// @description  Novelpia
// @author       Niodtn
// @match        *://novelpia.com/*
// @match        *://www.novelpia.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=novelpia.com
// @grant        GM.xmlHttpRequest
// @run-at       document-end
// @downloadURL  https://niodtn.github.io/scripts/novelpia/main.user.js
// @updateURL    https://niodtn.github.io/scripts/novelpia/main.user.js

// @connect      script.google.com
// @connect      script.googleusercontent.com

// @require      https://niodtn.github.io/scripts/lib/router.js
// @require      https://niodtn.github.io/scripts/novelpia/mybook.js
// @require      https://niodtn.github.io/scripts/novelpia/novel.js
// ==/UserScript==

/* global PageDispatcher, mybook, novel */

(function () {
  "use strict";

  const dispatcher = new PageDispatcher();

  dispatcher.register("/mybook", mybook);
  dispatcher.register("/novel", novel);

  dispatcher.start();
})();
