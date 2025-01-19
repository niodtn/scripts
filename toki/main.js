// ==UserScript==
// @name        Toki autoHide
// @namespace   Niodtn/Toki
// @match       *://newtoki*.com/*
// @grant       none
// @version     1.0.4
// @author      Niodtn
// @description Personal Tampermonkey script to filter content on newtoki.com
// ==/UserScript==

(function() {
  'use strict';

  const domain = window.location.hostname;
  if (/^newtoki\d+\.com$/.test(domain)) {
    console.log("test");

    const ulElement = document.querySelector('#w-list ul');
    if (ulElement) {
      const liElements = ulElement.querySelectorAll('li');
    }

    const url = 'https://raw.githubusercontent.com/niodtn/scripts/refs/heads/dev/toki/newtoki/CN.txt';
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const remove = data.split('\n').map(line => line.trim());
        // data.split('\n').map(line => line.trim()).filter(Boolean);

        remove.forEach(test => {
          console.log(test);
        });
        
        
      })
      .catch(error => {
        console.error("Niodtn/Toki: ", error);
      });
  }
})();
