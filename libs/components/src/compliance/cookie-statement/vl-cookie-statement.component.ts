import { BaseHTMLElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlContentBlockStyles, vlGridStyles, vlLegacyStyles, vlResetStyles, vlSectionStyles } from '@domg-wc/styles';
import { render } from 'lit-html';
import { VlTitleComponent } from '../../atom';
import { VlLinkComponent } from '../../atom/link';
import { VlParagraphComponent } from '../../atom/paragraph';
import { VlContactCardComponent } from '../../block/contact-card';
import { VlFunctionalHeaderComponent } from '../../block/functional-header';
import { VlInfoblockComponent } from '../../block/infoblock';
import { VlPropertiesComponent } from '../../block/properties';
import { VlSideNavigationComponent } from '../../block/side-navigation';
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
            VlSideNavigationComponent,
            VlTitleComponent,
            VlLinkComponent,
            VlParagraphComponent,
            VlFunctionalHeaderComponent,
            // child components
            ...cookieStatementHeaderElements(),
        ]);
    }

    constructor() {
        super(`
            <style>
                ${vlResetStyles}
                ${vlLegacyStyles.join('')}
                ${vlCookieStatementFluxStyles}
                ${vlSectionStyles}
                ${vlGridStyles}
                ${vlContentBlockStyles}
            </style>
             <slot name="header"></slot>
            `);

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
                <div class="vl-grid vl-stacked-small vl-content-block">
                    <div class="vl-column vl-column--10">
                        <vl-title type="h1" no-space-bottom>Cookieverklaring</vl-title>
                    </div>
                    <div class="vl-column vl-column--10">
                        <vl-paragraph introduction>
                            <span>Versie</span> <span id="introduction-version">1.0.0</span> - <span id="introduction-date">3 maart 2021</span>
                        </vl-paragraph>
                    </div>

                    <div class="vl-column vl-column--12 vl-column--m-12">
                        <vl-typography>
                            <hr/>
                        </vl-typography>
                    </div>
                </div>
            </div>
        </section>

        <section class="vl-section">
            <div class="vl-content-block">
                <div class="vl-grid vl-stacked-medium vl-content-block">
                    <div class="vl-column vl-column--8 vl-column--m-8 vl-column--s-8 vl-column--xs-8">
                        <vl-side-navigation-reference  -scrollspy-content>
                            <div class="vl-grid vl-stacked-large">
                                <div id="cookie-policy" class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h2">Cookiebeleid</vl-title>
                                    <p>Departement Omgeving (verder ‘dOMG’) vindt het belangrijk dat u op iedere plaats en elk ogenblik haar dOMG-inhoud kan bekijken, beluisteren, lezen of beleven via diverse mediaplatformen. dOMG wil ook werken aan interactieve diensten en diensten op uw maat. Op dOMG-onlinediensten worden technieken gehanteerd om dit mogelijk te maken, bijvoorbeeld met behulp van cookies en scripts. Deze technieken worden hierna gemakkelijkheidshalve cookies genoemd. In dit cookiebeleid wenst dOMG u te informeren welke cookies worden gebruikt en waarom dit gebeurt. Verder wordt toegelicht in welke mate u als gebruiker het gebruik kan controleren. dOMG wil namelijk graag uw privacy en de gebruiksvriendelijkheid van haar onlinediensten zoveel mogelijk waarborgen.</p>
                                    <br/>
                                    <p>Dit cookiebeleid is van toepassing op alle 'dOMG-onlinediensten', met name alle websites, (mobiele) applicaties en internetdiensten die dOMG aanbiedt en die toegang geven tot dOMG-inhoud.</p>
                                    <br/>
                                    <p>dOMG kan het cookiebeleid op elk moment veranderen. Dat kan bijvoorbeeld gebeuren in het kader van veranderingen aan haar diensten of de geldende wetgeving. Het gewijzigde beleid wordt dan bekendgemaakt op de relevante onlinediensten en geldt vanaf het moment dat deze bekendgemaakt wordt.</p>
                                </div>

                                <div id="cookie-definition" class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h2">Wat zijn cookies precies?</vl-title>
                                    <p>Cookies zijn kleine gegevens- of tekstbestanden die op uw computer of mobiele apparaat worden geïnstalleerd wanneer u een website bezoekt of een (mobiele) toepassing gebruikt. Het cookiebestand bevat een unieke code waarmee uw browser herkend kan worden tijdens het bezoek aan de online service of tijdens opeenvolgende, herhaalde bezoeken. Cookies kunnen worden geplaatst door de server van de website of applicatie die u bezoekt, maar ook door servers van derden die al dan niet met deze website of applicatie samenwerken.</p>
                                    <br/>
                                    <p>Cookies maken over het algemeen de interactie tussen de bezoeker en de website of applicatie gemakkelijker en sneller en helpen de bezoeker om te navigeren tussen de verschillende delen van een website of applicatie.</p>
                                </div>

                                <div id="cookie-management" class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h2">Hoe kan ik het gebruik van cookies op deze onlinediensten weigeren of beheren?</vl-title>
                                    <vl-typography>
                                        <p>U kunt de installatie van cookies weigeren via uw browserinstellingen. U kunt op elk gewenst moment ook de reeds geïnstalleerde cookies van uw computer of mobiele apparaat verwijderen. Instructies vindt u op de website van uw browser:</p>
                                        <ul>
                                            <li><vl-link href="https://support.microsoft.com/nl-be/help/17479/windows-internet-explorer-11-change-security-privacy-settings" external >Microsoft Internet Explorer</vl-link></vl-side-navigation-item>
                                            <li><vl-link href="https://support.microsoft.com/nl-nl/help/4468242/microsoft-edge-browsing-data-and-privacy-microsoft-privacy" external >Microsoft Edge</vl-link></vl-side-navigation-item>
                                            <li><vl-link href="http://support.google.com/chrome/bin/answer.py?hl=nl&amp;answer=95647" external >Google Chrome</vl-link></vl-side-navigation-item>
                                            <li><vl-link href="http://support.mozilla.org/nl/kb/cookies-in-en-uitschakelen-websites-voorkeuren?redirectlocale=nl&amp;redirectslug=Cookies+in-+en+uitschakelen" external >Mozilla Firefox</vl-link></vl-side-navigation-item>
                                            <li><vl-link href="http://support.apple.com/kb/PH5042" external >Apple Safari</vl-link></vl-side-navigation-item>
                                        </vl-side-navigation-group>
                                        <p>Wanneer u cookies uitschakelt, moet u er rekening mee houden dat bepaalde grafische elementen er niet mooi kunnen uitzien, of dat u bepaalde toepassingen niet kunt gebruiken. Hieronder vindt u een gedetailleerde lijst van alle cookies die in deze website of toepassing worden gebruikt.</p>
                                    </vl-typography>
                                </div>

                                <div id="cookie-usage" class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h2">Gebruikte cookies</vl-title>
                                    <vl-header-cookie></vl-header-cookie>
                                    <vl-header-authentication-cookie></vl-header-authentication-cookie>
                                    <vl-authentication-cookie></vl-authentication-cookie>
                                    <vl-jsessionid-cookie></vl-jsessionid-cookie>
                                    <vl-sticky-session-cookie></vl-sticky-session-cookie>
                                    <slot></slot>
                                </div>
                            </div>
                        </vl-side-navigation-reference>
                    </div>

                    <div class="vl-column vl-column--4 vl-column--m-4 vl-column--s-4 vl-column--xs-0">
                        <vl-side-navigation  aria-label="inhoudsopgave">
                            <vl-side-navigation-h2 >Op deze pagina</vl-side-navigation-h2>
                            <vl-side-navigation-content >
                                <vl-side-navigation-group >
                                    <vl-side-navigation-item  parent>
                                        <vl-side-navigation-toggle  href="#cookie-policy">
                                            Cookiebeleid
                                        </vl-side-navigation-toggle>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item  parent>
                                        <vl-side-navigation-toggle  href="#cookie-definition">
                                            Wat zijn cookies precies
                                        </vl-side-navigation-toggle>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item  parent>
                                        <vl-side-navigation-toggle  href="#cookie-management">
                                            Hoe kan ik het gebruik van cookies op deze onlinediensten weigeren of beheren?
                                        </vl-side-navigation-toggle>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item  parent>
                                        <vl-side-navigation-toggle  href="#cookie-usage">
                                            Gebruikte cookies
                                        </vl-side-navigation-toggle>
                                    </vl-side-navigation-item>
                                </vl-side-navigation-group>
                            </div>
                        </vl-side-navigation>
                    </div>
                </div>
            </div>
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
                                <label>Adres</label>
                                <data>
                                    <div>Herman Teirlinckgebouw</div>
                                    <div>Havenlaan 88</div>
                                    <div>1000 Brussel, België</div>
                                </data>
                                <label>Telefoon</label>
                                <data>
                                    <vl-link href="tel:02 553 80 11"
                                                  icon-placement="after"
                                                  icon="phone">
                                        02 553 80 11
                                    </vl-link>
                                </data>
                                <label>E-mail</label>
                                <data>
                                    <vl-link href="mailto:omgeving@vlaanderen.be"
                                                  icon-placement="after"
                                                  icon="mail">
                                        omgeving@vlaanderen.be
                                    </vl-link>
                                </data>
                                <label>Website</label>
                                <data>
                                    <vl-link href="http://www.omgevingvlaanderen.be" external>
                                        http://www.omgevingvlaanderen.be
                                    </vl-link>
                                </data>
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
