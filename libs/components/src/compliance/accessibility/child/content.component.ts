import { VlTitleComponent } from '@domg-wc/components/atom';
import { VlTypography } from '@domg-wc/components/block';
import { html } from 'lit';
import { VlContactCardComponent } from '../../../block/contact-card';
import { VlInfoblockComponent } from '../../../block/infoblock';
import { VlPropertiesComponent } from '../../../block/properties';
import { VlSideNavigationReferenceComponent } from '../../../block/side-navigation';
import { AccessibilityProperties } from '../vl-accessibility.model';
import { complianceStatus } from './compliance-status.component';
import { inaccessibleContent } from './inaccessible-content.component';
import { setupStatement } from './setup-statement.component';
import { sideNavigation } from './side-navigation.component';

export const contentElements = () => [
    VlContactCardComponent,
    VlInfoblockComponent,
    VlPropertiesComponent,
    VlTitleComponent,
    VlSideNavigationReferenceComponent,
    VlTypography,
];

export const content = ({
    application,
    compliance,
    date,
    dateModified,
    evaluation,
    limitations,
}: AccessibilityProperties) => {
    return html` <section id="content" class="vl-section">
        <div class="vl-content-block">
            <div class="vl-grid vl-stacked-medium">
                <div class="vl-column vl-column--8 vl-column--m-9 vl-column--s-12 vl-column--xs-12">
                    <vl-side-navigation-reference>
                        <div class="vl-grid vl-stacked-large">
                            <div class="vl-column vl-column--12 vl-column--m-12">
                                <p>
                                    De Vlaamse overheid streeft ernaar haar websites en mobiele applicaties toegankelijk
                                    te maken, overeenkomstig het bestuursdecreet van 7 december 2018 waarmee de Europese
                                    Richtlijn 2016/2102 is omgezet.
                                </p>
                                <div class="vl-margin--small">
                                    <vl-typography>
                                        <ul>
                                            <li>
                                                <vl-link
                                                    href="http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&cn=2018120705&table_name=wet&caller=list&fromtab=wet#LNK0011"
                                                    external
                                                    inline
                                                    label="Ga naar het bestuursdecreet van 7 december 2018 (opent in een nieuw venster)"
                                                    >Ga naar het bestuursdecreet van 7 december 2018
                                                </vl-link>
                                            </li>
                                            <li>
                                                <vl-link
                                                    href="https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=uriserv:OJ.L_.2016.327.01.0001.01.NLD&toc=OJ:L:2016:327:TOC"
                                                    external
                                                    inline
                                                    label="Ga naar de Europese richtlijn 2016/2102 (opent in een nieuw venster)"
                                                    >Ga naar de Europese Richtlijn 2016/2102
                                                </vl-link>
                                            </li>
                                        </ul>
                                    </vl-typography>
                                </div>
                                <p>Deze toegankelijkheidsverklaring is van toepassing op ${application}.</p>
                            </div>
                            ${complianceStatus({ compliance, evaluation })}
                            ${inaccessibleContent({ compliance, evaluation, limitations })}
                            ${setupStatement({ evaluation, date, dateModified })}
                            <div id="feedback-contact" class="vl-column vl-column--12 vl-column--m-12">
                                <vl-title type="h2">Feedback en contactgegevens</vl-title>
                                <p>
                                    Ondervindt u problemen en wenst u hulp bij het vinden van informatie of het
                                    uitvoeren van een actie? Hebt u een vraag of opmerking over de toegankelijkheid van
                                    deze website of toepassing, of over deze toegankelijkheidsverklaring? Neem contact
                                    op met Departement Omgeving.
                                </p>
                                <br />
                                <vl-contact-card id="contact-card-1">
                                    <vl-infoblock slot="info" type="contact">
                                        <vl-title
                                            type="h3"
                                            slot="title"
                                            custom-css="h3 {font-size: var(--vl-font-size); margin-top: 1rem; }"
                                            >Departement Omgeving</vl-title
                                        >
                                    </vl-infoblock>
                                    <vl-properties
                                        slot="properties"
                                        custom-css="dl:has(.item) { margin-top: 0.8rem; display: block; }"
                                    >
                                        <label>Adres</label>
                                        <data>
                                            <address aria-label="Adresgegevens">
                                                Havenlaan 88<br />
                                                1000 Brussel<br />
                                                België
                                            </address>
                                        </data>
                                        <label>Telefoon</label>
                                        <data>
                                            <vl-link
                                                href="tel:02 553 80 11"
                                                icon-placement="after"
                                                icon="phone"
                                                label="Bel naar 02 553 80 11"
                                            >
                                                02 553 80 11
                                            </vl-link>
                                        </data>
                                        <label>E-mail</label>
                                        <data>
                                            <vl-link
                                                href="mailto:omgeving@vlaanderen.be"
                                                icon-placement="after"
                                                icon="mail"
                                                label="Mail naar omgeving@vlaanderen.be"
                                            >
                                                omgeving@vlaanderen.be
                                            </vl-link>
                                        </data>
                                    </vl-properties>
                                </vl-contact-card>
                            </div>
                            <div id="enforcement-procedure" class="vl-column vl-column--12 vl-column--m-12">
                                <vl-title type="h2">Handhavingsprocedure</vl-title>
                                <p>
                                    Heeft u contact opgenomen via omgeving@vlaanderen.be maar bent u niet tevreden met
                                    het antwoord? Stuur dan uw klacht naar de klachtenbehandelaar van Departement
                                    Omgeving.
                                </p>
                                <br />
                                <vl-contact-card id="contact-card-2">
                                    <vl-infoblock slot="info" type="contact">
                                        <vl-title
                                            type="h3"
                                            slot="title"
                                            custom-css="h3 {font-size: var(--vl-font-size); margin-top: 1rem; }"
                                            >Klachten&shy;behandelaar</vl-title
                                        >
                                    </vl-infoblock>
                                    <vl-properties
                                        slot="properties"
                                        custom-css="dl:has(.item) { margin-top: 0.8rem; display: block; }"
                                    >
                                        <label>Adres</label>
                                        <data>
                                            <address aria-label="Adresgegevens">
                                                Havenlaan 88<br />
                                                1000 Brussel<br />
                                                België
                                            </address>
                                        </data>
                                        <label>E-mail</label>
                                        <data>
                                            <vl-link
                                                href="mailto:klachten.omgeving@vlaanderen.be"
                                                icon-placement="after"
                                                icon="mail"
                                                label="Mail naar klachten.omgeving@vlaanderen.be"
                                            >
                                                klachten.omgeving@vlaanderen.be
                                            </vl-link>
                                        </data>
                                    </vl-properties>
                                </vl-contact-card>
                                <br />
                                <p>
                                    Heeft u contact opgenomen met de klachtenbehandelaar van het Departement Omgeving,
                                    maar bent u niet tevreden met het antwoord? Stuur dan uw klacht naar de Vlaamse
                                    Ombudsdienst.
                                </p>
                                <br />
                                <vl-contact-card id="contact-card-3">
                                    <vl-infoblock slot="info" type="contact">
                                        <vl-title
                                            type="h3"
                                            slot="title"
                                            custom-css="h3 {font-size: var(--vl-font-size); margin-top: 1rem; }"
                                            >Vlaamse ombudsdienst</vl-title
                                        >
                                    </vl-infoblock>
                                    <vl-properties
                                        slot="properties"
                                        custom-css="dl:has(.item) { margin-top: 0.8rem; display: block; }"
                                    >
                                        <label>Adres</label>
                                        <data>
                                            <address aria-label="Adresgegevens">
                                                Leuvenseweg 86<br />
                                                1000 Brussel<br />
                                                België
                                            </address>
                                        </data>
                                        <label>Telefoon</label>
                                        <data>
                                            <vl-link
                                                href="tel:08 002 40 50"
                                                icon-placement="after"
                                                icon="phone"
                                                label="Bel naar 08 002 40 50"
                                            >
                                                08 002 40 50
                                            </vl-link>
                                        </data>
                                        <label>E-mail</label>
                                        <data>
                                            <vl-link
                                                href="mailto:klachten@vlaamseombudsdienst.be"
                                                icon-placement="after"
                                                icon="mail"
                                                label="Mail naar klachten@vlaamseombudsdienst.be"
                                            >
                                                klachten@vlaamseombudsdienst.be
                                            </vl-link>
                                        </data>
                                        <label>Website</label>
                                        <data>
                                            <vl-link
                                                href="http://www.vlaamseombudsdienst.be"
                                                external
                                                label="Ga naar vlaamseombudsdienst.be (opent in een nieuw venster)"
                                            >
                                                http://www.vlaamseombudsdienst.be
                                            </vl-link>
                                        </data>
                                    </vl-properties>
                                </vl-contact-card>
                            </div>
                        </div>
                    </vl-side-navigation-reference>
                </div>
                ${sideNavigation({ compliance })}
            </div>
        </div>
    </section>`;
};
