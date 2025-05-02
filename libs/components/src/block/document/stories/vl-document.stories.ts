import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-document.component';
import { documentArgs, documentArgTypes } from './vl-document.stories-arg';
import documentDoc from './vl-document.stories-doc.mdx';

export default {
    id: 'components-block-document',
    title: 'Components - Block/document',
    tags: ['autodocs'],
    args: documentArgs,
    argTypes: documentArgTypes,
    parameters: {
        docs: {
            page: documentDoc,
        },
    },
} as Meta<typeof documentArgs>;

export const DocumentDefault = story(
    documentArgs,
    ({ href, target, type, title, metadata }) => html`
        <vl-document href=${href} target=${target}>
            <span slot="type">${type}</span>
            <span slot="title">${title}</span>
            <span slot="metadata">${metadata}</span>
        </vl-document>
    `
);
DocumentDefault.storyName = 'vl-document - default';
DocumentDefault.args = {
    type: 'PDF',
    title: 'Hubert en Jan van Eyck, Vlaamse Primitieven',
    metadata: 'PDF - 580 kB',
};
