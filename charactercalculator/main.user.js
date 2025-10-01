// ==UserScript==
// @name        Move Output Button
// @namespace   github:niotn/scripts/charactercalculator
// @version     2025-10-02
// @description 좀 더 편하게 해줌
// @author      Niodtn
// @match       *://charactercalculator.com/*/alphabetizer/
// @grant       none
// @run-at      document-end
// @downloadURL https://niodtn.github.io/scripts/charactercalculator/main.user.js
// @updateURL   https://niodtn.github.io/scripts/charactercalculator/main.user.js
// ==/UserScript==

(function () {
  "use strict";

  var outputButtons = document.getElementById("output-buttons");
  var output = document.getElementById("output");

  if (outputButtons && output) {
    output.parentNode.insertBefore(outputButtons, output);
  }
})();
