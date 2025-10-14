class BlinkAdManager {
  constructor(networkCode) {
    this.networkCode = networkCode;
    this.scriptLoaded = false;
    this.cmdQueue = [];
    this.init();
  }

  init() {
    if (this.scriptLoaded) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    document.head.appendChild(script);

    window.googletag = window.googletag || { cmd: [] };
    script.onload = () => {
      this.scriptLoaded = true;
      this.flushQueue();
    };
  }

  flushQueue() {
    this.cmdQueue.forEach(fn => fn());
    this.cmdQueue = [];
  }

  loadAdUnit(containerId, adUnitPath, size = [300, 250]) {
    const renderAd = () => {
      googletag.cmd.push(() => {
        googletag.defineSlot(`/${this.networkCode}/${adUnitPath}`, size, containerId)
          .addService(googletag.pubads());
        googletag.enableServices();
        googletag.display(containerId);
      });
    };

    if (!this.scriptLoaded) {
      this.cmdQueue.push(renderAd);
    } else {
      renderAd();
    }
  }
}
