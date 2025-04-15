import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGroupStyles } from '@domg-wc/common-utilities/css';
import {
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlButtonComponent,
    VlFunctionalHeaderComponent,
} from '@domg-wc/components';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { functionalHeaderWithButtonHtml } from '../functional-header.helpers';
import functionalHeaderWithButtonDoc from './functional-header-with-button.stories-doc.mdx';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlButtonComponent,
]);

export default {
    title: 'Ontwerp/Functional Header/Voorbeeld Met Button',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: functionalHeaderWithButtonDoc,
        },
    },
} as Meta;

export const FunctionalHeaderWithButton = story(
    {},
    () => html` <style>
            ${vlGroupStyles}
        </style>
        ${unsafeHTML(functionalHeaderWithButtonHtml)}`
);
FunctionalHeaderWithButton.storyName = 'vl-functional-header - met button';
