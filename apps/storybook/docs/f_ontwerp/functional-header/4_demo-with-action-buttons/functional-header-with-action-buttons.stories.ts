import { registerWebComponents } from '@domg-wc/common';
import {
    VlFunctionalHeaderComponent
} from '@domg-wc/components/block';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { functionalHeaderWithActionButtonsHTML } from '../functional-header.helpers';

registerWebComponents([
    VlFunctionalHeaderComponent,
]);

export default {
    title: 'Ontwerp/Functional Header/Voorbeeld Met Action Buttons',
} as Meta;

export const functionalHeaderWithActionButtons = story({}, () => html`${unsafeHTML(functionalHeaderWithActionButtonsHTML)}`);
functionalHeaderWithActionButtons.storyName = 'vl-functional-header - met action buttons';
