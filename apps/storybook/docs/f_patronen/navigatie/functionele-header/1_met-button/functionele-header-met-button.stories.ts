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
import { functionalHeaderWithButtonHtml } from '../functionele-header.helpers';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlButtonComponent,
]);

export default {
    title: 'Patronen/Navigatie/Functionele Header/met button',
} as Meta;

export const FunctioneleHeaderMetButton = story(
    {},
    () => html` <style>
            ${vlGroupStyles}
        </style>
        ${unsafeHTML(functionalHeaderWithButtonHtml)}`
);
FunctioneleHeaderMetButton.storyName = 'functionele header - met button';
