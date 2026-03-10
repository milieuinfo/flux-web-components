import { registerWebComponents } from '@domg-wc/common';
import {
    VlFunctionalHeaderComponent
} from '@domg-wc/components/block';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { functionalHeaderWithActionButtonsHTML } from '../functionele-header.helpers';

registerWebComponents([
    VlFunctionalHeaderComponent,
]);

export default {
    title: 'Patronen/Navigatie/Functionele Header/met action buttons',
} as Meta;

export const FunctioneleHeaderMetActionButtons = story({}, () => html`${unsafeHTML(functionalHeaderWithActionButtonsHTML)}`);
FunctioneleHeaderMetActionButtons.storyName = 'functionele header - met action buttons';
