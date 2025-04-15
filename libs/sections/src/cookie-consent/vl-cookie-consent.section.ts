import { BaseElementOfType, registerWebComponents, webComponentConditional } from '@domg-wc/common-utilities';
import { vlGridStyles } from '@domg-wc/common-utilities/css';
import { VlButtonComponent, VlModalComponent } from '@domg-wc/components';
import { vlElementsStyle } from '@domg-wc/elements';
import { analytics } from './util/analytics.util';
import './vl-cookie-consent-opt-in.section';

@webComponentConditional('vl-modal', 'vl-cookie-consent')
export class VlCookieConsent extends BaseElementOfType(HTMLElement) {
    private initialized = false;

    static {
        registerWebComponents([VlButtonComponent, VlModalComponent]);
    }

    static get _observedAttributes() {
        return ['owner', 'link', 'matomo-id', 'matomo-url', 'analytics'];
    }

    connectedCallback() {
        super.connectedCallback();

        // we willen wachten tot cookie-consent element is gerenderd om te zien of matomo uitdrukkelijk is geconfigureerd,
        // voor we het matomo script opbouwen
        if (!this.initialized) {
            this.initialized = true;
            const matomoId = this.getAttribute('matomo-id');
            const matomoUrl = this.getAttribute('matomo-url');
            if (matomoId && matomoUrl) {
                analytics.setMatomoConfig(matomoId, matomoUrl);
            }
            this.__addAnalyticsIfOptedIn();
        }

        this._modalElement?.on('close', this._dispatchCloseEvent);
    }

    disconnectedCallback() {
        this._modalElement?.off('close', this._dispatchCloseEvent);
    }

    constructor() {
        super(`
          <style>
            ${vlElementsStyle.join('')}
            ${vlGridStyles}
          </style>

          <vl-modal data-vl-title="Cookie-toestemming" data-vl-not-cancellable>
            <div class="vl-grid" slot="content">
              <div class="vl-column vl-column--12">
                <span data-vl-owner>Departement Omgeving</span> maakt op de websites waarvoor zij verantwoordelijk is gebruik van "cookies" en vergelijkbare internettechnieken. Cookies zijn kleine "tekstbestanden" die worden gebruikt om onze websites en apps beter te laten werken en jouw surfervaring te verbeteren. Zij kunnen worden opgeslagen in de context van de webbrowser(s) die je gebruikt bij het bezoeken van onze website(s).
              </div>
              <div class="vl-column vl-column--12">
                Er zijn verschillende soorten cookies, en deze hebben ook een verschillende doelstelling en geldigheidsduur. Een beperkt aantal cookies (essenti&#235;le cookies) zijn absoluut noodzakelijk, deze zijn altijd anoniem. Andere cookies dragen bij aan het gebruikscomfort, je hebt de keuze om deze al dan niet te aanvaarden.</div>
              <div class="vl-column vl-column--12">
                Op <a id="link" href="https://www.omgevingvlaanderen.be/privacy" target="_blank">https://www.omgevingvlaanderen.be/privacy</a> vind je meer informatie over de manier waarop <span data-vl-owner>Departement Omgeving</span> omgaat met uw privacy:
                <ul>
                  <li>ons privacybeleid, vertaald in de Privacyverklaring</li>
                  <li>algemene informatie over de nieuwe Privacywet</li>
                  <li>de contactgegevens van de functionaris voor gegevensbescherming of DPO</li>
                </ul>
              </div>
              <div class="vl-column vl-column--12">
                De cookie-toestemming die je geeft is van toepassing op meerdere websites, subsites en apps van <span data-vl-owner>Departement Omgeving</span>. Welke dit zijn, vind je via de Privacyverklaring. Je kunt naderhand een eerdere toestemming intrekken of wijzigen.
              </div>
            </div>
          </vl-modal>
        `);

        this.allowCustomCSS = false;
        this._optIns = {};
        this._cookieConsentCookieName = 'cookie-consent';
        this._cookieConsentDateCookieName = 'cookie-consent-date';
        this._cookieConsentResetDate = new Date('2019/05/14');

        if (!this._isFunctionalOptInDisabled) {
            this._addFunctionalOptIn();
        }
        this._processOptIns();
        this._element.appendChild(this._getButtonTemplate());
        if (!this._isAutoOpenDisabled) {
            (this as any)._open();
        }
    }

    /**
     * Opent de cookie-consent ook al werd deze eerder getoond aan de gebruiker.
     * @return {void}
     */
    open() {
        this._open(true);
    }

    /**
     * Sluit de cookie-consent.
     * @return {void}
     */
    close() {
        this._modalElement.close();
        this._setCookie(this._cookieConsentCookieName, true);
        this._setCookie(this._cookieConsentDateCookieName, new Date().getTime());
        this._submitOptIns();
    }

    /**
     * Verwijdert al de cookies en herstelt de opt-in waarden naar de initiële toestand.
     * @return {void}
     */
    reset() {
        this._deleteCookie(this._cookieConsentCookieName);
        this._deleteCookie(this._cookieConsentDateCookieName);
        Object.values(this._optIns).forEach((optIn) => {
            this._deleteCookie((optIn as any).name);
            this._resetOptInValue(optIn);
            if ((optIn as any).callback && (optIn as any).callback.deactivated) {
                (optIn as any).callback.deactivated();
            }
        });
    }

    /**
     * Voeg een opt-in toe.
     * @param {object} optIn - De opt-in optie met attributen.
     * @param {string} optIn.name - De naam van de opt-in optie.
     * @param {string} optIn.label - Het label van de opt-in optie die getoond zal worden aan de gebruiker.
     * @param {string} optIn.description - De beschrijving van de opt-in optie die getoond zal worden aan de gebruiker.
     * @param {boolean} optIn.value - De standaard opt-in optie waarde die bepaalt of de opt-in standaard geactiveerd wordt.
     * @param {boolean} optIn.mandatory - Indien de opt-in verplicht is, zal de opt-in standaard geactiveerd worden en kan deze niet gewijzigd worden door de gebruiker.
     * @param {function} optIn.callback - De callback functies.
     * @param {function} optIn.callback.activated - Functie die aangeroepen wordt wanneer de gebruiker de cookie-consent bevestigt en de opt-in geactiveerd werd.
     * @param {function} optIn.callback.deactivated - Functie die aangeroepen wordt wanneer de gebruiker de cookie-consent bevestigt en de opt-in gedactiveerd werd.
     * @return {void}
     */
    addOptIn(optIn: any) {
        this._processOptIn(optIn);
    }

    /**
     * Voegt aan een opt-in een callback toe die aangeroepen wordt wanneer de opt-in geactiveerd wordt.
     * @param {string} name - De opt-in optie naam.
     * @param {function} callback - Callback functie.
     */
    addOptInActivatedCallback(name: string, callback: any) {
        if (this._optIns[name]) {
            this._optIns[name].callback.activated = callback;
        }
    }

    /**
     * Voegt aan een opt-in een callback toe die aangeroepen wordt wanneer de opt-in gedeactiveerd wordt.
     * @param {string} name - De opt-in optie naam.
     * @param {function} callback - Callback functie.
     */
    addOptInDeactivatedCallback(name: string, callback: any) {
        if (this._optIns[name]) {
            this._optIns[name].callback.deactivated = callback;
        }
    }

    /**
     * Bepaalt of een opt-in actief is of niet op basis van de naam.
     * @param {string} name - De opt-in optie naam.
     * @return {boolean}
     */
    isOptInActive(name: string) {
        return this._optIns[name] ? this._optIns[name].value : false;
    }

    /**
     * Geeft terug of de cookie-consent modal geopend is.
     * @return {boolean}
     */
    isOpen() {
        return this._modalElement?.isOpen();
    }

    get _isAutoOpenDisabled() {
        return this.getAttribute(VlCookieConsent.attributePrefix + 'auto-open-disabled') != undefined;
    }

    get _isFunctionalOptInDisabled() {
        return this.getAttribute(VlCookieConsent.attributePrefix + 'auto-opt-in-functional-disabled') != undefined;
    }

    get _cookiePrefix() {
        return 'vl-cookie-consent-';
    }

    get _modalElement() {
        return this._element;
    }

    get _formGridElement() {
        return this._element.querySelector('.vl-grid');
    }

    get _optInElementen() {
        return this.querySelectorAll('vl-cookie-consent-opt-in');
    }

    get _ownerElements() {
        return this._shadow.querySelectorAll('[data-vl-owner]');
    }

    get _linkElement() {
        return this._shadow.querySelector('#link');
    }

    _getButtonTemplate() {
        const filteredOptIns = Object.values(this._optIns).filter((optIn: any) => optIn.name !== 'functional');
        const text = filteredOptIns.length > 0 ? 'Bewaar keuze' : 'Ik begrijp het';
        const template = this._template(`
      <vl-button slot="button">${text}</vl-button>
    `);
        template.querySelector('vl-button').addEventListener('click', () => {
            this.close();
        });
        return template;
    }

    _getOptInTemplate(optIn: any) {
        if (optIn) {
            const checked = optIn.value || optIn.mandatory ? `${VlCookieConsent.attributePrefix}checked` : '';
            const mandatory = optIn.mandatory ? `${VlCookieConsent.attributePrefix}mandatory` : '';
            const template = this._template(`
        <div class="vl-column vl-column--12">
          <vl-cookie-consent-opt-in ${VlCookieConsent.attributePrefix}label="${optIn.label}" ${VlCookieConsent.attributePrefix}description="${optIn.description}" ${checked} ${mandatory}></vl-cookie-consent-opt-in>
        </div>
      `);
            template.querySelector('vl-cookie-consent-opt-in').addEventListener('input', (event: any) => {
                const checked = event && event.currentTarget ? event.currentTarget.checked : false;
                optIn.value = checked;
            });
            return template;
        }
    }

    _open(forced: boolean) {
        if (
            forced ||
            !this._getCookieConsentCookie() ||
            !this._heeftCookieConsentDateCookie() ||
            !this._isCookieConsentCookieGeldig()
        ) {
            this._modalElement.open();
        }
    }

    _resetOptInValue(optIn: any) {
        const match = [...this._optInElementen].find((optIn) => {
            return (optIn.id = optIn.name);
        });
        if (match) {
            optIn.value = optIn.getAttribute(VlCookieConsent.attributePrefix + 'checked') != undefined;
        }
    }

    _processOptIns() {
        this._optInElementen.forEach((optIn: any) => {
            this._processOptIn({
                name: optIn.id,
                label: optIn.getAttribute(VlCookieConsent.attributePrefix + 'label'),
                description: optIn.getAttribute(VlCookieConsent.attributePrefix + 'description'),
                value: optIn.getAttribute(VlCookieConsent.attributePrefix + 'checked') != undefined,
                mandatory: optIn.getAttribute(VlCookieConsent.attributePrefix + 'mandatory') != undefined,
            });
        });
    }

    _processOptIn({
        name,
        label,
        description,
        value,
        mandatory,
        callback: { activated = null, deactivated = null } = {},
    }: any) {
        if (!this._bevatOptIn(name)) {
            const storedValue = this._getCookie(name);
            const optIn = (this._optIns[name] = {
                name: name,
                label: label,
                description: description,
                value: storedValue !== undefined ? storedValue : value,
                callback: {
                    activated: activated,
                    deactivated: deactivated,
                },
                mandatory: !!mandatory,
            });
            const optInTemplate = this._getOptInTemplate(optIn);
            if (optInTemplate) {
                this._formGridElement.appendChild(optInTemplate);
            }
        }
    }

    _submitOptIns() {
        Object.values(this._optIns).forEach((optIn: any) => {
            if (optIn.callback) {
                if (optIn.value || optIn.mandatory) {
                    if (optIn.callback.activated) {
                        optIn.callback.activated();
                    }
                } else {
                    if (optIn.callback.deactivated) {
                        optIn.callback.deactivated();
                    }
                }
            }
            this._setCookie(optIn.name, optIn.value || optIn.mandatory || false);
        });
    }

    _bevatOptIn(name: string) {
        return !!this._optIns[name];
    }

    _addFunctionalOptIn() {
        this._processOptIn({
            name: 'functional',
            label: 'Noodzakelijke cookies toestaan (verplicht)',
            description:
                'Noodzakelijke cookies helpen een website bruikbaarder te maken, door basisfuncties als paginanavigatie en toegang tot beveiligde gedeelten van de website mogelijk te maken. Zonder deze cookies kan de website niet naar behoren werken.',
            value: true,
            mandatory: true,
        });
    }

    _addAnalytics() {
        if (!document.getElementById(analytics.scriptId)) {
            document.head.appendChild(analytics.script);
        }
    }

    _getCookie(name: string) {
        name = this._cookiePrefix + name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                try {
                    return JSON.parse(cookie.substring(name.length, cookie.length));
                    // eslint-disable-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    return cookie.substring(name.length, cookie.length);
                }
            }
        }
    }

    _getCookieConsentCookie() {
        return this._getCookie(this._cookieConsentCookieName);
    }

    _getCookieConsentDateCookie() {
        return this._getCookie(this._cookieConsentDateCookieName);
    }

    _setCookie(name: string, value: any) {
        document.cookie = this._cookiePrefix + name + '=' + value + ';Max-Age=2147483647;path=/;SameSite=Strict;';
    }

    _deleteCookie(name: string) {
        document.cookie = this._cookiePrefix + name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    }

    _heeftCookieConsentDateCookie() {
        return this._getCookieConsentDateCookie() != undefined;
    }

    _isCookieConsentCookieGeldig() {
        return (
            !isNaN(this._getCookieConsentDateCookie()) &&
            new Date(this._getCookieConsentDateCookie()) > this._cookieConsentResetDate
        );
    }

    _analyticsChangedCallback(oldValue: any, newValue: any) {
        if (newValue != undefined && this.initialized) {
            this.__addAnalyticsIfOptedIn();
        }
    }

    __addAnalyticsIfOptedIn(): void {
        if (!this._isFunctionalOptInDisabled) {
            this._addAnalytics();
        } else {
            console.error(
                'analytics kunnen alleen toegevoegd worden wanneer de functionele cookies opt-in geactiveerd werd!'
            );
        }
    }

    _ownerChangedCallback(oldValue: any, newValue: any) {
        this._ownerElements.forEach((element: any) => (element.innerText = newValue));
    }

    _linkChangedCallback(oldValue: string, newValue: string) {
        this._linkElement.innerText = newValue;
        this._linkElement.href = newValue;
    }

    // Deze methode bewust apart gedefiniëerd als een arrow-functie
    // zodat dezelfde referentie meegegeven kan worden bij het verwijderen van de event listener.
    _dispatchCloseEvent = () => {
        this.dispatchEvent(new CustomEvent('vl-close'));
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-cookie-consent': VlCookieConsent;
    }
}
