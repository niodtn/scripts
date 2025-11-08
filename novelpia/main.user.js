// ==UserScript==
// @name         Novelpia Script
// @namespace    github:niodtn/scripts/novelpia
// @version      2025-11-09
// @description  Novelpia
// @author       Niodtn
// @match        *://novelpia.com/*
// @match        *://www.novelpia.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=novelpia.com
// @grant        none
// @run-at       document-end
// @downloadURL  https://niodtn.github.io/scripts/novelpia/main.user.js
// @updateURL    https://niodtn.github.io/scripts/novelpia/main.user.js

// @require      https://niodtn.github.io/scripts/lib/router.js
// @require      https://niodtn.github.io/scripts/novelpia/mybook.js
// ==/UserScript==

/* global PageDispatcher, mybook */

(function () {
  "use strict";
  const dispatcher = new PageDispatcher();

  dispatcher.register("/mybook", mybook);

  dispatcher.start();
})();
