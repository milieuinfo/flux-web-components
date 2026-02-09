declare global {
    interface Window {
        _paq?: Array<Array<string | number | object | undefined>>;
    }
}

class AnalyticsUtil {
    private _matomoPiwikScriptId: string;
    private matomoParameters: { matomoId: number; matomoUrl: string } | undefined;

    constructor() {
        this._matomoPiwikScriptId = 'vl-cookie-consent-matomo-piwik-script';
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

    /**
     * Initialiseert Matomo tracking op een CSP-vriendelijke manier.
     * In plaats van inline scripts te injecteren, wordt de configuratie via window._paq gedaan
     * en wordt het externe Matomo script geladen.
     */
    initializeTracking(): void {
        const matomo = this.id;
        if (!matomo) {
            return;
        }

        // Initialiseer _paq array als deze nog niet bestaat
        if (!window._paq) {
            window._paq = [];
        }

        const _paq = window._paq;

        // Configureer Matomo
        _paq.push(['setTrackerUrl', matomo.url + 'piwik.php']);
        _paq.push(['setSiteId', matomo.id]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);

        // Load Matomo script
        this.loadMatomoScript(matomo.url);

        // Setup hashchange tracking voor SPAs
        this.setupHashChangeTracking();
    }

    private loadMatomoScript(baseUrl: string): void {
        // Check of script al geladen is
        if (document.getElementById(this._matomoPiwikScriptId)) {
            return;
        }

        const script = document.createElement('script');
        script.id = this._matomoPiwikScriptId;
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = baseUrl + 'piwik.js';

        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(script, firstScript);
    }

    private setupHashChangeTracking(): void {
        let currentUrl = window.location.href;

        window.addEventListener('hashchange', () => {
            if (!window._paq) return;

            window._paq.push(['setReferrerUrl', currentUrl]);
            currentUrl = window.location.hash.substring(1);
            window._paq.push(['setCustomUrl', currentUrl]);
            window._paq.push(['setDocumentTitle', document.title]);
            window._paq.push(['deleteCustomVariables', 'page']);
            window._paq.push(['setPagePerformanceTiming', 0]);
            window._paq.push(['trackPageView']);

            const content = document.getElementById('content');
            if (content) {
                window._paq.push(['MediaAnalytics::scanForMedia', content]);
                window._paq.push(['FormAnalytics::scanForForms', content]);
                window._paq.push(['trackContentImpressionsWithinNode', content]);
            }
            window._paq.push(['enableLinkTracking']);
        });
    }
}

export const analytics = new AnalyticsUtil();
