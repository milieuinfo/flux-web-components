import { render } from 'lit-html';
import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlContactCardComponent, VlInfoblockComponent, VlTypography } from '@domg-wc/components';
import {
    VlColumnElement,
    VlGridElement,
    VlH1Element,
    VlH2Element,
    VlIntroductionElement,
    VlLayoutElement,
    VlLinkElement,
    VlPropertiesComponent,
    VlPropertiesListElement,
    VlPropertyTermElement,
    VlPropertyValueElement,
    VlRegionElement,
    VlSideNavigation,
    VlSideNavigationContentElement,
    VlSideNavigationGroupElement,
    VlSideNavigationH2,
    VlSideNavigationItemElement,
    VlSideNavigationReferenceElement,
    VlSideNavigationToggleElement,
} from '@domg-wc/elements';
import { cookieStatementHeaderElements, header } from './child/header.section';
import './cookie/vl-authentication-cookie.section';
import './cookie/vl-cookie.section';
import './cookie/vl-header-authentication-cookie.section';
import './cookie/vl-header-cookie.section';
import './cookie/vl-jsessionid-cookie.section';
import './cookie/vl-sticky-session-cookie.section';
import styles from './vl-cookie-statement.uig-css';

@webComponent('vl-cookie-statement')
export class VlCookieStatement extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([
            // elements
            VlColumnElement,
            VlGridElement,
            VlH1Element,
            VlH2Element,
            VlIntroductionElement,
            VlLayoutElement,
            VlLinkElement,
            VlPropertiesComponent,
            VlPropertiesListElement,
            VlPropertyTermElement,
            VlPropertyValueElement,
            VlRegionElement,
            VlSideNavigation,
            VlSideNavigationContentElement,
            VlSideNavigationGroupElement,
            VlSideNavigationH2,
            VlSideNavigationItemElement,
            VlSideNavigationReferenceElement,
            VlSideNavigationToggleElement,
            // components
            VlContactCardComponent,
            VlInfoblockComponent,
            VlTypography,

            // child components
            ...cookieStatementHeaderElements(),
        ]);
    }

    static get _observedAttributes() {
        return ['date', 'disable-back-link', 'hide-back-link', 'version'];
    }

    constructor() {
        super(`
            <style>
                ${styles}
            </style>
             <slot name="header"></slot>
            `);

        const headerSlot = this.shadowRoot.querySelector('slot[name="header"]');

        if (headerSlot) {
            render(header(), headerSlot);
        }

        this.allowCustomCSS = false;
        this._element.insertAdjacentHTML(
            'afterend',
            `
        <section is="vl-region">
            <div is="vl-layout">
                <div is="vl-grid" data-vl-is-stacked>
                    <div is="vl-column" data-vl-size="10">
                        <h1 is="vl-h1" data-vl-no-space-bottom>Cookieverklaring</h1>
                    </div>
                    <div is="vl-column" data-vl-size="10">
                        <p is="vl-introduction">
                            <span>Versie</span> <span id="introduction-version">1.0.0</span> - <span id="introduction-date">3 maart 2021</span>
                        </p>
                    </div>

                    <div is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                        <vl-typography>
                            <hr/>
                        </vl-typography>
                    </div>
                </div>
            </div>
        </section>

        <section is="vl-region">
            <div is="vl-layout">
                <div is="vl-grid" data-vl-is-stacked>
                    <div is="vl-column" data-vl-size="8" data-vl-medium-size="8" data-vl-small-size="8" data-vl-extra-small-size="12">
                        <div is="vl-side-navigation-reference" data-vl--scrollspy-content>
                            <div is="vl-grid" data-vl-is-stacked-large>
                                <div id="cookie-policy" is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                                    <h2 is="vl-h2">Cookiebeleid</h2>
                                    <p>Departement Omgeving (verder ‘dOMG’) vindt het belangrijk dat u op iedere plaats en elk ogenblik haar dOMG-inhoud kan bekijken, beluisteren, lezen of beleven via diverse mediaplatformen. dOMG wil ook werken aan interactieve diensten en diensten op uw maat. Op dOMG-onlinediensten worden technieken gehanteerd om dit mogelijk te maken, bijvoorbeeld met behulp van cookies en scripts. Deze technieken worden hierna gemakkelijkheidshalve cookies genoemd. In dit cookiebeleid wenst dOMG u te informeren welke cookies worden gebruikt en waarom dit gebeurt. Verder wordt toegelicht in welke mate u als gebruiker het gebruik kan controleren. dOMG wil namelijk graag uw privacy en de gebruiksvriendelijkheid van haar onlinediensten zoveel mogelijk waarborgen.</p>
                                    <br/>
                                    <p>Dit cookiebeleid is van toepassing op alle 'dOMG-onlinediensten', met name alle websites, (mobiele) applicaties en internetdiensten die dOMG aanbiedt en die toegang geven tot dOMG-inhoud.</p>
                                    <br/>
                                    <p>dOMG kan het cookiebeleid op elk moment veranderen. Dat kan bijvoorbeeld gebeuren in het kader van veranderingen aan haar diensten of de geldende wetgeving. Het gewijzigde beleid wordt dan bekendgemaakt op de relevante onlinediensten en geldt vanaf het moment dat deze bekendgemaakt wordt.</p>
                                </div>

                                <div id="cookie-definition" is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                                    <h2 is="vl-h2">Wat zijn cookies precies?</h2>
                                    <p>Cookies zijn kleine gegevens- of tekstbestanden die op uw computer of mobiele apparaat worden geïnstalleerd wanneer u een website bezoekt of een (mobiele) toepassing gebruikt. Het cookiebestand bevat een unieke code waarmee uw browser herkend kan worden tijdens het bezoek aan de online service of tijdens opeenvolgende, herhaalde bezoeken. Cookies kunnen worden geplaatst door de server van de website of applicatie die u bezoekt, maar ook door servers van derden die al dan niet met deze website of applicatie samenwerken.</p>
                                    <br/>
                                    <p>Cookies maken over het algemeen de interactie tussen de bezoeker en de website of applicatie gemakkelijker en sneller en helpen de bezoeker om te navigeren tussen de verschillende delen van een website of applicatie.</p>
                                </div>

                                <div id="cookie-management" is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                                    <h2 is="vl-h2">Hoe kan ik het gebruik van cookies op deze onlinediensten weigeren of beheren?</h2>
                                    <vl-typography>
                                        <p>U kunt de installatie van cookies weigeren via uw browserinstellingen. U kunt op elk gewenst moment ook de reeds geïnstalleerde cookies van uw computer of mobiele apparaat verwijderen. Instructies vindt u op de website van uw browser:</p>
                                        <ul>
                                            <li><a is="vl-link" href="https://support.microsoft.com/nl-be/help/17479/windows-internet-explorer-11-change-security-privacy-settings" target="_blank">Microsoft Internet Explorer<span is="vl-icon" data-vl-icon="external" data-vl-after></span></a></li>
                                            <li><a is="vl-link" href="https://support.microsoft.com/nl-nl/help/4468242/microsoft-edge-browsing-data-and-privacy-microsoft-privacy" target="_blank">Microsoft Edge<span is="vl-icon" data-vl-icon="external" data-vl-after></span></a></li>
                                            <li><a is="vl-link" href="http://support.google.com/chrome/bin/answer.py?hl=nl&amp;answer=95647" target="_blank">Google Chrome<span is="vl-icon" data-vl-icon="external" data-vl-after></span></a></li>
                                            <li><a is="vl-link" href="http://support.mozilla.org/nl/kb/cookies-in-en-uitschakelen-websites-voorkeuren?redirectlocale=nl&amp;redirectslug=Cookies+in-+en+uitschakelen" target="_blank">Mozilla Firefox<span is="vl-icon" data-vl-icon="external" data-vl-after></span></a></li>
                                            <li><a is="vl-link" href="http://support.apple.com/kb/PH5042" target="_blank">Apple Safari<span is="vl-icon" data-vl-icon="external" data-vl-after></span></a></li>
                                        </ul>
                                        <p>Wanneer u cookies uitschakelt, moet u er rekening mee houden dat bepaalde grafische elementen er niet mooi kunnen uitzien, of dat u bepaalde toepassingen niet kunt gebruiken. Hieronder vindt u een gedetailleerde lijst van alle cookies die in deze website of toepassing worden gebruikt.</p>
                                    </vl-typography>
                                </div>

                                <div id="cookie-usage" is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                                    <h2 is="vl-h2">Gebruikte cookies</h2>
                                    <vl-header-cookie></vl-header-cookie>
                                    <vl-header-authentication-cookie></vl-header-authentication-cookie>
                                    <vl-authentication-cookie></vl-authentication-cookie>
                                    <vl-jsessionid-cookie></vl-jsessionid-cookie>
                                    <vl-sticky-session-cookie></vl-sticky-session-cookie>
                                    <slot></slot>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div is="vl-column" data-vl-size="4" data-vl-medium-size="4" data-vl-small-size="4" data-vl-extra-small-size="0">
                        <nav is="vl-side-navigation" aria-label="inhoudsopgave">
                            <h2 is="vl-side-navigation-h2">Op deze pagina</h2>
                            <div is="vl-side-navigation-content">
                                <ul is="vl-side-navigation-group">
                                    <li is="vl-side-navigation-item" data-vl-parent>
                                        <a is="vl-side-navigation-toggle" href="#cookie-policy">
                                            Cookiebeleid
                                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                                        </a>
                                    </li>
                                    <li is="vl-side-navigation-item" data-vl-parent>
                                        <a is="vl-side-navigation-toggle" href="#cookie-definition">
                                            Wat zijn cookies precies
                                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                                        </a>
                                    </li>
                                    <li is="vl-side-navigation-item" data-vl-parent>
                                        <a is="vl-side-navigation-toggle" href="#cookie-management">
                                            Hoe kan ik het gebruik van cookies op deze onlinediensten weigeren of beheren?
                                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                                        </a>
                                    </li>
                                    <li is="vl-side-navigation-item" data-vl-parent>
                                        <a is="vl-side-navigation-toggle" href="#cookie-usage">
                                            Gebruikte cookies
                                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>

        <section is="vl-region" data-vl-overlap>
            <div is="vl-layout">
                <div is="vl-grid" data-vl-is-stacked>
                    <div is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                    <vl-contact-card>
                        <vl-infoblock slot="info" data-vl-type="contact">
                            <h3 slot="title">Departement Omgeving</h3>
                        </vl-infoblock>
                        <vl-properties slot="properties">
                            <dl is="vl-properties-list">
                                <dt is="vl-property-term">Adres</dt>
                                <dd is="vl-property-value">Herman Teirlinckgebouw<br/>Havenlaan 88<br/>1000 Brussel, België</dd>
                                <dt is="vl-property-term">Telefoon</dt>
                                <dd is="vl-property-value"><a is="vl-link" href="tel:02 553 80 11">02 553 80 11<span is="vl-icon" data-vl-icon="phone" data-vl-after></span></a></dd>
                                <dt is="vl-property-term">E-mail</dt>
                                <dd is="vl-property-value"><a is="vl-link" href="mailto:omgeving@vlaanderen.be">omgeving@vlaanderen.be<span is="vl-icon" data-vl-icon="mail" data-vl-after></span></a></dd>
                                <dt is="vl-property-term">Website</dt>
                                <dd is="vl-property-value"><a is="vl-link" href="https://omgeving.vlaanderen.be" target="_blank">https://omgeving.vlaanderen.be<span is="vl-icon" data-vl-icon="external" data-vl-after></span></a></dd>
                            </dl>
                        </vl-properties>
                    </vl-contact-card>
                    </div>
                </div>
            </div>
        </section>
    `
        );
    }

    _versionChangedCallback(oldValue: string, newValue: string) {
        const versionElement = this._shadow.getElementById('introduction-version');

        versionElement.innerText = newValue;
    }

    _dateChangedCallback(oldValue: string, newValue: string) {
        const dateElement = this._shadow.getElementById('introduction-date');

        dateElement.innerText = newValue;
    }

    _disableBackLinkChangedCallback() {
        const functionalHeader = this._shadow.querySelector('vl-functional-header');

        if (this.hasAttribute('disable-back-link')) {
            functionalHeader.setAttribute('data-vl-disable-back-link', '');
        } else {
            functionalHeader.removeAttribute('data-vl-disable-back-link');
        }
    }

    _hideBackLinkChangedCallback() {
        const functionalHeader = this._shadow.querySelector('vl-functional-header');

        if (this.hasAttribute('hide-back-link')) {
            functionalHeader.setAttribute('data-vl-hide-back-link', '');
        } else {
            functionalHeader.removeAttribute('data-vl-hide-back-link');
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-cookie-statement': VlCookieStatement;
    }
}
