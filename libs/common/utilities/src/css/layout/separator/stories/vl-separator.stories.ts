import { html } from 'lit-html';
import vlSteparatorStoriesDoc from './vl-separator.stories-doc.mdx';

export default {
    id: 'styles-next-layout-afnemers-separator',
    title: 'Styles-next/Layout (afnemers)/separator',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlSteparatorStoriesDoc,
        },
    },
};

export const SeparatorDefault = ({}) => html`
    <hr class="vl-separator-next">
`;
SeparatorDefault.storyName = 'vl-separator - default';

export const SeparatorSlash = ({}) => html`
    <hr class="vl-separator-slash-next">
`;
SeparatorSlash.storyName = 'vl-separator - slash';

export const SeparatorWave = ({}) => html`
    <hr class="vl-separator-wave-next">
`;
SeparatorWave.storyName = 'vl-separator - wave';
