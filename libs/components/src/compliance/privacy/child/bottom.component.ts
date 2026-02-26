import { html } from 'lit';

export const privacyBottomSection = () => html`
    <div class="vl-content-block">
        <div class="vl-grid vl-stacked-medium">
            <div class="vl-column vl-column--12 vl-column--m-12">
                <vl-contact-card id="contact-card">
                    <vl-infoblock slot="info" type="contact">
                        <vl-title
                            type="h2"
                            slot="title"
                            custom-css="h2 {font-size: var(--vl-font-size); margin-top: 1rem; }"
                            >DPO van Departement Omgeving</vl-title
                        >
                    </vl-infoblock>
                    <vl-properties slot="properties" custom-css="dl:has(.item) { margin-top: 0.8rem; display: block; }">
                        <label>Adres</label>
                        <data>
                            <address aria-label="Adresgegevens">
                                Herman Teirlinckgebouw<br />
                                Havenlaan 88<br />
                                1000 Brussel, België
                            </address>
                        </data>
                        <label>E-mail</label>
                        <data>
                            <vl-link
                                href="mailto:dpo@omgevingvlaanderen.be"
                                icon-placement="after"
                                icon="mail"
                                label="Mail naar dpo@omgevingvlaanderen.be"
                            >
                                dpo@omgevingvlaanderen.be
                            </vl-link>
                        </data>
                    </vl-properties>
                </vl-contact-card>
            </div>
        </div>
    </div>
`;
