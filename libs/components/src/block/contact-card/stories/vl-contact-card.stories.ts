import { registerWebComponents } from '@domg-wc/common';
import { defaultArgs, defaultArgTypes, story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../infoblock/vl-infoblock.component';
import { VlPropertiesComponent } from '../../properties';
import '../vl-contact-card.component';

export default {
    id: 'components-block-contact-card',
    title: 'Components - Block/contact-card',
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: defaultArgTypes,
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
} as Meta<typeof defaultArgs>;

registerWebComponents([VlPropertiesComponent]);

export const contactCardDefault = story(
    {},
    () => html`
        <vl-contact-card>
            <vl-infoblock slot="info" title="Departement Onderwijs en Vorming" type="contact"></vl-infoblock>
            <vl-properties slot="properties">
                <vl-property>Adres</vl-property>
                <vl-property-data>
                    <div>Hendrik Consciencegebouw</div>
                    <div>Koning Albert II-laan 15</div>
                    <div>1210 Brussel</div>
                    <vl-link href="#">Routeplanner</vl-link>
                </vl-property-data>
                <vl-property>Telefoon</vl-property>
                <vl-property-data>
                    <p>
                        <vl-link href="tel:003225537202" icon-placement="after" icon="phone"> 02 553 72 02</vl-link>
                        (Onthaal Consciencegebouw)
                    </p>
                    <p>
                        <vl-link href="tel:1700" icon-placement="after" icon="phone"> 1700</vl-link>
                        (Infolijn Onderwijs)
                    </p>
                </vl-property-data>
                <vl-property>E-mail</vl-property>
                <vl-property-data>
                    <vl-link href="mailto:onderwijs.vlaanderen@vlaanderen.be" icon-placement="after" icon="mail">
                        onderwijs.vlaanderen@vlaanderen.be</vl-link
                    >
                </vl-property-data>
                <vl-property>Website</vl-property>
                <vl-property-data>
                    <vl-link
                        href="http://onderwijs.vlaanderen.be"
                        external
                        label="Ga naar onderwijs.vlaanderen.be (opent in een nieuw venster)"
                    >
                        http://onderwijs.vlaanderen.be</vl-link
                    >
                </vl-property-data>
            </vl-properties>
        </vl-contact-card>
    `,
);
contactCardDefault.storyName = 'vl-contact-card - default';
