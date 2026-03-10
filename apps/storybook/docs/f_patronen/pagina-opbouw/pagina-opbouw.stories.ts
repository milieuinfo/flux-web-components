import { registerWebComponents } from '@domg-wc/common';
import { VlPageLayoutExample } from '@domg-wc/integrations/page-layout';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';

registerWebComponents([VlPageLayoutExample]);

export default {
    title: 'Patronen/Pagina Opbouw',
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [(story: () => unknown) => html` <div style="min-height: calc(100vh - 172px);">${story()}</div>`],
} as Meta;

export const PaginaOpbouwStandaard = () => html`<vl-page-layout-example></vl-page-layout-example>`;
PaginaOpbouwStandaard.storyName = 'pagina opbouw - standaard layout';

export const PaginaOpbouwVolledigeBreedte = () => html`<vl-page-layout-example full-width></vl-page-layout-example>`;
PaginaOpbouwVolledigeBreedte.storyName = 'pagina opbouw - volledige breedte';