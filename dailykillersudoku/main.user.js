// ==UserScript==
// @name         My Sudoku Script
// @namespace   github:niotn/scripts/dailykillersudoku
// @version      2026-04-15
// @description  Grid
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
            top: 0%;

            /* grid */
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            width: 100% !important;
            height: 100% !important;

            /* etc */
            padding: 20px 4px 8px 4px !important;
        }

        .grid-num {
            font-weight: bold;
            font-size: 60% !important;

            display: flex !important;
            align-items: center;
            justify-content: center;

            color: #363686 !important;
            line-height: 1 !important;
        }
    `);

  const dispatcher = new PageDispatcher(true);

  dispatcher.register("/puzzle", () => {
    document.querySelectorAll(".pencil-marks").forEach(applyGrid);
  });
  dispatcher.register("/m/puzzle", () => {
    document.querySelectorAll(".pencil-marks").forEach(applyGrid);
  });

  dispatcher.start();
})();
