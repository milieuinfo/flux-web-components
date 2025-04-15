import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlTitleComponent } from '@domg-wc/components';
import { html } from 'lit-html';
import { classMap } from 'lit/directives/class-map.js';
import { vlContentBlockArgs, vlContentBlockArgTypes } from './vl-content-block.stories-arg';
import vlContentBlockStoriesDoc from './vl-content-block.stories-doc.mdx';

export default {
    id: 'styles-layout-afnemers-content-block',
    title: 'Styles/Layout (afnemers)/content-block',
    tags: ['autodocs'],
    args: vlContentBlockArgs,
    argTypes: vlContentBlockArgTypes,
    parameters: {
        docs: {
            page: vlContentBlockStoriesDoc,
        },
    },
};

registerWebComponents([VlTitleComponent]);

export const ContentBlockDefault = ({ contentBlock }: typeof vlContentBlockArgs) => html`
    <div
        class=${classMap({
            'vl-content-block': contentBlock,
        })}
    >
        <vl-title type="h1">Title</vl-title>
        <vl-title type="h2">Sub title</vl-title>
        <section class="vl-section">
            lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id
            est laborum lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt
            mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur
        </section>
        <vl-title type="h2">Sub title</vl-title>
        <section class="vl-section">
            lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id
            est laborum lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt
            mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur
        </section>
    </div>
`;
ContentBlockDefault.storyName = 'vl-content-block - default';
