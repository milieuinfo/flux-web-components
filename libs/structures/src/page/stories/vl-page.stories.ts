import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from '@domg-wc/components/atom';
import { VlFooter, VlHeader } from '@domg-wc/components/compliance/next';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { VlPage } from '../vl-page.component';
import { pageArgs, pageArgTypes } from './vl-page.stories-arg';
import pageDoc from './vl-page.stories-doc.mdx';

registerWebComponents([VlPage, VlTitleComponent, VlHeader, VlFooter]);

export default {
    id: 'structures-page',
    title: 'Structures/page',
    tags: ['autodocs'],
    args: pageArgs,
    argTypes: pageArgTypes,
    parameters: {
        docs: {
            page: pageDoc,
            story: {
                inline: false,
                iframeHeight: 600,
            },
        },
        layout: 'fullscreen',
    },
} as Meta<typeof pageArgs>;

const PageTemplate = story(
    pageArgs,
    ({ center, stretch }) => html`
        <vl-page
            ?v-center=${center}
            ?v-stretch=${stretch}
            style=${center === true || stretch === true ? 'min-height: 400px' : nothing}
        >
            <vl-header-next
                slot="header"
                identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
                skip-to-content-id="main-content"
                development
                simple
            ></vl-header-next>
            <section id="main-content" slot="main" class="vl-section vl-section--alt" data-cy="page-content">
                <div class="vl-content-block">
                    <vl-title type="h1" no-space-bottom>vl-page</vl-title>
                </div>
            </section>
            <vl-footer-next
                slot="footer"
                identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b"
                development
            ></vl-footer-next>
        </vl-page>
    `
);

export const PageDefault = PageTemplate.bind({});
PageDefault.storyName = 'vl-page - default';

export const PageVCenter = PageTemplate.bind({});
PageVCenter.storyName = 'vl-page - v-center';
PageVCenter.args = {
    center: true,
};

export const PageVStretch = PageTemplate.bind({});
PageVStretch.storyName = 'vl-page - v-stretch';
PageVStretch.args = {
    stretch: true,
};
