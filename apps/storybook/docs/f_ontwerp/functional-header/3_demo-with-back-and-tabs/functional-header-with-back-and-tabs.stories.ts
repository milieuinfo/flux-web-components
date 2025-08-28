import { registerWebComponents } from '@domg-wc/common';
import {
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
} from '@domg-wc/components/block';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { functionalHeaderWithBackAndTabsHtml } from '../functional-header.helpers';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
]);

export default {
    title: 'Ontwerp/Functional Header/Voorbeeld Met Back En Tabs',
} as Meta;

export const functionalHeaderWithBackAndTabs = story({}, () => html`${unsafeHTML(functionalHeaderWithBackAndTabsHtml)}`);
functionalHeaderWithBackAndTabs.storyName = 'vl-functional-header - met back en tabs';
