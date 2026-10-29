import { enableMatomoShadowDomLinkTracking } from './matomo-shadow-dom-link-tracking.util';
import { matomoWindow } from './matomo-window.util';

class AnalyticsUtil {
    private _matomoPiwikScriptId: string;
    private matomoParameters: { matomoId: number; matomoUrl: string; shadowDomLinkTracking: boolean } | undefined;

    constructor() {
        this._matomoPiwikScriptId = 'vl-cookie-consent-matomo-piwik-script';
    }

    /**
     * Matomo configuratie instellen.
     * @param matomoId - Het Matomo site ID
     * @param matomoUrl - De Matomo server URL (bijvoorbeeld '//stats.example.com/')
     * @param shadowDomLinkTracking - Ook klikken op links in de shadow DOM van web-componenten loggen
     */
    setMatomoConfig(matomoId: number, matomoUrl: string, shadowDomLinkTracking = false): void {
        this.matomoParameters = { matomoId, matomoUrl, shadowDomLinkTracking };
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
        const win = matomoWindow();
        if (!win._paq) {
            win._paq = [];
        }

        const _paq = win._paq;

        // Configureer Matomo
        _paq.push(['setTrackerUrl', matomo.url + 'piwik.php']);
        _paq.push(['setSiteId', matomo.id]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        if (this.matomoParameters?.shadowDomLinkTracking) {
            enableMatomoShadowDomLinkTracking();
        }

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
            const _paq = matomoWindow()._paq;
            if (!_paq) return;

            _paq.push(['setReferrerUrl', currentUrl]);
            currentUrl = window.location.hash.substring(1);
            _paq.push(['setCustomUrl', currentUrl]);
            _paq.push(['setDocumentTitle', document.title]);
            _paq.push(['deleteCustomVariables', 'page']);
            _paq.push(['setPagePerformanceTiming', 0]);
            _paq.push(['trackPageView']);

            const content = document.getElementById('content');
            if (content) {
                _paq.push(['MediaAnalytics::scanForMedia', content]);
                _paq.push(['FormAnalytics::scanForForms', content]);
                _paq.push(['trackContentImpressionsWithinNode', content]);
            }
            _paq.push(['enableLinkTracking']);
        });
    }
}

export const analytics = new AnalyticsUtil();
