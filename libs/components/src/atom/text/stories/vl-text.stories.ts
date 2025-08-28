import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlTextComponent } from '../vl-text.component';
import { textArgs, textArgTypes } from './vl-text.stories-arg';
import textDoc from './vl-text.stories-doc.mdx';

registerWebComponents([VlTextComponent]);

export default {
    id: 'components-atom-text',
    title: 'Components - Atom/text',
    tags: ['autodocs'],
    args: textArgs,
    argTypes: textArgTypes,
    parameters: {
        docs: {
            page: textDoc,
        },
    },
} as Meta<typeof textArgs>;

const TextTemplate = story(
    textArgs,
    ({ bold, success, warning, error, italic, underline, annotation, small, defaultSlot }) => html`
        <vl-text
            ?bold=${bold}
            ?success=${success}
            ?warning=${warning}
            ?error=${error}
            ?italic=${italic}
            ?underline=${underline}
            ?annotation=${annotation}
            ?small=${small}
        >
            ${unsafeHTML(defaultSlot)}
        </vl-text>
    `
);

export const TextDefault = TextTemplate.bind({});
TextDefault.storyName = 'vl-text - default';
TextDefault.args = {
    defaultSlot: 'tekst - default',
};

export const TextBold = TextTemplate.bind({});
TextBold.storyName = 'vl-text - bold';
TextBold.args = {
    defaultSlot: 'text - bold',
    bold: true,
};

export const TextItalic = TextTemplate.bind({});
TextItalic.storyName = 'vl-text - italic';
TextItalic.args = {
    defaultSlot: 'text - italic',
    italic: true,
};

export const TextUnderline = TextTemplate.bind({});
TextUnderline.storyName = 'vl-text - underline';
TextUnderline.args = {
    defaultSlot: 'text - underline',
    underline: true,
};

export const TextSuccess = TextTemplate.bind({});
TextSuccess.storyName = 'vl-text - success';
TextSuccess.args = {
    defaultSlot: 'text - success',
    success: true,
};

export const TextWarning = TextTemplate.bind({});
TextWarning.storyName = 'vl-text - warning';
TextWarning.args = {
    defaultSlot: 'text - warning',
    warning: true,
};

export const TextError = TextTemplate.bind({});
TextError.storyName = 'vl-text - error';
TextError.args = {
    defaultSlot: 'text - error',
    error: true,
};

export const TextAnnotation = TextTemplate.bind({});
TextAnnotation.storyName = 'vl-text - annotation';
TextAnnotation.args = {
    defaultSlot: 'text - annotation',
    annotation: true,
};

export const TextSmall = TextTemplate.bind({});
TextSmall.storyName = 'vl-text - small';
TextSmall.args = {
    defaultSlot: 'text - small',
    small: true,
};
