// ==UserScript==
// @name         My Sudoku Script
// @namespace    github:niotn/scripts/dailykillersudoku
// @version      2026-04-15c
// @description  Grid Layout for Pencil Marks
// @author       Niodtn
// @match        https://www.dailykillersudoku.com/puzzle/*
// @match        https://www.dailykillersudoku.com/m/puzzle/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle

// @require      https://niodtn.github.io/scripts/lib/router.js
// ==/UserScript==

/* global PageDispatcher */

function applyGrid(cell) {
  const currentNotes = cell.innerText;

  if (cell.dataset.lastNotes === currentNotes) return;
  cell.dataset.lastNotes = currentNotes;

  cell.innerHTML = "";

  for (let i = 1; i <= 9; i++) {
    const span = document.createElement("span");
    span.className = "grid-num";

    if (currentNotes.includes(i.toString())) {
      span.innerText = i;
    } else {
      span.innerText = "";
    }

    cell.appendChild(span);
  }
}

(function () {
  "use strict";

  GM_addStyle(`
    .pencil-marks {
      /* override */
      color: transparent !important;
      display: grid !important;
      top: 0% !important;

      /* grid layout */
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      width: 100% !important;
      height: 100% !important;

      /* spacing */
      padding: 30% 4px 8px 4px !important;
      box-sizing: border-box !important;
    }

    .grid-num {
      display: flex !important;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 60% !important;
      color: #363686 !important;
      line-height: 1 !important;
    }

    :root.dark-mode .grid-num {
      color: #eef !important;
    }
  `);

  const dispatcher = new PageDispatcher(true);

  const handler = () => {
    document.querySelectorAll(".pencil-marks").forEach(applyGrid);
  };

  dispatcher.register("/puzzle", handler);
  dispatcher.register("/m/puzzle", handler);

  dispatcher.start();
})();
