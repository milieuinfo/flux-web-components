import { registerWebComponents } from '@domg-wc/common';
import { VlParagraphComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { VlFunctionalHeaderComponent } from '@domg-wc/components/block';
import { VlSideNavigationLayoutComponent } from '@domg-wc/components/block/next';
import { VlFooter, VlHeader } from '@domg-wc/components/compliance/next';
import { VlPage } from '@domg-wc/structures';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { pageLayoutDefaultHtml, pageLayoutFullWidthHtml, pageLayoutSideNavigationHtml } from './pagina-opbouw.helpers';

registerWebComponents([
    VlPage,
    VlHeader,
    VlFooter,
    VlFunctionalHeaderComponent,
    VlTitleComponent,
    VlParagraphComponent,
    VlSideNavigationLayoutComponent,
]);

export default {
    title: 'Patronen/Pagina Opbouw',
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 600,
            },
        },
        layout: 'fullscreen',
    },
} as Meta;

export const PaginaOpbouwStandaard = story({}, () => html`${unsafeHTML(pageLayoutDefaultHtml)}`);
PaginaOpbouwStandaard.storyName = 'pagina opbouw - standaard layout';

export const PaginaOpbouwVolledigeBreedte = story({}, () => html`${unsafeHTML(pageLayoutFullWidthHtml)}`);
PaginaOpbouwVolledigeBreedte.storyName = 'pagina opbouw - volledige breedte';

export const PaginaOpbouwMetSideNavigation = story({}, () => html`${unsafeHTML(pageLayoutSideNavigationHtml)}`);
PaginaOpbouwMetSideNavigation.storyName = 'pagina opbouw - met side navigation';
