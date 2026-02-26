import { registerWebComponents } from '@domg-wc/common';
import { VlPageLayoutExample } from '@domg-wc/integrations/page-layout';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';

registerWebComponents([VlPageLayoutExample]);

export default {
    title: 'Ontwerp/Pagina Layout/Voorbeeld',
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [(story: () => unknown) => html` <div style="min-height: calc(100vh - 172px);">${story()}</div>`],
} as Meta;

export const StandaardLayout = () => html`<vl-page-layout-example></vl-page-layout-example>`;

export const VolledigeBreedte = () => html`<vl-page-layout-example full-width></vl-page-layout-example>`;