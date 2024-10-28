import { AccessibilityProperties } from '../vl-accessibility.model';
import { html } from 'lit';
import { setupStatement } from './setup-statement.section';
import { inaccessibleContent } from './inaccessible-content.section';
import { sideNavigation } from './side-navigation.section';
import { complianceStatus } from './compliance-status.section';
import {
    VlColumnElement,
    VlGridElement,
    VlH2Element,
    VlIconElement,
    VlLayoutElement,
    VlLinkElement,
    VlPropertiesComponent,
    VlPropertiesListElement,
    VlPropertyTermElement,
    VlPropertyValueElement,
    VlRegionElement,
    VlSideNavigationReferenceElement,
} from '@domg-wc/elements';
import { VlContactCardComponent, VlInfoblockComponent } from '@domg-wc/components';

export const contentElements = () => [
    VlRegionElement,
    VlLayoutElement,
    VlGridElement,
    VlSideNavigationReferenceElement,
    VlColumnElement,
    VlLinkElement,
    VlContactCardComponent,
    VlInfoblockComponent,
    VlPropertiesComponent,
    VlPropertiesListElement,
    VlPropertyTermElement,
    VlPropertyValueElement,
    VlIconElement,
    VlH2Element,
];

export const content = ({
    application,
    compliance,
    date,
    dateModified,
    evaluation,
    limitations,
}: AccessibilityProperties) => {
    return html` <section id="content" is="vl-region">
        <div is="vl-layout">
            <div is="vl-grid" data-vl-is-stacked>
                <div
                    is="vl-column"
                    data-vl-size="8"
                    data-vl-medium-size="8"
                    data-vl-small-size="8"
                    data-vl-extra-small-size="12"
                >
                    <div is="vl-side-navigation-reference" data-vl--scrollspy-content>
                        <div is="vl-grid" data-vl-is-stacked-large>
                            <div is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                                <p>
                                    De Vlaamse overheid streeft ernaar haar websites en mobiele applicaties toegankelijk
                                    te maken, overeenkomstig het
                                    <a
                                        is="vl-link"
                                        href="http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&cn=2018120705&table_name=wet&caller=list&fromtab=wet#LNK0011"
                                        target="_blank"
                                        data-vl-inline
                                        >bestuursdecreet van 7 december 2018<span
                                            is="vl-icon"
                                            data-vl-icon="external"
                                            data-vl-after
                                            data-vl-light
                                        ></span
                                    ></a>
                                    waarmee de
                                    <a
                                        is="vl-link"
                                        href="https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=uriserv:OJ.L_.2016.327.01.0001.01.NLD&toc=OJ:L:2016:327:TOC"
                                        target="_blank"
                                        data-vl-inline
                                        >Europese Richtlijn 2016/2102<span
                                            is="vl-icon"
                                            data-vl-icon="external"
                                            data-vl-after
                                            data-vl-light
                                        ></span
                                    ></a>
                                    is omgezet.
                                </p>
                                <br />
                                <p>Deze toegankelijkheidsverklaring is van toepassing op ${application}.</p>
                            </div>
                            ${complianceStatus({ compliance, evaluation })}
                            ${inaccessibleContent({ compliance, evaluation, limitations })}
                            ${setupStatement({ evaluation, date, dateModified })}
                            <div id="feedback-contact" is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                                <h2 is="vl-h2">Feedback en contactgegevens</h2>
                                <p>
                                    Ondervindt u problemen en wenst u hulp bij het vinden van informatie of het
                                    uitvoeren van een actie? Hebt u een vraag of opmerking over de toegankelijkheid van
                                    deze website of toepassing, of over deze toegankelijkheidsverklaring? Neem contact
                                    op met Departement Omgeving.
                                </p>
                                <br />
                                <vl-contact-card id="contact-card-1">
                                    <vl-infoblock slot="info" data-vl-type="contact">
                                        <h3 slot="title">Departement Omgeving</h3>
                                    </vl-infoblock>
                                    <vl-properties slot="properties">
                                        <dl is="vl-properties-list">
                                            <dt is="vl-property-term">Adres</dt>
                                            <dd is="vl-property-value">Havenlaan 88<br />1000 Brussel<br />België</dd>
                                            <dt is="vl-property-term">Telefoon</dt>
                                            <dd is="vl-property-value">
                                                <p>
                                                    <a is="vl-link" href="tel:02 553 80 11"
                                                        >02 553 80 11<span
                                                            is="vl-icon"
                                                            data-vl-icon="phone"
                                                            data-vl-after
                                                        ></span
                                                    ></a>
                                                </p>
                                            </dd>
                                            <dt is="vl-property-term">E-mail</dt>
                                            <dd is="vl-property-value">
                                                <a is="vl-link" href="mailto:omgeving@vlaanderen.be"
                                                    >omgeving@vlaanderen.be<span
                                                        is="vl-icon"
                                                        data-vl-icon="mail"
                                                        data-vl-after
                                                    ></span
                                                ></a>
                                            </dd>
                                        </dl>
                                    </vl-properties>
                                </vl-contact-card>
                            </div>
                            <div id="enforcement-procedure" is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                                <h2 is="vl-h2">Handhavingsprocedure</h2>
                                <p>
                                    Heeft u contact opgenomen via omgeving@vlaanderen.be maar bent u niet tevreden met
                                    het antwoord? Stuur dan uw klacht naar de klachtenbehandelaar van Departement
                                    Omgeving.
                                </p>
                                <br />
                                <vl-contact-card id="contact-card-2">
                                    <vl-infoblock slot="info" data-vl-type="contact">
                                        <h3 slot="title">Klachtenbehandelaar</h3>
                                    </vl-infoblock>
                                    <vl-properties slot="properties">
                                        <dl is="vl-properties-list">
                                            <dt is="vl-property-term">Adres</dt>
                                            <dd is="vl-property-value">Havenlaan 88<br />1000 Brussel<br />België</dd>
                                            <dt is="vl-property-term">E-mail</dt>
                                            <dd is="vl-property-value">
                                                <a is="vl-link" href="mailto:klachten.omgeving@vlaanderen.be"
                                                    >klachten.omgeving@vlaanderen.be<span
                                                        is="vl-icon"
                                                        data-vl-icon="mail"
                                                        data-vl-after
                                                    ></span
                                                ></a>
                                            </dd>
                                        </dl>
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
                                    <vl-infoblock slot="info" data-vl-type="contact">
                                        <h3 slot="title">Vlaamse ombudsdienst</h3>
                                    </vl-infoblock>
                                    <vl-properties slot="properties">
                                        <dl is="vl-properties-list">
                                            <dt is="vl-property-term">Adres</dt>
                                            <dd is="vl-property-value">Leuvenseweg 86<br />1000 Brussel<br />België</dd>
                                            <dt is="vl-property-term">Telefoon</dt>
                                            <dd is="vl-property-value">
                                                <p>
                                                    <a is="vl-link" href="tel:08 002 40 50"
                                                        >08 002 40 50<span
                                                            is="vl-icon"
                                                            data-vl-icon="phone"
                                                            data-vl-after=""
                                                        ></span
                                                    ></a>
                                                </p>
                                            </dd>
                                            <dt is="vl-property-term">E-mail</dt>
                                            <dd is="vl-property-value">
                                                <a is="vl-link" href="mailto:klachten@vlaamseombudsdienst.be"
                                                    >klachten@vlaamseombudsdienst.be<span
                                                        is="vl-icon"
                                                        data-vl-icon="mail"
                                                        data-vl-after
                                                    ></span
                                                ></a>
                                            </dd>
                                            <dt is="vl-property-term">Website</dt>
                                            <dd is="vl-property-value">
                                                <a is="vl-link" href="http://www.vlaamseombudsdienst.be" target="_blank"
                                                    >http://www.vlaamseombudsdienst.be<span
                                                        is="vl-icon"
                                                        data-vl-icon="external"
                                                        data-vl-after
                                                    ></span
                                                ></a>
                                            </dd>
                                        </dl>
                                    </vl-properties>
                                </vl-contact-card>
                            </div>
                        </div>
                    </div>
                </div>
                ${sideNavigation({ compliance })}
            </div>
        </div>
    </section>`;
};
