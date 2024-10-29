import { html } from 'lit-html';

export const privacyBottomSection = () => html`
    <div is="vl-layout">
        <div is="vl-grid" data-vl-is-stacked>
            <div is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                <vl-contact-card id="contact-card">
                    <vl-infoblock slot="info" data-vl-type="contact">
                        <h2 slot="title">DPO van Departement Omgeving</h2>
                    </vl-infoblock>
                    <vl-properties slot="properties">
                        <dl is="vl-properties-list">
                            <dt is="vl-property-term">Adres</dt>
                            <dd is="vl-property-value">
                                Herman Teirlinckgebouw<br />Havenlaan 88<br />1000 Brussel, België
                            </dd>
                            <dt is="vl-property-term">E-mail</dt>
                            <dd is="vl-property-value">
                                <a is="vl-link" href="mailto:dpo@omgevingvlaanderen.be"
                                    >dpo@omgevingvlaanderen.be<span
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
        </div>
    </div>
`;
