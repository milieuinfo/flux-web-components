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
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { functionalHeaderWithSearchHtml } from '../functional-header.helpers';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
]);

export default {
    title: 'Ontwerp/Functional Header/Voorbeeld Met Search',
} as Meta;

export const functionalHeaderWithSearch = story(
    {},
    () => html` <style>
            ${vlGroupStyles}
        </style>
        ${unsafeHTML(functionalHeaderWithSearchHtml)}`
);
functionalHeaderWithSearch.storyName = 'vl-functional-header - met search';
