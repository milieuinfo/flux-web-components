import { html } from 'lit-html';
import vlSpacerStoriesDoc from './vl-spacer.stories-doc.mdx';
import { Meta } from '@storybook/web-components-vite';

export default {
    id: 'styles-layout-spacer',
    title: 'Styles/Layout (afnemers)/spacer',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlSpacerStoriesDoc,
        },
    },
} as Meta;

export const SpacerDefault = ({}) => html`
    <hr class="vl-separator vl-spacer" />
    <hr class="vl-separator" />
`;
SpacerDefault.storyName = 'vl-spacer - default';

export const SpacerXXSmall = ({}) => html`
    <hr class="vl-separator vl-spacer-xxsmall" />
    <hr class="vl-separator" />
`;
SpacerXXSmall.storyName = 'vl-spacer - xxsmall';

export const SpacerXSmall = ({}) => html`
    <hr class="vl-separator vl-spacer-xsmall" />
    <hr class="vl-separator" />
`;
SpacerXSmall.storyName = 'vl-spacer - xsmall';

export const SpacerSmall = ({}) => html`
    <hr class="vl-separator vl-spacer-small" />
    <hr class="vl-separator" />
`;
SpacerSmall.storyName = 'vl-spacer - small';

export const SpacerMedium = ({}) => html`
    <hr class="vl-separator vl-spacer-medium" />
    <hr class="vl-separator" />
`;
SpacerMedium.storyName = 'vl-spacer - medium';

export const SpacerLarge = ({}) => html`
    <hr class="vl-separator vl-spacer-large" />
    <hr class="vl-separator" />
`;
SpacerLarge.storyName = 'vl-spacer - large';

export const SpacerNone = ({}) => html`
    <hr class="vl-separator vl-spacer-none" />
    <hr class="vl-separator" />
`;
SpacerNone.storyName = 'vl-spacer - none';
