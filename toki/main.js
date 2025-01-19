// ==UserScript==
// @name        Toki autoHide
// @namespace   Niodtn/Toki
// @match       *://newtoki*.com/*
// @grant       none
// @version     1.0.1
// @author      Niodtn
// @description Personal Tampermonkey script to filter content on newtoki.com
// ==/UserScript==

(function() {
  'use strict';

  const domain = window.location.hostname;
  if (/^newtoki\d+\.com$/.test(domain)) {
    console.log("test")
  }
})();
