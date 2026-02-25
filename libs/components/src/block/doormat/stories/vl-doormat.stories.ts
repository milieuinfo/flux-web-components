import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { VlDoormatComponent } from '../vl-doormat.component';
import { registerWebComponents } from '@domg-wc/common';
import { doormatArgTypes, doormatArgs } from './vl-doormat.stories-arg';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import doormatDoc from './vl-doormat.stories-doc.mdx';

registerWebComponents([VlDoormatComponent]);

export default {
    id: 'components-block-doormat',
    title: 'Components - Block/doormat',
    tags: ['autodocs'],
    args: doormatArgs,
    argTypes: doormatArgTypes,
    parameters: {
        docs: {
            page: doormatDoc,
        },
    },
} as Meta<typeof doormatArgs>;

const DoormatTemplate = story(
    doormatArgs,
    ({ href, linkLabel, external, alt, imageSrc, imageAlt, imageHeight, imageWidth, graphic, textSlot, titleSlot }) =>
        html`
            <div class="story--fixed-width">
                <vl-doormat
                    href=${href}
                    link-label=${linkLabel}
                    ?external=${external}
                    ?alt=${alt}
                    image-src=${imageSrc}
                    image-alt=${imageAlt}
                    image-height=${imageHeight}
                    image-width=${imageWidth}
                    ?graphic=${graphic}
                >
                    <span slot="title">${unsafeHTML(titleSlot)}</span>
                    <span slot="text">${unsafeHTML(textSlot)}</span>
                </vl-doormat>
            </div>
        `
);

export const DoormatDefault = DoormatTemplate.bind({});
DoormatDefault.storyName = 'vl-doormat - default';
DoormatDefault.args = {
    href: 'https://www.vlaanderen.be/bouwen-wonen-en-energie',
    titleSlot: 'Bouwen, wonen en energie',
    textSlot: `De overheid zet zich in om betaalbaar en kwaliteitsvol wonen voor iedereen beschikbaar te
                maken. Ze biedt sociale woningen aan, geeft premies aan wie zijn woning verbouwt en
                energiezuinig maakt en zoekt oplossingen om de stijging van de vastgoedprijzen onder controle te
                houden.`,
};

export const DoormatExternal = DoormatTemplate.bind({});
DoormatExternal.storyName = 'vl-doormat - external';
DoormatExternal.args = {
    ...DoormatDefault.args,
    external: true,
    linkLabel: 'Bouwen, wonen en energie - opent in nieuw venster',
};

export const DoormatAlt = DoormatTemplate.bind({});
DoormatAlt.storyName = 'vl-doormat - alt';
DoormatAlt.args = {
    ...DoormatDefault.args,
    alt: true,
};

export const DoormatImage = DoormatTemplate.bind({});
DoormatImage.storyName = 'vl-doormat - image';
DoormatImage.args = {
    ...DoormatDefault.args,
    imageSrc: 'https://picsum.photos/100/150?image=1048',
    imageAlt: 'Bouwen in Brussel',
};

export const DoormatGraphic = DoormatTemplate.bind({});
DoormatGraphic.storyName = 'vl-doormat - graphic';
DoormatGraphic.args = {
    ...DoormatDefault.args,
    imageSrc: 'https://picsum.photos/1600/400?image=1048',
    imageAlt: 'Bouwen in Brussel',
    graphic: true,
};
