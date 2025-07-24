import { registerWebComponents } from '@domg-wc/common';
import {
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
} from '@domg-wc/components/block';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { functionalHeaderWithBackAndTabs } from '../functional-header.helpers';
import doc from './functional-header-with-back-and-tabs.stories-doc.mdx';

registerWebComponents([
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
]);

export default {
    title: 'Ontwerp/Functional Header/Voorbeeld Met Back En Tabs',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: doc,
        },
    },
} as Meta;

export const FunctionalHeaderWithBackAndTabs = story({}, () => html`${unsafeHTML(functionalHeaderWithBackAndTabs)}`);
FunctionalHeaderWithBackAndTabs.storyName = 'vl-functional-header - met back en tabs';