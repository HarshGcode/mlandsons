// ============================================================
// Frontend Security Protection for ML & Sons
// Prevents casual inspection and console manipulation
// ============================================================

export function initSecurity() {
  // Only enable protections in production
  if (import.meta.env.DEV) return;

  // --- Disable right-click context menu ---
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // --- Disable keyboard shortcuts for DevTools ---
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element picker)
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
      e.preventDefault();
      return false;
    }
  });

  // --- Detect DevTools via window size difference ---
  let devtoolsOpen = false;
  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        handleDevToolsOpen();
      }
    } else {
      devtoolsOpen = false;
    }
  };
  window.addEventListener('resize', checkDevTools);
  setInterval(checkDevTools, 2000);

  // --- Disable text selection on sensitive elements ---
  const style = document.createElement('style');
  style.textContent = `
    body {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    input, textarea, select {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
  `;
  document.head.appendChild(style);

  // --- Disable drag ---
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // --- Clear console and show warning ---
  consoleClear();
}

function handleDevToolsOpen() {
  consoleClear();
}

function consoleClear() {
  console.clear();
  console.log(
    '%c⚠️ WARNING!',
    'color: red; font-size: 40px; font-weight: bold; text-shadow: 2px 2px black;'
  );
  console.log(
    '%cThis is a protected website. Any unauthorized access, scraping, or tampering is prohibited and may be tracked.',
    'color: red; font-size: 16px;'
  );
  console.log(
    '%cIf someone told you to paste something here, it is likely a scam.',
    'color: orange; font-size: 14px;'
  );
}
