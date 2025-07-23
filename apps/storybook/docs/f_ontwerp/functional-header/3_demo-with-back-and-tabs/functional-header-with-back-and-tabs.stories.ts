import { registerWebComponents } from '@domg-wc/common';
import {
    VlBreadcrumbComponent,
    VlBreadcrumbItemComponent,
    VlFunctionalHeaderComponent,
    VlSearchComponent,
} from '@domg-wc/components/block';
import { story } from '@resources/utils-storybook';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
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


export const FunctionalHeaderWithBackAndTabs = story({}, () => html`
        <vl-functional-header
            title="School- en studietoelagen"
            custom-css="#sub-title{ vertical-align: text-top;}"
        >
            <vl-tabs
                slot="sub-title"
                disable-links
                within-functional-header
                active-tab="trein"
                @change=${(event: CustomEvent) => action('change')(event.detail)}
                custom-css=":host(.vl-tabs--within-functional-header) .vl-tab__link { padding-top: 0;}"
            >
                <vl-tabs-pane id="trein" title="Trein"></vl-tabs-pane>
                <vl-tabs-pane id="metro" title="Metro, tram en bus"></vl-tabs-pane>
                <vl-tabs-pane id="fiets" title="Fiets"></vl-tabs-pane>
            </vl-tabs>
        </vl-functional-header>`
);
FunctionalHeaderWithBackAndTabs.storyName = 'vl-functional-header - met back en tabs';