import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components';
import { VlTypography } from '../typography/vl-typography.component';
import { VlProzaMessagePreloader } from './vl-proza-message-preloader.component';
import elementStyles from './vl-proza-message.uig-css';
import { ProzaRestClient } from './vl-proza-rest-client.util';

@webComponent('vl-proza-message')
export class VlProzaMessage extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([VlButtonComponent, VlTypography]);
    }

    static get _observedAttributes() {
        return ['domain', 'code', 'block', 'parameters'];
    }

    constructor() {
        super();
        this.shadow(`
          <style>
            ${elementStyles.join('')}
          </style>
          <div>
            <vl-typography></vl-typography>
          </div>
        `);
    }

    async connectedCallback() {
        super.connectedCallback();

        if (await this.__updatenIsToegelaten()) {
            this.__setupUpdatableMessage();
        }
    }

    get _typographyElement() {
        return this.shadowRoot.querySelector('vl-typography');
    }

    get _actionsElement() {
        return this.shadowRoot.querySelector('#actions');
    }

    get _editButton() {
        return this.shadowRoot.querySelector('#edit-button');
    }

    get _refreshButton() {
        return this.shadowRoot.querySelector('#refresh-button');
    }

    _domainChangedCallback() {
        this._loadMessage();
    }

    _codeChangedCallback() {
        this._loadMessage();
    }

    _blockChangedCallback() {
        const blockClass = 'vl-proza-message__block';
        if (this.hasAttribute('data-vl-block')) {
            this.classList.add(blockClass);
        } else {
            this.classList.remove(blockClass);
        }
    }

    _parametersChangedCallback() {
        if (this._typographyElement && this._parameters) {
            this._typographyElement.dataset.vlParameters = this._parameters;
        }
    }

    get _domain() {
        return this.dataset.vlDomain;
    }

    get _code() {
        return this.dataset.vlCode;
    }

    get _parameters() {
        return this.dataset.vlParameters;
    }

    get _baseUrl() {
        return this.dataset.vlBaseUrl;
    }

    _loadMessage() {
        if (!!this._domain && !!this._code) {
            VlProzaMessage.getMessage(this._domain, this._code, null, this._baseUrl).then((message: string) => {
                this._typographyElement.innerHTML = message;
                if (this.__containsBlockElement()) {
                    this.toggleAttribute('data-vl-block', true);
                } else {
                    this.toggleAttribute('data-vl-block', false);
                }
            });
        } else {
            this._typographyElement.innerHTML = null;
        }
    }

    _reloadMessage() {
        VlProzaMessage.__getSingleMessage(this._domain, this._code, { forceUpdate: true }, this._baseUrl);
        this._loadMessage();
    }

    /**
     * Geeft een Proza bericht terug.
     *
     * @param {string} domain Het Proza domein waarin het Proza bericht zit.
     * @param {string} code De code die het Proza bericht identificeert.
     * @param {object} [parameters] Eventuele parameters die gebruikt kunnen worden om placeholders in het Proza bericht te vervangen.
     * @param {object} [baseUrl] Optionele baseUrl waarvan het Proza bericht gefetched wordt.
     * @return {Promise<string>} Resolved naar het Proza bericht indien teruggevonden en anders wordt de Promise rejected.
     */
    static async getMessage(domain: string, code: string, parameters: any, baseUrl?: string) {
        const message = await VlProzaMessage.__getRawMessage(domain, code, baseUrl);

        if (parameters) {
            return VlTypography.replaceTemplateParameters(message, parameters);
        }
        return message;
    }

    static async __getRawMessage(domain: string, code: string, baseUrl?: string) {
        const messageCache = VlProzaMessage.__getMessageCacheForDomain(domain);

        if (messageCache[code]) {
            return messageCache[code];
        }
        try {
            return await VlProzaMessage.__getMessageFromPreloaderCache(domain, code);
        } catch (error) {
            console.info(error);
            return VlProzaMessage.__getSingleMessage(domain, code, undefined, baseUrl);
        }
    }

    static __getMessageFromPreloaderCache(domain: string, code: string) {
        return VlProzaMessagePreloader.getMessage(domain, code).catch((error: any) => {
            if (VlProzaMessagePreloader.isPreloaded(domain)) {
                console.warn(
                    `Bericht voor {domein: ${domain}, code: ${code}} kon niet opgevraagd worden uit de preload cache`,
                    error
                );
            }
            throw error;
        });
    }

    static __getSingleMessage(domain: string, code: string, options = { forceUpdate: false }, baseUrl?: string) {
        const messageCache = VlProzaMessage.__getMessageCacheForDomain(domain);
        if (!messageCache[code] || (options && options.forceUpdate)) {
            VlProzaMessage._putMessageInCache(domain, code, options, baseUrl);
        }
        return messageCache[code];
    }

    static _putMessageInCache(domain: string, code: string, options: any, baseUrl?: string) {
        VlProzaMessage.__getMessageCacheForDomain(domain)[code] = ProzaRestClient.getMessage(
            domain,
            code,
            options,
            baseUrl
        );
    }

    static _getToegelatenOperaties(domain: string, baseUrl?: string) {
        let toegelatenOperatiesCache = VlProzaMessage.__getToegelatenOperatiesCacheForDomain(domain);
        if (!toegelatenOperatiesCache) {
            toegelatenOperatiesCache = ProzaRestClient.getToegelatenOperaties(domain, baseUrl);
            VlProzaMessage.__setToegelatenOperatiesCacheForDomain(domain, toegelatenOperatiesCache);
        }
        return toegelatenOperatiesCache;
    }

    static get __domainCache() {
        if (!VlProzaMessage.__cache) {
            VlProzaMessage.__cache = {};
        }
        return VlProzaMessage.__cache;
    }

    static __getCacheForDomain(domain: string) {
        const cache = VlProzaMessage.__domainCache;
        if (!cache[domain]) {
            cache[domain] = {};
        }
        return cache[domain];
    }

    static __getToegelatenOperatiesCacheForDomain(domain: string) {
        return VlProzaMessage.__getCacheForDomain(domain).toegelatenOperaties;
    }

    static __setToegelatenOperatiesCacheForDomain(domain: string, toegelatenOperaties: any) {
        VlProzaMessage.__getCacheForDomain(domain).toegelatenOperaties = toegelatenOperaties;
    }

    static __getMessageCacheForDomain(domain: string) {
        const cache = VlProzaMessage.__getCacheForDomain(domain);
        if (!cache.messages) {
            cache.messages = {};
        }
        return cache.messages;
    }

    __containsBlockElement() {
        return [...this._typographyElement.children].some((element) =>
            ['block', 'inline-block', 'flex', 'grid', 'table'].includes(window.getComputedStyle(element).display)
        );
    }

    async __updatenIsToegelaten() {
        return (await VlProzaMessage._getToegelatenOperaties(this._domain, this._baseUrl)).update;
    }

    __setupUpdatableMessage() {
        this._element.classList.add('vl-proza-message--updatable');
        if (!this._actionsElement) {
            this._element.appendChild(this.__actionsElementTemplate());
        }
    }

    __actionsElementTemplate() {
        const template = this._template(`
        <div id="actions"></div>
    `);
        template.firstElementChild.appendChild(this.__editButtonTemplate());
        template.firstElementChild.appendChild(this.__refreshButtonTemplate());
        return template;
    }

    __editButtonTemplate() {
        const button = this._template(`
        <vl-button id="edit-button" icon="pencil" label="edit"></vl-button>
    `);
        button.firstElementChild.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            window.open(`/proza/domeinen/${this._domain}/codes/${this._code}`, '_blank');
        });
        return button;
    }

    __refreshButtonTemplate() {
        const button = this._template(`
        <vl-button id="refresh-button" icon="text-redo" label="refresh"></vl-button>
    `);
        button.firstElementChild.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            this._reloadMessage();
        });
        return button;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-proza-message': VlProzaMessage;
    }
}
