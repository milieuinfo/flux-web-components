import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { vlGroupStyles } from '@domg-wc/styles';
import {
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
} from '@domg-wc/components/block';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { functionalHeaderWithButtonHtml } from '../functional-header.helpers';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlButtonComponent,
]);

export default {
    title: 'Ontwerp/Functional Header/Voorbeeld Met Button',
} as Meta;

export const functionalHeaderWithButton = story(
    {},
    () => html` <style>
            ${vlGroupStyles}
        </style>
        ${unsafeHTML(functionalHeaderWithButtonHtml)}`
);
functionalHeaderWithButton.storyName = 'vl-functional-header - met button';
