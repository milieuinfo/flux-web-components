import { BaseHTMLElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlContentBlockStyles, vlGridStyles, vlLegacyStyles, vlResetStyles, vlSectionStyles } from '@domg-wc/styles';
import { render } from 'lit';
import { VlTitleComponent } from '../../atom';
import { VlLinkComponent } from '../../atom/link';
import { VlParagraphComponent } from '../../atom/paragraph';
import { VlContactCardComponent } from '../../block/contact-card';
import { VlFunctionalHeaderComponent } from '../../block/functional-header';
import { VlInfoblockComponent } from '../../block/infoblock';
import { VlSideNavigationLayoutComponent } from '../../block/next/side-navigation';
import { VlPropertiesComponent } from '../../block/properties';
import { VlTypography } from '../../block/typography';
import { cookieStatementHeaderElements, header } from './child/header.component';
import './cookie/vl-authentication-cookie.component';
import './cookie/vl-cookie.component';
import './cookie/vl-header-authentication-cookie.component';
import './cookie/vl-header-cookie.component';
import './cookie/vl-jsessionid-cookie.component';
import './cookie/vl-sticky-session-cookie.component';
import { vlCookieStatementFluxStyles } from './vl-cookie-statement.flux-css';

@webComponent('vl-cookie-statement')
export class VlCookieStatement extends BaseHTMLElement {
    static {
        registerWebComponents([
            // components
            VlContactCardComponent,
            VlInfoblockComponent,
            VlPropertiesComponent,
            VlTypography,
            VlSideNavigationLayoutComponent,
            VlTitleComponent,
            VlLinkComponent,
            VlParagraphComponent,
            VlFunctionalHeaderComponent,
            VlTitleComponent,
            // child components
            ...cookieStatementHeaderElements(),
        ]);
    }

    constructor() {
        const html = `
            <slot name="header"></slot>
        `;
        const styleSheets = [
            vlResetStyles.styleSheet!,
            ...vlLegacyStyles.map((style) => style.styleSheet!),
            vlCookieStatementFluxStyles.styleSheet!,
            vlSectionStyles.styleSheet!,
            vlGridStyles.styleSheet!,
            vlContentBlockStyles.styleSheet!,
        ];
        super(html, styleSheets);

        const headerSlot = this.shadowRoot?.querySelector<HTMLElement>('slot[name="header"]');

        if (headerSlot) {
            render(header(), headerSlot);
        }

        this.allowCustomCSS = false;
        this._element.insertAdjacentHTML(
            'afterend',
            `
                <section class="vl-section">
                    <div class="vl-content-block">
                        <div class="vl-grid vl-stacked-small">
                            <div class="vl-column vl-column--10">
                                <vl-title type="h1" no-space-bottom id="main-content">Cookieverklaring</vl-title>
                            </div>
                            <div class="vl-column vl-column--10">
                                <vl-paragraph introduction>
                                    <span>Versie</span> <span id="introduction-version">1.0.0</span> -
                                    <span id="introduction-date">3 maart 2021</span>
                                </vl-paragraph>
                            </div>

                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <vl-typography>
                                    <hr />
                                </vl-typography>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="vl-section">
                    <vl-side-navigation-layout-next content-block max-depth="1">
                        <div slot="content" class="vl-grid vl-stacked-large">
                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <vl-title type="h2" id="cookie-policy">Cookiebeleid</vl-title>
                                <p>
                                    Departement Omgeving (verder 'dOMG') vindt het belangrijk dat u op
                                    iedere plaats en elk ogenblik haar dOMG-inhoud kan bekijken,
                                    beluisteren, lezen of beleven via diverse mediaplatformen. dOMG wil ook
                                    werken aan interactieve diensten en diensten op uw maat. Op
                                    dOMG-onlinediensten worden technieken gehanteerd om dit mogelijk te
                                    maken, bijvoorbeeld met behulp van cookies en scripts. Deze technieken
                                    worden hierna gemakkelijkheidshalve cookies genoemd. In dit cookiebeleid
                                    wenst dOMG u te informeren welke cookies worden gebruikt en waarom dit
                                    gebeurt. Verder wordt toegelicht in welke mate u als gebruiker het
                                    gebruik kan controleren. dOMG wil namelijk graag uw privacy en de
                                    gebruiksvriendelijkheid van haar onlinediensten zoveel mogelijk
                                    waarborgen.
                                </p>
                                <br />
                                <p>
                                    Dit cookiebeleid is van toepassing op alle 'dOMG-onlinediensten', met
                                    name alle websites, (mobiele) applicaties en internetdiensten die dOMG
                                    aanbiedt en die toegang geven tot dOMG-inhoud.
                                </p>
                                <br />
                                <p>
                                    dOMG kan het cookiebeleid op elk moment veranderen. Dat kan bijvoorbeeld
                                    gebeuren in het kader van veranderingen aan haar diensten of de geldende
                                    wetgeving. Het gewijzigde beleid wordt dan bekendgemaakt op de relevante
                                    onlinediensten en geldt vanaf het moment dat deze bekendgemaakt wordt.
                                </p>
                            </div>

                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <vl-title type="h2" id="cookie-definition">Wat zijn cookies precies?</vl-title>
                                <p>
                                    Cookies zijn kleine gegevens- of tekstbestanden die op uw computer of
                                    mobiele apparaat worden geïnstalleerd wanneer u een website bezoekt of
                                    een (mobiele) toepassing gebruikt. Het cookiebestand bevat een unieke
                                    code waarmee uw browser herkend kan worden tijdens het bezoek aan de
                                    online service of tijdens opeenvolgende, herhaalde bezoeken. Cookies
                                    kunnen worden geplaatst door de server van de website of applicatie die
                                    u bezoekt, maar ook door servers van derden die al dan niet met deze
                                    website of applicatie samenwerken.
                                </p>
                                <br />
                                <p>
                                    Cookies maken over het algemeen de interactie tussen de bezoeker en de
                                    website of applicatie gemakkelijker en sneller en helpen de bezoeker om
                                    te navigeren tussen de verschillende delen van een website of
                                    applicatie.
                                </p>
                            </div>

                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <vl-title type="h2" id="cookie-management"
                                    >Hoe kan ik het gebruik van cookies op deze onlinediensten weigeren of
                                    beheren?</vl-title
                                >
                                <vl-typography>
                                    <p>
                                        U kunt de installatie van cookies weigeren via uw
                                        browserinstellingen. U kunt op elk gewenst moment ook de reeds
                                        geïnstalleerde cookies van uw computer of mobiele apparaat
                                        verwijderen. Instructies vindt u op de website van uw browser:
                                    </p>
                                    <ul>
                                        <li>
                                            <vl-link
                                                href="https://support.microsoft.com/nl-be/help/17479/windows-internet-explorer-11-change-security-privacy-settings"
                                                external
                                                label="Ga naar Microsoft Internet Explorer (opent in een nieuw venster)"
                                                >Microsoft Internet Explorer</vl-link
                                            >
                                        </li>
                                        <li>
                                            <vl-link
                                                href="https://support.microsoft.com/nl-nl/help/4468242/microsoft-edge-browsing-data-and-privacy-microsoft-privacy"
                                                external
                                                label="Ga naar Microsoft Edge (opent in een nieuw venster)"
                                                >Microsoft Edge</vl-link
                                            >
                                        </li>
                                        <li>
                                            <vl-link
                                                href="http://support.google.com/chrome/bin/answer.py?hl=nl&amp;answer=95647"
                                                external
                                                label="Ga naar Google Chrome (opent in een nieuw venster)"
                                                >Google Chrome</vl-link
                                            >
                                        </li>
                                        <li>
                                            <vl-link
                                                href="http://support.mozilla.org/nl/kb/cookies-in-en-uitschakelen-websites-voorkeuren?redirectlocale=nl&amp;redirectslug=Cookies+in-+en+uitschakelen"
                                                external
                                                label="Ga naar Mozilla Firefox (opent in een nieuw venster)"
                                                >Mozilla Firefox</vl-link
                                            >
                                        </li>
                                        <li>
                                            <vl-link href="http://support.apple.com/kb/PH5042" external
                                                label="Ga naar Apple Safari (opent in een nieuw venster)"
                                                >Apple Safari</vl-link
                                            >
                                        </li>
                                    </ul>
                                    <p>
                                        Wanneer u cookies uitschakelt, moet u er rekening mee houden dat
                                        bepaalde grafische elementen er niet mooi kunnen uitzien, of dat u
                                        bepaalde toepassingen niet kunt gebruiken. Hieronder vindt u een
                                        gedetailleerde lijst van alle cookies die in deze website of
                                        toepassing worden gebruikt.
                                    </p>
                                </vl-typography>
                            </div>

                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <vl-title type="h2" id="cookie-usage">Gebruikte cookies</vl-title>
                                <vl-header-cookie></vl-header-cookie>
                                <vl-header-authentication-cookie></vl-header-authentication-cookie>
                                <vl-authentication-cookie></vl-authentication-cookie>
                                <vl-jsessionid-cookie></vl-jsessionid-cookie>
                                <vl-sticky-session-cookie></vl-sticky-session-cookie>
                                <slot></slot>
                            </div>
                        </div>
                    </vl-side-navigation-layout-next>
                </section>

                <section class="vl-section vl-section--overlap">
                    <div class="vl-content-block">
                        <div class="vl-grid vl-stacked-medium">
                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <vl-contact-card>
                                    <vl-infoblock slot="info" type="contact">
                                        <h3 slot="title">Departement Omgeving</h3>
                                    </vl-infoblock>
                                    <vl-properties slot="properties">
                                        <vl-property>Adres</vl-property>
                                        <vl-property-data>
                                            <address aria-label="Adresgegevens">
                                                Herman Teirlinckgebouw<br />
                                                Havenlaan 88<br />
                                                1000 Brussel, België
                                            </address>
                                        </vl-property-data>
                                        <vl-property>Telefoon</vl-property>
                                        <vl-property-data>
                                            <vl-link href="tel:02 553 80 11" icon-placement="after" icon="phone" label="Bel naar 02 553 80 11">
                                                02 553 80 11
                                            </vl-link>
                                        </vl-property-data>
                                        <vl-property>E-mail</vl-property>
                                        <vl-property-data>
                                            <vl-link
                                                href="mailto:omgeving@vlaanderen.be"
                                                icon-placement="after"
                                                icon="mail"
                                                label="Mail naar omgeving@vlaanderen.be"
                                            >
                                                omgeving@vlaanderen.be
                                            </vl-link>
                                        </vl-property-data>
                                        <vl-property>Website</vl-property>
                                        <vl-property-data>
                                            <vl-link href="http://www.omgevingvlaanderen.be" external label="Ga naar omgevingvlaanderen.be (opent in een nieuw venster)">
                                                http://www.omgevingvlaanderen.be
                                            </vl-link>
                                        </vl-property-data>
                                    </vl-properties>
                                </vl-contact-card>
                            </div>
                        </div>
                    </div>
                </section>
            `
        );
    }

    static get _observedAttributes() {
        return ['date', 'disable-back-link', 'hide-back-link', 'version'];
    }

    _versionChangedCallback(oldValue: string, newValue: string) {
        const versionElement = this._shadow?.getElementById('introduction-version') as HTMLElement;

        versionElement.innerText = newValue;
    }

    _dateChangedCallback(oldValue: string, newValue: string) {
        const dateElement = this._shadow?.getElementById('introduction-date') as HTMLElement;

        dateElement.innerText = newValue;
    }

    _disableBackLinkChangedCallback() {
        const functionalHeader = this._shadow?.querySelector<VlFunctionalHeaderComponent>('vl-functional-header');

        if (this.hasAttribute('disable-back-link')) {
            functionalHeader?.setAttribute('disable-back-link', '');
        } else {
            functionalHeader?.removeAttribute('disable-back-link');
        }
    }

    _hideBackLinkChangedCallback() {
        const functionalHeader = this._shadow?.querySelector<VlFunctionalHeaderComponent>('vl-functional-header');

        if (this.hasAttribute('hide-back-link')) {
            functionalHeader?.setAttribute('hide-back-link', '');
        } else {
            functionalHeader?.removeAttribute('hide-back-link');
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-cookie-statement': VlCookieStatement;
    }
}
