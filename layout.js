// layout.js — loads header and footer for all pages

async function loadLayout() {
  try {
    // Load header and footer
    const [headerHTML, footerHTML] = await Promise.all([
      fetch('header.html').then(r => r.text()),
      fetch('footer.html').then(r => r.text())
    ]);

    // Insert into page
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    if (headerContainer) headerContainer.innerHTML = headerHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;

    // Load config.js
    const configScript = document.createElement('script');
    configScript.src = 'config.js';
    document.body.appendChild(configScript);

    // When config is ready, load main script
    configScript.onload = () => {
      const mainScript = document.createElement('script');
      mainScript.src = 'script.js';
      document.body.appendChild(mainScript);

      // ✅ Initialize dynamic content after scripts and DOM are ready
      mainScript.onload = () => {
        if (typeof initDynamicContent === "function") {
          initDynamicContent();
        }
      };
    };
  } catch (err) {
    console.error("Failed to load layout:", err);
  }
}

// Run immediately
loadLayout();
