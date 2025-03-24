import { defaultArgs, defaultArgTypes, story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlPropertiesComponent } from '@domg-wc/components/next/properties';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../infoblock/vl-infoblock.component';
import '../vl-contact-card.component';

export default {
    id: 'components-contact-card',
    title: 'Components/contact-card',
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: defaultArgTypes(),
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
} as Meta<typeof defaultArgs>;

registerWebComponents([VlPropertiesComponent]);

export const contactCardDefault = story(
    {},
    () => html`
        <vl-contact-card>
            <vl-infoblock
                    slot="info"
                    data-vl-title="Departement Onderwijs en Vorming"
                    data-vl-type="contact"
            ></vl-infoblock>
            <vl-properties-next slot="properties">
                <label>Adres</label>
                <data>
                    <div>Hendrik Consciencegebouw</div>
                    <div>Koning Albert II-laan 15</div>
                    <div>1210 Brussel</div>
                    <vl-link-next href="#">Routeplanner</vl-link-next>
                </data>
                <label>Telefoon</label>
                <data>
                    <p>
                        <vl-link-next href="#" icon-placement="after" icon="phone">
                            02 553 72 02
                        </vl-link-next>
                        (Onthaal Consciencegebouw)
                    </p>
                    <p>
                        <vl-link-next href="#" icon-placement="after" icon="phone">
                            1700
                        </vl-link-next>
                        (Infolijn Onderwijs)
                    </p>
                </data>
                <label>E-mail</label>
                <data>
                    <vl-link-next href="#" icon-placement="after" icon="mail">
                        onderwijs.vlaanderen@vlaanderen.be
                    </vl-link-next>
                </data>
                <label>Website</label>
                <data>
                    <vl-link-next href="#" external>
                        http://onderwijs.vlaanderen.be
                    </vl-link-next>
                </data>
            </vl-properties-next>
        </vl-contact-card>
    `
);
contactCardDefault.storyName = 'vl-contact-card - default';
