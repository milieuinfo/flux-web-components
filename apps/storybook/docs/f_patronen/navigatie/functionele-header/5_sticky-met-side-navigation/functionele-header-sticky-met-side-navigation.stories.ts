import { registerWebComponents } from '@domg-wc/common';
import {
    VlFunctionalHeaderComponent,
    VlSideNavigationComponent
} from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { functionalHeaderStickyWithSideNavigationHTML } from '../functionele-header.helpers';

registerWebComponents([
    VlFunctionalHeaderComponent,
    VlSideNavigationComponent,
    VlHeader,
]);

export default {
    title: 'Patronen/Navigatie/Functionele Header/sticky met side navigation',
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

export const FunctioneleHeaderStickyMetSideNavigation = story({}, () => html`${unsafeHTML(functionalHeaderStickyWithSideNavigationHTML)}`);
FunctioneleHeaderStickyMetSideNavigation.storyName = 'functionele header - sticky met side navigation';
