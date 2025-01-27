// ==UserScript==
// @name        Move Output Button
// @namespace   github:niotn/scripts/charactercalculator
// @match       *://charactercalculator.com/*/alphabetizer/
// @grant       none
// @version     1.0.0
// @author      Niodtn
// @description 좀 더 편하게 해줌
// ==/UserScript==

(function() {
  'use strict';

  var outputButtons = document.getElementById('output-buttons');
  var output = document.getElementById('output');

  if (outputButtons && output) {
    output.parentNode.insertBefore(outputButtons, output);
  }
})();
