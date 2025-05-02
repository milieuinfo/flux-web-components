class AnalyticsUtil {
    private _matomoScriptId: string;
    private _matomoPiwikScriptId: string;
    private _matomoOntwikkelUrl: string;
    private _matomoOefenUrl: string;
    private _matomoProdUrl: string;
    private matomoParameters: { matomoId: number; matomoUrl: string } | undefined;

    constructor() {
        this._matomoScriptId = 'vl-cookie-consent-matomo-script';
        this._matomoPiwikScriptId = 'vl-cookie-consent-matomo-piwik-script';
        this._matomoOntwikkelUrl = '//stats-ontwikkel.milieuinfo.be/';
        this._matomoOefenUrl = '//stats-oefen.milieuinfo.be/';
        this._matomoProdUrl = '//stats.milieuinfo.be/';
    }

    get scriptId(): string {
        return this._matomoScriptId;
    }

    getUrlIdMatch(): { id: number; url: string } | undefined {
        let match = {
            'stats-ontwikkel.milieuinfo.be': {
                id: 1,
                url: this._matomoOntwikkelUrl,
            },
            'ontwikkel.milieuinfo.be': {
                id: 2,
                url: this._matomoOntwikkelUrl,
            },
            'omgevingsloket2-ontwikkel.omgeving.vlaanderen.be': {
                id: 3,
                url: this._matomoOntwikkelUrl,
            },
            'bredero-ontwikkel.ruimteinfo.be': {
                id: 5,
                url: this._matomoOntwikkelUrl,
            },
            'bredero-bupo-ontwikkel.ruimteinfo.be': {
                id: 6,
                url: this._matomoOntwikkelUrl,
            },
            'bredero-xfr-ontwikkel.ruimteinfo.be': {
                id: 7,
                url: this._matomoOntwikkelUrl,
            },
            'ontwikkel.ruimtemonitor.be': {
                id: 8,
                url: this._matomoOntwikkelUrl,
            },
            'rupadviestoets-ontwikkel.milieuinfo.be': {
                id: 9,
                url: this._matomoOntwikkelUrl,
            },
            'zendantennes-ontwikkel.milieuinfo.be': {
                id: 13,
                url: this._matomoOntwikkelUrl,
            },
            'omgevingsloket-ontwikkel.omgeving.vlaanderen.be': {
                id: 14,
                url: this._matomoOntwikkelUrl,
            },
            'vsm-ontwikkel.milieuinfo.be': {
                id: 16,
                url: this._matomoOntwikkelUrl,
            },
            'mobiscore-ontwikkel.omgeving.vlaanderen.be': {
                id: 22,
                url: this._matomoOntwikkelUrl,
            },
            'erkenningencontactgegevens-ontwikkel.omgeving.vlaanderen.be': {
                id: 24,
                url: this._matomoOntwikkelUrl,
            },
            'loket-erkenningen-leefmilieu-ontwikkel.omgeving.vlaanderen.be': {
                id: 30,
                url: this._matomoOntwikkelUrl,
            },
            'bed-ontwikkel.omgeving.vlaanderen.be': {
                id: 31,
                url: this._matomoOntwikkelUrl,
            },
            'omgevingsloketinzage-ontwikkel.omgeving.vlaanderen.be': {
                id: 37,
                url: this._matomoOntwikkelUrl,
            },
            'omgevingsloketinzage2-ontwikkel.omgeving.vlaanderen.be': {
                id: 38,
                url: this._matomoOntwikkelUrl,
            },
            'informatie-ontwikkel.omgeving.vlaanderen.be': {
                id: 39,
                url: this._matomoOntwikkelUrl,
            },
        }[window.location.host];

        if (!match) {
            match = {
                'stats-oefen.milieuinfo.be': {
                    id: 1,
                    url: this._matomoOefenUrl,
                },
                'oefen.ruimtemonitor.be': {
                    id: 2,
                    url: this._matomoOefenUrl,
                },
                'omgevingsloket-oefen.omgeving.vlaanderen.be': {
                    id: 3,
                    url: this._matomoOefenUrl,
                },
                'omgevingsloket2-oefen.omgeving.vlaanderen.be': {
                    id: 4,
                    url: this._matomoOefenUrl,
                },
                'vsm-oefen.milieuinfo.be': {
                    id: 8,
                    url: this._matomoOefenUrl,
                },
                'rupadviestoets-oefen.milieuinfo.be': {
                    id: 9,
                    url: this._matomoOefenUrl,
                },
                'zendantennes-oefen.milieuinfo.be': {
                    id: 10,
                    url: this._matomoOefenUrl,
                },
                'www2-oefen.omgeving.vlaanderen.be': {
                    id: 12,
                    url: this._matomoOefenUrl,
                },
                'mobiscore-oefen.omgeving.vlaanderen.be': {
                    id: 14,
                    url: this._matomoOefenUrl,
                },
                'erkenningencontactgegevens-oefen.omgeving.vlaanderen.be': {
                    id: 16,
                    url: this._matomoOefenUrl,
                },
                'controleviewer-oefen.omgeving.vlaanderen.be': {
                    id: 21,
                    url: this._matomoOefenUrl,
                },
                'loket-erkenningen-leefmilieu-oefen.omgeving.vlaanderen.be': {
                    id: 23,
                    url: this._matomoOefenUrl,
                },
                'bed-oefen.omgeving.vlaanderen.be': {
                    id: 24,
                    url: this._matomoOefenUrl,
                },
                'omgevingsloketinzage-oefen.omgeving.vlaanderen.be': {
                    id: 27,
                    url: this._matomoOefenUrl,
                },
                'omgevingsloketinzage2-oefen.omgeving.vlaanderen.be': {
                    id: 28,
                    url: this._matomoOefenUrl,
                },
                'informatie-oefen.omgeving.vlaanderen.be': {
                    id: 29,
                    url: this._matomoOefenUrl,
                },
            }[window.location.host];
        }

        if (!match) {
            match = {
                'vsm.milieuinfo.be': {
                    id: 9,
                    url: this._matomoProdUrl,
                },
                'rupadviestoets.milieuinfo.be': {
                    id: 11,
                    url: this._matomoProdUrl,
                },
                'zendantennes.milieuinfo.be': {
                    id: 12,
                    url: this._matomoProdUrl,
                },
                'omgevingsloket.omgeving.vlaanderen.be': {
                    id: 14,
                    url: this._matomoProdUrl,
                },
                'www2.omgeving.vlaanderen.be': {
                    id: 27,
                    url: this._matomoProdUrl,
                },
                'mobiscore.omgeving.vlaanderen.be': {
                    id: 29,
                    url: this._matomoProdUrl,
                },
                'ruimtelijkeordening.be': {
                    id: 30,
                    url: this._matomoProdUrl,
                },
                'complexeprojecten.be': {
                    id: 31,
                    url: this._matomoProdUrl,
                },
                'rsv.ruimtevlaanderen.be': {
                    id: 32,
                    url: this._matomoProdUrl,
                },
                'ena.ruimtevlaanderen.be': {
                    id: 33,
                    url: this._matomoProdUrl,
                },
                'erkenningencontactgegevens.omgeving.vlaanderen.be': {
                    id: 44,
                    url: this._matomoProdUrl,
                },
                'loket-erkenningen-leefmilieu.omgeving.vlaanderen.be': {
                    id: 52,
                    url: this._matomoProdUrl,
                },
                'bed.omgeving.vlaanderen.be': {
                    id: 55,
                    url: this._matomoProdUrl,
                },
                'controleviewer.omgeving.vlaanderen.be': {
                    id: 58,
                    url: this._matomoProdUrl,
                },
                'omgevingsloketinzage.omgeving.vlaanderen.be': {
                    id: 62,
                    url: this._matomoProdUrl,
                },
                'informatie.omgeving.vlaanderen.be': {
                    id: 64,
                    url: this._matomoProdUrl,
                },
            }[window.location.host];
        }

        if (!match) {
            console.warn(
                'de website is nog niet gekend bij ons dus er zullen geen gebruikersstatistieken bijgehouden worden'
            );
        }
        return match;
    }

    /**
     * matomo config manueel instellen ipv te rekenen op the interne config
     * @param matomoId
     * @param matomoUrl
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
        return this.getUrlIdMatch();
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
