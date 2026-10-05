import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from '@domg-wc/components/atom';
import { VlFooter, VlHeader } from '@domg-wc/components/compliance/next';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
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
        <vl-page ?v-center=${center} ?v-stretch=${stretch}>
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

// Past het recept uit de documentatie (Hoogte) toe op de keten body > #storybook-root > #root-inner > vl-page van
// Storybook. Storybook zet de body zelf op display: block, vandaar de specifiekere selector. Via beforeEach komt deze
// stijl niet in de getoonde code van de story.
const applyPageHeightRecipe = () => {
    const style = document.createElement('style');
    style.textContent = `
        html {
            height: 100%;
        }

        body.sb-show-main.sb-main-fullscreen {
            display: flex;
            flex-direction: column;
            min-height: 100%;
        }

        #storybook-root,
        #root-inner {
            display: flex;
            flex: 1;
            flex-direction: column;
        }

        vl-page {
            flex: 1;
        }
    `;
    document.head.append(style);

    return () => style.remove();
};

export const PageDefault = PageTemplate.bind({});
PageDefault.storyName = 'vl-page - default';

export const PageVCenter = PageTemplate.bind({});
PageVCenter.storyName = 'vl-page - v-center';
PageVCenter.args = {
    center: true,
};
PageVCenter.beforeEach = applyPageHeightRecipe;

export const PageVStretch = PageTemplate.bind({});
PageVStretch.storyName = 'vl-page - v-stretch';
PageVStretch.args = {
    stretch: true,
};
PageVStretch.beforeEach = applyPageHeightRecipe;
