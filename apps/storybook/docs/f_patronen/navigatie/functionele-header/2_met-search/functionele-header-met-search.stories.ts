import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { vlGroupStyles } from '@domg-wc/styles';
import {
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
} from '@domg-wc/components/block';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { functionalHeaderWithSearchHtml } from '../functionele-header.helpers';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
]);

export default {
    title: 'Patronen/Navigatie/Functionele Header/met search',
} as Meta;

export const FunctioneleHeaderMetSearch = story(
    {},
    () => html` <style>
            ${vlGroupStyles}
        </style>
        ${unsafeHTML(functionalHeaderWithSearchHtml)}`
);
FunctioneleHeaderMetSearch.storyName = 'functionele header - met search';
