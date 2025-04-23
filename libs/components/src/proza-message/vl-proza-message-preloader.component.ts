import { BaseElementOfType, webComponent } from '@domg-wc/common';
import { ProzaRestClient } from './vl-proza-rest-client.util';

@webComponent('vl-proza-message-preloader')
export class VlProzaMessagePreloader extends BaseElementOfType(HTMLElement) {
    static get _observedAttributes() {
        return ['domain'];
    }

    constructor() {
        super();
        this.preload();
    }

    _domainChangedCallback() {
        this.preload();
    }

    get _domain() {
        return this.getAttribute('domain');
    }

    get _baseUrl() {
        return this.getAttribute('base-url');
    }

    preload() {
        if (this._domain) {
            VlProzaMessagePreloader.preload(this._domain, this._baseUrl);
        }
    }

    /**
     * @deprecated Gebruik het publieke `preload()`.
     */
    _preload() {
        return this.preload();
    }

    static preload(domain: string, baseUrl?: string) {
        if (!VlProzaMessagePreloader.isPreloaded(domain)) {
            VlProzaMessagePreloader.__setPreloadedMessagesCacheForDomain(
                domain,
                ProzaRestClient.getMessages(domain, baseUrl)
            );
        }
    }

    /**
     * @deprecated Gebruik het publieke `static preload()`.
     */
    static _preload(domain: string, baseUrl?: string) {
        return VlProzaMessagePreloader.preload(domain, baseUrl);
    }

    /**
     * Geeft een Proza bericht terug.
     *
     * @param {String} domain - Het Proza domein waarin het Proza bericht zit.
     * @param {String} code - De code die het Proza bericht identificeert.
     * @return {Promise<string>} Resolved naar het Proza bericht indien teruggevonden en anders wordt de Promise rejected.
     */
    static getMessage(domain: string, code: string) {
        return VlProzaMessagePreloader._getMessages(domain).then((messages: any) => {
            const message = messages[code];
            if (message) {
                return message;
            } else {
                throw Error(`Bericht voor {domein: ${domain}, code: ${code}} niet gevonden`);
            }
        });
    }

    /**
     * Geeft de Proza codes terug op basis van een prefix.
     *
     * @param {String} domain - Het Proza domein waarin het Proza bericht zit.
     * @param {String} prefix - De prefix van de code die het Proza bericht
     * @param {String} [baseUrl] - De baseUrl waarvan de Proza berichten gefetched worden.
     * identificeert.
     * @return {Promise<[string]>} Resolved naar de Proza codes met de
     * opgegeven prefix
     */
    static async getProzaCodes(domain: string, prefix: string, baseUrl?: string) {
        VlProzaMessagePreloader.preload(domain, baseUrl);
        const messages = await VlProzaMessagePreloader._getMessages(domain);
        return Object.keys(messages).filter((code) => code.startsWith(prefix));
    }

    /**
     * Geeft terug of het Proza domein al reeds preloaded werd.
     *
     * @param {String} domain - Het Proza domein.
     * @return {boolean}
     */
    static isPreloaded(domain: string) {
        return !!VlProzaMessagePreloader.__getPreloadedMessagesCacheForDomain(domain);
    }

    static _getMessages(domain: string) {
        if (VlProzaMessagePreloader.isPreloaded(domain)) {
            return VlProzaMessagePreloader.__getPreloadedMessagesCacheForDomain(domain);
        } else {
            return Promise.reject(new Error(`Berichten voor domein ${domain} zijn niet preloaded`));
        }
    }

    static get __domainCache() {
        if (!VlProzaMessagePreloader.__cache) {
            VlProzaMessagePreloader.__cache = {};
        }
        return VlProzaMessagePreloader.__cache;
    }

    static __getCacheForDomain(domain: string) {
        const cache = VlProzaMessagePreloader.__domainCache;
        if (!cache[domain]) {
            cache[domain] = {};
        }
        return cache[domain];
    }

    static __getPreloadedMessagesCacheForDomain(domain: string) {
        return VlProzaMessagePreloader.__getCacheForDomain(domain).messages;
    }

    static __setPreloadedMessagesCacheForDomain(domain: string, messages: any) {
        VlProzaMessagePreloader.__getCacheForDomain(domain).messages = messages;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-proza-message-preloader': VlProzaMessagePreloader;
    }
}
