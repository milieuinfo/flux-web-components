import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlParagraphComponent } from '../vl-paragraph.component';
import { paragraphArgs, paragraphArgTypes } from './vl-paragraph.stories-arg';
import paragraphDoc from './vl-paragraph.stories-doc.mdx';

registerWebComponents([VlParagraphComponent]);

export default {
    id: 'components-paragraph',
    title: 'Components/paragraph',
    tags: ['autodocs'],
    args: paragraphArgs,
    argTypes: paragraphArgTypes,
    parameters: {
        docs: {
            page: paragraphDoc,
        },
    },
} as Meta<typeof paragraphArgs>;

const ParagraphTemplate = story(
    paragraphArgs,
    ({ bold, introduction, defaultSlot }) =>
        html` <vl-paragraph ?bold=${bold} ?introduction=${introduction}>${unsafeHTML(defaultSlot)} </vl-paragraph> `
);

export const ParagraphDefault = ParagraphTemplate.bind({});
ParagraphDefault.storyName = 'vl-paragraph - default';
ParagraphDefault.args = {
    defaultSlot: 'paragraaf - default',
};

export const ParagraphBold = ParagraphTemplate.bind({});
ParagraphBold.storyName = 'vl-paragraph - bold';
ParagraphBold.args = {
    defaultSlot: 'paragraaf - bold',
    bold: true,
};

export const ParagraphIntroduction = ParagraphTemplate.bind({});
ParagraphIntroduction.storyName = 'vl-paragraph - introduction';
ParagraphIntroduction.args = {
    defaultSlot: 'paragraaf - introduction',
    introduction: true,
};
