import { registerWebComponents } from '@domg-wc/common';
import {
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
} from '@domg-wc/components/block';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { functionalHeaderWithBackAndTabsHtml } from '../functionele-header.helpers';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
]);

export default {
    title: 'Patronen/Navigatie/Functionele Header/met back en tabs',
} as Meta;

export const FunctioneleHeaderMetBackEnTabs = story({}, () => html`${unsafeHTML(functionalHeaderWithBackAndTabsHtml)}`);
FunctioneleHeaderMetBackEnTabs.storyName = 'functionele header - met back en tabs';
