import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { vlGroupStyles } from '@domg-wc/styles';
import { VlBreadcrumbComponent, VlBreadcrumbItemComponent, VlFunctionalHeaderComponent, VlSearchComponent } from '@domg-wc/components/block';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { functionalHeaderWithSearchHtml } from '../functional-header.helpers';
import functionalHeaderWithSearchDoc from './functional-header-with-search.stories-doc.mdx';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
]);

export default {
    title: 'Ontwerp/Functional Header/Voorbeeld Met Search',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: functionalHeaderWithSearchDoc,
        },
    },
} as Meta;

export const FunctionalHeaderWithSearch = story(
    {},
    () => html` <style>
            ${vlGroupStyles}
        </style>
        ${unsafeHTML(functionalHeaderWithSearchHtml)}`
);
FunctionalHeaderWithSearch.storyName = 'vl-functional-header - met search';
