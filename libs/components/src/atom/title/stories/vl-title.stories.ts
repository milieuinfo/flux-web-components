import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../vl-title.component';
import { TitleArgs, titleArgs, titleArgTypes } from './vl-title.stories-arg';
import titleDoc from './vl-title.stories-doc.mdx';

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
    ({ type, underline, noSpaceBottom, alt, defaultSlot, appearance }) => html`
        <vl-title type=${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h1'} underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt} appearance=${appearance}>
            ${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h1'} - ${unsafeHTML(defaultSlot)}
        </vl-title>
        <vl-title type=${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h2'} underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt} appearance=${appearance}>
            ${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h2'} - ${unsafeHTML(defaultSlot)}
        </vl-title>
        <vl-title type=${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h3'} underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt} appearance=${appearance}>
            ${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h3'} - ${unsafeHTML(defaultSlot)}
        </vl-title>
        <vl-title type=${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h4'} underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt} appearance=${appearance}>
            ${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h4'} - ${unsafeHTML(defaultSlot)}
        </vl-title>
        <vl-title type=${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h5'} underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt} appearance=${appearance}>
            ${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h5'} - ${unsafeHTML(defaultSlot)}
        </vl-title>
        <vl-title type=${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h6'} underline=${underline} no-space-bottom=${noSpaceBottom} alt=${alt} appearance=${appearance}>
            ${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h6'} - ${unsafeHTML(defaultSlot)}
        </vl-title>
    `,
);
TitleDefault.storyName = 'vl-title - default';
TitleDefault.args = {
    defaultSlot: 'Ik ben een titel',
};

export const TitleAppearance = story<TitleArgs>(
    titleArgs,
    ({ type, underline, noSpaceBottom, alt, defaultSlot, appearance }) => html`
        <vl-title type=${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h2'} appearance=${['h1','h2','h3','h4','h5','h6'].includes(appearance) ? appearance : 'h3'} underline="${underline}" no-space-bottom="${noSpaceBottom}" alt="${alt}"
            >${unsafeHTML(defaultSlot)} - ${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h2'} met ${['h1','h2','h3','h4','h5','h6'].includes(appearance) ? appearance : 'h3'}-stijl</vl-title
        >
        <vl-title type=${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h3'} appearance=${['h1','h2','h3','h4','h5','h6'].includes(appearance) ? appearance : 'h4'} underline="${underline}" no-space-bottom="${noSpaceBottom}" alt="${alt}"
            >${unsafeHTML(defaultSlot)} - ${['h1','h2','h3','h4','h5','h6'].includes(type) ? type : 'h3'} met ${['h1','h2','h3','h4','h5','h6'].includes(appearance) ? appearance : 'h4'}-stijl</vl-title
        >
    `,
);
TitleAppearance.storyName = 'vl-title - appearance';
TitleAppearance.args = {
    defaultSlot: 'Ik ben een titel',
};

export const TitleUnderline = story<TitleArgs>(
    titleArgs,
    ({ type, underline, noSpaceBottom, alt, defaultSlot, appearance }) => html`
        <vl-title
            type="${type}"
            underline=${underline}
            no-space-bottom=${noSpaceBottom}
            alt=${alt}
            appearance=${appearance}
            >${unsafeHTML(defaultSlot)} - ${type} met underline</vl-title
        >
    `,
);
TitleUnderline.storyName = 'vl-title - underline';
TitleUnderline.args = {
    ...TitleDefault.args,
    underline: true,
    type: 'h2',
};

export const TitleAlt = story<TitleArgs>(
    titleArgs,
    ({ type, underline, noSpaceBottom, alt, defaultSlot, appearance }) => html`
        <vl-title
            type="${type}"
            underline=${underline}
            no-space-bottom=${noSpaceBottom}
            alt=${alt}
            appearance=${appearance}
            >${unsafeHTML(defaultSlot)} - ${type} met alt</vl-title
        >
    `,
);
TitleAlt.storyName = 'vl-title - alt';
TitleAlt.args = {
    ...TitleDefault.args,
    alt: true,
    type: 'h2',
};

export const TitleNoSpaceBottom = story<TitleArgs>(
    titleArgs,
    ({ type, underline, noSpaceBottom, alt, defaultSlot, appearance }) => html`
        <vl-title
            type="${type}"
            underline=${underline}
            no-space-bottom=${noSpaceBottom}
            alt=${alt}
            appearance=${appearance}
            >${unsafeHTML(defaultSlot)} - ${type} met no-space-bottom</vl-title
        >
    `,
);
TitleNoSpaceBottom.storyName = 'vl-title - no-space-bottom';
TitleNoSpaceBottom.args = {
    ...TitleDefault.args,
    noSpaceBottom: true,
    type: 'h2',
};
