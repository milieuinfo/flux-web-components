import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlPageLayoutExample } from '@domg-wc/integration/page-layout';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import pageLayoutDoc from './page-layout.stories-doc.mdx';

registerWebComponents([VlPageLayoutExample]);

export default {
    title: 'Ontwerp/Pagina Layout/Voorbeeld',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: pageLayoutDoc,
        },
    },
    decorators: [(story: () => unknown) => html` <div style="min-height: calc(100vh - 172px);">${story()}</div>`],
} as Meta;

export const StandaardLayout = () => html`<vl-page-layout-example></vl-page-layout-example>`;

export const VolledigeBreedte = () => html`<vl-page-layout-example full-width></vl-page-layout-example>`;
