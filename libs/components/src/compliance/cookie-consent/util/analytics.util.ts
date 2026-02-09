class AnalyticsUtil {
    private _matomoScriptId: string;
    private _matomoPiwikScriptId: string;
    private matomoParameters: { matomoId: number; matomoUrl: string } | undefined;

    constructor() {
        this._matomoScriptId = 'vl-cookie-consent-matomo-script';
        this._matomoPiwikScriptId = 'vl-cookie-consent-matomo-piwik-script';
    }

    get scriptId(): string {
        return this._matomoScriptId;
    }

    /**
     * Matomo configuratie instellen.
     * @param matomoId - Het Matomo site ID
     * @param matomoUrl - De Matomo server URL (bijvoorbeeld '//stats.example.com/')
     */
    setMatomoConfig(matomoId: number, matomoUrl: string): void {
        this.matomoParameters = { matomoId, matomoUrl };
    }

    get id(): { id: number; url: string } | undefined {
        if (this.matomoParameters) {
            const { matomoId, matomoUrl } = this.matomoParameters;
            if (matomoId && matomoUrl) {
                return { id: matomoId, url: matomoUrl };
            }
        }
        return undefined;
    }

    get script(): HTMLScriptElement {
        const matomo = analytics.id;
        const element = document.createElement('script');
        element.setAttribute('id', this._matomoScriptId);
        if (matomo) {
            const script = document.createTextNode(
                '' +
                    'if (!window._paq) {' +
                    'var _paq = window._paq || [];' +
                    "_paq.push(['trackPageView']);" +
                    "_paq.push(['enableLinkTracking']);" +
                    '(function() {' +
                    "var u='" +
                    matomo.url +
                    "';" +
                    "_paq.push(['setTrackerUrl', u+'piwik.php']);" +
                    "_paq.push(['setSiteId', " +
                    matomo.id +
                    ']);' +
                    "var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];" +
                    "g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; g.id='" +
                    this._matomoPiwikScriptId +
                    "'; s.parentNode.insertBefore(g,s);" +
                    '})();' +
                    '' +
                    'var currentUrl = window.location.href;' +
                    "window.addEventListener('hashchange', function() {" +
                    "_paq.push(['setReferrerUrl', currentUrl]);" +
                    "currentUrl = '' + window.location.hash.substr(1);" +
                    "_paq.push(['setCustomUrl', currentUrl]);" +
                    "_paq.push(['setDocumentTitle', document.title]);" +
                    "_paq.push(['deleteCustomVariables', 'page']);" +
                    "_paq.push(['setPagePerformanceTiming', 0]);" +
                    "_paq.push(['trackPageView']);" +
                    "var content = document.getElementById('content');" +
                    "_paq.push(['MediaAnalytics::scanForMedia', content]);" +
                    "_paq.push(['FormAnalytics::scanForForms', content]);" +
                    "_paq.push(['trackContentImpressionsWithinNode', content]);" +
                    "_paq.push(['enableLinkTracking']);" +
                    '});' +
                    '}'
            );
            element.appendChild(script);
        }
        return element;
    }
}

export const analytics = new AnalyticsUtil();
