import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../vl-title.component';
import { TitleArgs, titleArgs, titleArgTypes } from './vl-title.stories-arg';
import titleDoc from './vl-title.stories-doc.mdx';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
    id: 'components-atom-title',
    title: 'Components - Atom/title',
    tags: ['autodocs'],
    args: titleArgs,
    argTypes: titleArgTypes,
    parameters: {
        docs: {
            page: titleDoc,
        },
    },
} as Meta<TitleArgs>;

export const TitleDefault = story<TitleArgs>(
    titleArgs,
    ({ underline, noSpaceBottom, alt, defaultSlot }) =>
        html`
            <vl-title type="h1" underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt}>
                h1 - ${unsafeHTML(defaultSlot)}
            </vl-title>
            <vl-title type="h2" underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt}>
                h2 - ${unsafeHTML(defaultSlot)}
            </vl-title>
            <vl-title type="h3" underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt}>
                h3 - ${unsafeHTML(defaultSlot)}
            </vl-title>
            <vl-title type="h4" underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt}>
                h4 - ${unsafeHTML(defaultSlot)}
            </vl-title>
            <vl-title type="h5" underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt}>
                h5 - ${unsafeHTML(defaultSlot)}
            </vl-title>
            <vl-title type="h6" underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt}>
                h6 - ${unsafeHTML(defaultSlot)}
            </vl-title>
        `
);
TitleDefault.storyName = 'vl-title - default';
TitleDefault.args = {
    defaultSlot: 'Ik ben een titel',
};
