// ==UserScript==
// @name        Toki autoHide
// @namespace   Violentmonkey Scripts
// @match       *://newtoki*.com/*
// @grant       none
// @version     1.0
// @author      Niodtn
// @description 1/19/2025, 9:41:47 PM
// ==/UserScript==

(function() {
  'use strict';

  const domain = window.location.hostname;
  if (/^newtoki\d+\.com$/.test(domain)) {
    console.log("test")
  }
})();
