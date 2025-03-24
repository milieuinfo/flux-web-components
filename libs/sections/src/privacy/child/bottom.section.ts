import { html } from 'lit-html';

export const privacyBottomSection = () => html`
    <div class="vl-content-block-next">
        <div class="vl-grid-next vl-stacked-next-medium">
            <div class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                <vl-contact-card id="contact-card">
                    <vl-infoblock slot="info" data-vl-type="contact">
                        <h2 slot="title">DPO van Departement Omgeving</h2>
                    </vl-infoblock>
                    <vl-properties-next slot="properties">
                        <label>Adres</label>
                        <data>
                            <div>Herman Teirlinckgebouw</div>
                            <div>Havenlaan 88</div>
                            <div>1000 Brussel, België</div>
                        </data>
                        <label>E-mail</label>
                        <data>
                            <vl-link-next href="mailto:dpo@omgevingvlaanderen.be"
                                          icon-placement="after"
                                          icon="mail">
                                dpo@omgevingvlaanderen.be
                            </vl-link-next>
                        </data>
                    </vl-properties-next>
                </vl-contact-card>
            </div>
        </div>
    </div>
`;
