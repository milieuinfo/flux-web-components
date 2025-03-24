import { vlContentBlockStyles, vlGridStyles, vlSectionStyles } from '@domg-wc/common-utilities/css';
import { VlLinkComponent } from '@domg-wc/components/next/link';
import { VlParagraphComponent } from '@domg-wc/components/next/paragraph';
import { VlPropertiesComponent } from '@domg-wc/components/next/properties';
import { VlSideNavigationComponent } from '@domg-wc/components/next/side-navigation';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { render } from 'lit-html';
import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import {
    VlContactCardComponent,
    VlFunctionalHeaderComponent,
    VlInfoblockComponent,
    VlTypography,
} from '@domg-wc/components';
import {
    VlColumnElement,
    VlGridElement,
    VlH1Element,
    VlH2Element,
    VlIntroductionElement,
    VlLayoutElement,
    VlLinkElement,
    VlRegionElement,
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
            VlRegionElement,
            // components
            VlContactCardComponent,
            VlInfoblockComponent,
            VlPropertiesComponent,
            VlTypography,
            VlSideNavigationComponent,
            VlTitleComponent,
            VlLinkComponent,
            VlParagraphComponent,
            VlFunctionalHeaderComponent,
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
                ${vlSectionStyles.cssText}
                ${vlGridStyles.cssText}
                ${vlContentBlockStyles.cssText}
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
        <section class="vl-section-next">
            <div class="vl-section-next__centered">
                <div class="vl-grid-next vl-stacked-next-small vl-content-block-next">
                    <div class="vl-column-next vl-column-next--10">
                        <vl-title-next type="h1" no-space-bottom>Cookieverklaring</vl-title-next>
                    </div>
                    <div class="vl-column-next vl-column-next--10">
                        <vl-paragraph-next introduction>
                            <span>Versie</span> <span id="introduction-version">1.0.0</span> - <span id="introduction-date">3 maart 2021</span>
                        </vl-paragraph-next>
                    </div>

                    <div class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                        <vl-typography>
                            <hr/>
                        </vl-typography>
                    </div>
                </div>
            </div>
        </section>

        <section class="vl-section-next">
            <div class="vl-section-next__centered">
                <div class="vl-grid-next vl-stacked-next-medium vl-content-block-next">
                    <div class="vl-column-next vl-column-next--8 vl-column-next--m-8 vl-column-next--s-8 vl-column-next--xs-8">
                        <vl-side-navigation-reference-next  data-vl--scrollspy-content>
                            <div class="vl-grid-next vl-stacked-next-large">
                                <div id="cookie-policy" class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                                    <vl-title-next type="h2">Cookiebeleid</vl-title-next>
                                    <p>Departement Omgeving (verder ‘dOMG’) vindt het belangrijk dat u op iedere plaats en elk ogenblik haar dOMG-inhoud kan bekijken, beluisteren, lezen of beleven via diverse mediaplatformen. dOMG wil ook werken aan interactieve diensten en diensten op uw maat. Op dOMG-onlinediensten worden technieken gehanteerd om dit mogelijk te maken, bijvoorbeeld met behulp van cookies en scripts. Deze technieken worden hierna gemakkelijkheidshalve cookies genoemd. In dit cookiebeleid wenst dOMG u te informeren welke cookies worden gebruikt en waarom dit gebeurt. Verder wordt toegelicht in welke mate u als gebruiker het gebruik kan controleren. dOMG wil namelijk graag uw privacy en de gebruiksvriendelijkheid van haar onlinediensten zoveel mogelijk waarborgen.</p>
                                    <br/>
                                    <p>Dit cookiebeleid is van toepassing op alle 'dOMG-onlinediensten', met name alle websites, (mobiele) applicaties en internetdiensten die dOMG aanbiedt en die toegang geven tot dOMG-inhoud.</p>
                                    <br/>
                                    <p>dOMG kan het cookiebeleid op elk moment veranderen. Dat kan bijvoorbeeld gebeuren in het kader van veranderingen aan haar diensten of de geldende wetgeving. Het gewijzigde beleid wordt dan bekendgemaakt op de relevante onlinediensten en geldt vanaf het moment dat deze bekendgemaakt wordt.</p>
                                </div>

                                <div id="cookie-definition" class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                                    <vl-title-next type="h2">Wat zijn cookies precies?</vl-title-next>
                                    <p>Cookies zijn kleine gegevens- of tekstbestanden die op uw computer of mobiele apparaat worden geïnstalleerd wanneer u een website bezoekt of een (mobiele) toepassing gebruikt. Het cookiebestand bevat een unieke code waarmee uw browser herkend kan worden tijdens het bezoek aan de online service of tijdens opeenvolgende, herhaalde bezoeken. Cookies kunnen worden geplaatst door de server van de website of applicatie die u bezoekt, maar ook door servers van derden die al dan niet met deze website of applicatie samenwerken.</p>
                                    <br/>
                                    <p>Cookies maken over het algemeen de interactie tussen de bezoeker en de website of applicatie gemakkelijker en sneller en helpen de bezoeker om te navigeren tussen de verschillende delen van een website of applicatie.</p>
                                </div>

                                <div id="cookie-management" class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                                    <vl-title-next type="h2">Hoe kan ik het gebruik van cookies op deze onlinediensten weigeren of beheren?</vl-title-next>
                                    <vl-typography>
                                        <p>U kunt de installatie van cookies weigeren via uw browserinstellingen. U kunt op elk gewenst moment ook de reeds geïnstalleerde cookies van uw computer of mobiele apparaat verwijderen. Instructies vindt u op de website van uw browser:</p>
                                        <ul>
                                            <li><vl-link-next href="https://support.microsoft.com/nl-be/help/17479/windows-internet-explorer-11-change-security-privacy-settings" external >Microsoft Internet Explorer</vl-link-next></vl-side-navigation-item-next>
                                            <li><vl-link-next href="https://support.microsoft.com/nl-nl/help/4468242/microsoft-edge-browsing-data-and-privacy-microsoft-privacy" external >Microsoft Edge</vl-link-next></vl-side-navigation-item-next>
                                            <li><vl-link-next href="http://support.google.com/chrome/bin/answer.py?hl=nl&amp;answer=95647" external >Google Chrome</vl-link-next></vl-side-navigation-item-next>
                                            <li><vl-link-next href="http://support.mozilla.org/nl/kb/cookies-in-en-uitschakelen-websites-voorkeuren?redirectlocale=nl&amp;redirectslug=Cookies+in-+en+uitschakelen" external >Mozilla Firefox</vl-link-next></vl-side-navigation-item-next>
                                            <li><vl-link-next href="http://support.apple.com/kb/PH5042" external >Apple Safari</vl-link-next></vl-side-navigation-item-next>
                                        </vl-side-navigation-group-next>
                                        <p>Wanneer u cookies uitschakelt, moet u er rekening mee houden dat bepaalde grafische elementen er niet mooi kunnen uitzien, of dat u bepaalde toepassingen niet kunt gebruiken. Hieronder vindt u een gedetailleerde lijst van alle cookies die in deze website of toepassing worden gebruikt.</p>
                                    </vl-typography>
                                </div>

                                <div id="cookie-usage" class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                                    <vl-title-next type="h2">Gebruikte cookies</vl-title-next>
                                    <vl-header-cookie></vl-header-cookie>
                                    <vl-header-authentication-cookie></vl-header-authentication-cookie>
                                    <vl-authentication-cookie></vl-authentication-cookie>
                                    <vl-jsessionid-cookie></vl-jsessionid-cookie>
                                    <vl-sticky-session-cookie></vl-sticky-session-cookie>
                                    <slot></slot>
                                </div>
                            </div>
                        </vl-side-navigation-reference-next>
                    </div>

                    <div class="vl-column-next vl-column-next--4 vl-column-next--m-4 vl-column-next--s-4 vl-column-next--xs-0">
                        <vl-side-navigation-next  aria-label="inhoudsopgave">
                            <vl-side-navigation-h2-next >Op deze pagina</vl-side-navigation-h2-next>
                            <vl-side-navigation-content-next >
                                <vl-side-navigation-group-next >
                                    <vl-side-navigation-item-next  parent>
                                        <vl-side-navigation-toggle-next  href="#cookie-policy">
                                            Cookiebeleid
                                        </vl-side-navigation-toggle-next>
                                    </vl-side-navigation-item-next>
                                    <vl-side-navigation-item-next  parent>
                                        <vl-side-navigation-toggle-next  href="#cookie-definition">
                                            Wat zijn cookies precies
                                        </vl-side-navigation-toggle-next>
                                    </vl-side-navigation-item-next>
                                    <vl-side-navigation-item-next  parent>
                                        <vl-side-navigation-toggle-next  href="#cookie-management">
                                            Hoe kan ik het gebruik van cookies op deze onlinediensten weigeren of beheren?
                                        </vl-side-navigation-toggle-next>
                                    </vl-side-navigation-item-next>
                                    <vl-side-navigation-item-next  parent>
                                        <vl-side-navigation-toggle-next  href="#cookie-usage">
                                            Gebruikte cookies
                                        </vl-side-navigation-toggle-next>
                                    </vl-side-navigation-item-next>
                                </vl-side-navigation-group-next>
                            </div>
                        </vl-side-navigation-next>
                    </div>
                </div>
            </div>
        </section>

        <section class="vl-section-next vl-section-next--overlap">
            <div class="vl-section-next__centered">
                <div class="vl-grid-next vl-stacked-next-medium">
                    <div class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                        <vl-contact-card>
                            <vl-infoblock slot="info" data-vl-type="contact">
                                <h3 slot="title">Departement Omgeving</h3>
                            </vl-infoblock>
                            <vl-properties-next slot="properties">
                                <label>Adres</label>
                                <data>
                                    <div>Herman Teirlinckgebouw</div>
                                    <div>Havenlaan 88</div>
                                    <div>1000 Brussel, België</div>
                                </data>
                                <label>Telefoon</label>
                                <data>
                                    <vl-link-next href="tel:02 553 80 11"
                                                  icon-placement="after"
                                                  icon="phone">
                                        02 553 80 11
                                    </vl-link-next>
                                </data>
                                <label>E-mail</label>
                                <data>
                                    <vl-link-next href="mailto:omgeving@vlaanderen.be"
                                                  icon-placement="after"
                                                  icon="mail">
                                        omgeving@vlaanderen.be
                                    </vl-link-next>
                                </data>
                                <label>Website</label>
                                <data>
                                    <vl-link-next href="http://www.omgevingvlaanderen.be" external>
                                        http://www.omgevingvlaanderen.be
                                    </vl-link-next>
                                </data>
                            </vl-properties-next>
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
