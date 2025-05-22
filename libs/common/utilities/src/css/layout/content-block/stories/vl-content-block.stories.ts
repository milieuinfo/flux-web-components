import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { classMap } from 'lit/directives/class-map.js';
import { vlContentBlockArgs, vlContentBlockArgTypes } from './vl-content-block.stories-arg';
import vlContentBlockStoriesDoc from './vl-content-block.stories-doc.mdx';

export default {
    id: 'styles-next-layout-afnemers-content-block',
    title: 'Styles-next/Layout (afnemers)/content-block',
    tags: ['autodocs'],
    args: vlContentBlockArgs,
    argTypes: vlContentBlockArgTypes,
    parameters: {
        docs: {
            page: vlContentBlockStoriesDoc,
        },
    },
} as Meta<typeof vlContentBlockArgs>;

registerWebComponents([VlTitleComponent]);

const Template = story(
    vlContentBlockArgs,
    ({ contentBlock, contentBlockFullWidth }: typeof vlContentBlockArgs) => html`
        <div
            class="${classMap({
                'vl-content-block-next': contentBlock === true || contentBlockFullWidth === true,
                'vl-content-block-next--full-width': contentBlockFullWidth === true,
            })}"
        >
            <vl-title-next type="h1">Title</vl-title-next>
            <vl-title-next type="h2">Sub title</vl-title-next>
            <section class="vl-section-next">
                lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt
                mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in
                culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipisicing
                elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
            </section>
            <vl-title-next type="h2">Sub title</vl-title-next>
            <section class="vl-section-next">
                lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt
                mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in
                culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipisicing
                elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
            </section>
        </div>
    `,
);

export const ContentBlockDefault = Template.bind({});
ContentBlockDefault.storyName = 'vl-content-block - default';
ContentBlockDefault.args = {
    contentBlock: true,
    contentBlockFullWidth: false,
};

export const ContentBlockFullWidth = Template.bind({});
ContentBlockFullWidth.storyName = 'vl-content-block - full width';
ContentBlockFullWidth.args = {
    contentBlock: true,
    contentBlockFullWidth: true,
};
