import { VlContactCardComponent, VlInfoblockComponent } from '@domg-wc/components';
import { VlPropertiesComponent } from '@domg-wc/components/next/properties';
import { VlSideNavigationReferenceComponent } from '@domg-wc/components/next/side-navigation';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { html } from 'lit';
import { AccessibilityProperties } from '../vl-accessibility.model';
import { complianceStatus } from './compliance-status.section';
import { inaccessibleContent } from './inaccessible-content.section';
import { setupStatement } from './setup-statement.section';
import { sideNavigation } from './side-navigation.section';

export const contentElements = () => [VlContactCardComponent, VlInfoblockComponent, VlPropertiesComponent, VlTitleComponent, VlSideNavigationReferenceComponent];

export const content = ({
    application,
    compliance,
    date,
    dateModified,
    evaluation,
    limitations,
}: AccessibilityProperties) => {
    return html` <section id="content" class="vl-section-next">
        <div class="vl-content-block-next">
            <div class="vl-grid-next vl-stacked-next-medium">
                <div
                    class="vl-column-next vl-column-next--8 vl-column-next--m-8 vl-column-next--s-12 vl-column-next--xs-12"
                >
                    <vl-side-navigation-reference-next>
                        <div class="vl-grid-next vl-stacked-next-large">
                            <div class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                                <p>
                                    De Vlaamse overheid streeft ernaar haar websites en mobiele applicaties toegankelijk
                                    te maken, overeenkomstig het
                                    <vl-link-next
                                        href="http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&cn=2018120705&table_name=wet&caller=list&fromtab=wet#LNK0011"
                                        external
                                        data-vl-inline
                                        >bestuursdecreet van 7 december 2018
                                    </vl-link-next>
                                    waarmee de
                                    <vl-link-next
                                        href="https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=uriserv:OJ.L_.2016.327.01.0001.01.NLD&toc=OJ:L:2016:327:TOC"
                                        external
                                        data-vl-inline
                                        >Europese Richtlijn 2016/2102
                                    </vl-link-next>
                                    is omgezet.
                                </p>
                                <br />
                                <p>Deze toegankelijkheidsverklaring is van toepassing op ${application}.</p>
                            </div>
                            ${complianceStatus({ compliance, evaluation })}
                            ${inaccessibleContent({ compliance, evaluation, limitations })}
                            ${setupStatement({ evaluation, date, dateModified })}
                            <div id="feedback-contact" class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                                <vl-title-next type="h2">Feedback en contactgegevens</vl-title-next>
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
                                    <vl-properties-next slot="properties">
                                        <label>Adres</label>
                                        <data>
                                            <div>Havenlaan 88</div>
                                            <div>1000 Brussel</div>
                                            <div>België</div>
                                        </data>
                                        <label>Telefoon</label>
                                        <data>
                                            <vl-link-next href="tel:02 553 80 11" icon-placement="after" icon="phone">
                                                02 553 80 11
                                            </vl-link-next>
                                        </data>
                                        <label>E-mail</label>
                                        <data>
                                            <vl-link-next
                                                href="mailto:omgeving@vlaanderen.be"
                                                icon-placement="after"
                                                icon="mail"
                                            >
                                                omgeving@vlaanderen.be
                                            </vl-link-next>
                                        </data>
                                    </vl-properties-next>
                                </vl-contact-card>
                            </div>
                            <div
                                id="enforcement-procedure"
                                class="vl-column-next vl-column-next--12 vl-column-next--m-12"
                            >
                                <vl-title-next type="h2">Handhavingsprocedure</vl-title-next>
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
                                    <vl-properties-next slot="properties">
                                        <label>Adres</label>
                                        <data>
                                            <div>Havenlaan 88</div>
                                            <div>1000 Brussel</div>
                                            <div>België</div>
                                        </data>
                                        <label>E-mail</label>
                                        <data>
                                            <vl-link-next
                                                href="mailto:klachten.omgeving@vlaanderen.be"
                                                icon-placement="after"
                                                icon="mail"
                                            >
                                                klachten.omgeving@vlaanderen.be
                                            </vl-link-next>
                                        </data>
                                    </vl-properties-next>
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
                                    <vl-properties-next slot="properties">
                                        <label>Adres</label>
                                        <data>
                                            <div>Leuvenseweg 86</div>
                                            <div>1000 Brussel</div>
                                            <div>België</div>
                                        </data>
                                        <label>Telefoon</label>
                                        <data>
                                            <vl-link-next href="tel:08 002 40 50" icon-placement="after" icon="phone">
                                                08 002 40 50
                                            </vl-link-next>
                                        </data>
                                        <label>E-mail</label>
                                        <data>
                                            <vl-link-next
                                                href="mailto:klachten@vlaamseombudsdienst.be"
                                                icon-placement="after"
                                                icon="mail"
                                            >
                                                klachten@vlaamseombudsdienst.be
                                            </vl-link-next>
                                        </data>
                                        <label>Website</label>
                                        <data>
                                            <vl-link-next href="http://www.vlaamseombudsdienst.be" external>
                                                http://www.vlaamseombudsdienst.be
                                            </vl-link-next>
                                        </data>
                                    </vl-properties-next>
                                </vl-contact-card>
                            </div>
                        </div>
                    </vl-side-navigation-reference-next>
                </div>
                ${sideNavigation({ compliance })}
            </div>
        </div>
    </section>`;
};
