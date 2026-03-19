function fGetFocusableElements() {
  const sSelector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(", ");

  return [...document.querySelectorAll(sSelector)]
    .filter(el => {
      const oStyle = window.getComputedStyle(el);
      return oStyle.display !== "none" && oStyle.visibility !== "hidden";
    });
}

function fSetCaretToEnd(oEl) {
  if (oEl.tagName === "INPUT" || oEl.tagName === "TEXTAREA") {
    const iLen = oEl.value.length;
    oEl.focus();
    oEl.setSelectionRange(iLen, iLen);
  } else {
    oEl.focus();
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
    // alert('key: ' + event.key + '\ncode: ' + event.code )  
    return;
  }

  const oActive = document.activeElement;
  const loFocusable = fGetFocusableElements();
  const iIndex = loFocusable.indexOf(oActive);

  if (iIndex === -1) return;

  event.preventDefault();

  let iNextIndex;

  if (event.key === "ArrowDown") {
    iNextIndex = iIndex + 1 < loFocusable.length ? iIndex + 1 : 0;
  } else {
    iNextIndex = iIndex - 1 >= 0 ? iIndex - 1 : loFocusable.length - 1;
  }

  fSetCaretToEnd(loFocusable[iNextIndex]);
});

const oKeyDebug = document.getElementById("keyDebug");


function fShowKey(event) {
  const sText =
    "type: " + event.type + "\n" +
    "key: " + event.key + "\n" +
    "code: " + event.code + "\n" +
    "keyCode: " + event.keyCode + "\n" +
    "which: " + event.which;

  oKeyDebug.textContent = sText;

  alert(sText);
}

document.addEventListener("keydown", fShowKey);
document.addEventListener("keyup", fShowKey);
document.addEventListener("mousemove", function (event) {
  oKeyDebug.textContent = "mouse move: " + event.clientX + ", " + event.clientY;
});

