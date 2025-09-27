class GoogleAdsManager {
    constructor(publisherId) {
        this.publisherId = publisherId;
        this.scriptLoaded = false;
    }

    loadAutoAds() {
        if (!window.ADS_ENABLED) return;
        if (this.scriptLoaded) return;

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.publisherId}`;
        script.crossOrigin = "anonymous";

        document.head.appendChild(script);
        this.scriptLoaded = true;
    }

    loadAdUnit(containerId, adSlot, adFormat = "auto", fullWidth = true) {
        if (!window.ADS_ENABLED) {
            const container = document.getElementById(containerId);
            if (container) container.innerHTML = ""; // clear if disabled
            return;
        }

        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="${this.publisherId}"
                data-ad-slot="${adSlot}"
                data-ad-format="${adFormat}"
                data-full-width-responsive="${fullWidth}">
            </ins>
        `;

        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}
