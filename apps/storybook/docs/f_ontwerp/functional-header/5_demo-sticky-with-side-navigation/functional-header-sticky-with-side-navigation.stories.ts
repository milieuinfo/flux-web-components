import { registerWebComponents } from '@domg-wc/common';
import {
    VlFunctionalHeaderComponent,
    VlSideNavigationComponent
} from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { functionalHeaderStickyWithSideNavigationHTML } from '../functional-header.helpers';

registerWebComponents([
    VlFunctionalHeaderComponent,
    VlSideNavigationComponent,
    VlHeader,
]);

export default {
    title: 'Ontwerp/Functional Header/Voorbeeld Met Sticky En Side Navigation',
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

export const functionalHeaderStickyWithSideNavigation = story({}, () => html`${unsafeHTML(functionalHeaderStickyWithSideNavigationHTML)}`);
functionalHeaderStickyWithSideNavigation.storyName = 'vl-functional-header - met sticky en side navigation';
