import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { VlContentHeaderComponent } from '../../content-header/vl-content-header.component';
import '../vl-template.component';
import { VlTitleComponent } from '../../../atom/title';
import { templateArgs, templateArgTypes } from './vl-template.stories-arg';

registerWebComponents([VlContentHeaderComponent, VlTitleComponent]);

export default {
    id: 'components-block-template',
    title: 'Components - Block/template',
    tags: ['autodocs'],
    args: templateArgs,
    argTypes: templateArgTypes,
} as Meta<typeof templateArgs>;

const version = '1.2.3'; // TODO uit de package.json halen, om een json te kunnen importeren moet je echter wat config wijzigen

const mainHtml = html`
    <vl-content-header>
        <img
            slot="image"
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            srcset="
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80   400w,
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80   700w,
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80   800w,
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80 1000w,
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80 1300w,
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80 1400w,
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80 1600w,
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&q=80 1900w,
                https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80 2000w
            "
        />
        <a slot="context-link" href="https://webcomponenten.omgeving.vlaanderen.be/storybook/">flux-webcomponents</a>
        <a slot="title-link" href="https://webcomponenten.omgeving.vlaanderen.be/storybook/">${version}</a>
    </vl-content-header>
    <section data-cy="template-content" class="vl-grid">
        <div class="vl-content-block">
            <div id="grid" class="vl-grid vl-stacked-medium" slot="main">
                <vl-title type="h1" class="vl-column vl-column--12">vl-template</vl-title>
            </div>
        </div>
    </section>
`;

const bodySimulation = (component: any, withClass: boolean) => html` <div class=${withClass ? 'vl-u-sticky-gf' : ''}>
    ${component}
</div>`;

export const templateDefault = ({ center, stretch }: typeof templateArgs) =>
    bodySimulation(
        html`
            <vl-template ?v-center=${center} ?v-stretch=${stretch}>
                <vl-header slot="header" identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb" development></vl-header>
                <div slot="main">${mainHtml}</div>
                <vl-footer slot="footer" identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b" development></vl-footer>
            </vl-template>
        `,
        true
    );
templateDefault.storyName = 'vl-template - default';
