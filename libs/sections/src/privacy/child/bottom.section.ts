import { html } from 'lit-html';

export const privacyBottomSection = () => html`
    <div class="vl-content-block-next">
        <div class="vl-grid-next vl-stacked-next-medium">
            <div class="vl-column-next vl-column-next--12 vl-column-next--m-12">
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
                                <vl-link-next href="mailto:dpo@omgevingvlaanderen.be" icon-placement="after" icon="mail"
                                    >dpo@omgevingvlaanderen.be
                                </vl-link-next>
                            </dd>
                        </dl>
                    </vl-properties>
                </vl-contact-card>
            </div>
        </div>
    </div>
`;
