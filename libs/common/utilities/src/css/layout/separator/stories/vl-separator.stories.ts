import { html } from 'lit-html';
import vlSteparatorStoriesDoc from './vl-separator.stories-doc.mdx';

export default {
    id: 'styles-layout-afnemers-separator',
    title: 'Styles/Layout (afnemers)/separator',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlSteparatorStoriesDoc,
        },
    },
};

export const SeparatorDefault = ({}) => html` <hr class="vl-separator" /> `;
SeparatorDefault.storyName = 'vl-separator - default';

export const SeparatorSlash = ({}) => html` <hr class="vl-separator-slash" /> `;
SeparatorSlash.storyName = 'vl-separator - slash';

export const SeparatorWave = ({}) => html` <hr class="vl-separator-wave" /> `;
SeparatorWave.storyName = 'vl-separator - wave';
