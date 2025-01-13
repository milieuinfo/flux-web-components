import { html } from 'lit-html';
import vlSpacerStoriesDoc from './vl-spacer.stories-doc.mdx';

export default {
    id: 'styles-next-layout-afnemers-spacer',
    title: 'Styles-next/Layout (afnemers)/spacer',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlSpacerStoriesDoc,
        },
    },
};

export const SpacerDefault = ({}) => html`
    <hr class="vl-separator-next vl-spacer-next">
    <hr class="vl-separator-next">
`;
SpacerDefault.storyName = 'vl-spacer - default';

export const SpacerXXSmall = ({}) => html`
    <hr class="vl-separator-next vl-spacer-next-xxsmall">
    <hr class="vl-separator-next">
`;
SpacerXXSmall.storyName = 'vl-spacer - xxsmall';

export const SpacerXSmall = ({}) => html`
    <hr class="vl-separator-next vl-spacer-next-xsmall">
    <hr class="vl-separator-next">
`;
SpacerXSmall.storyName = 'vl-spacer - xsmall';

export const SpacerSmall = ({}) => html`
    <hr class="vl-separator-next vl-spacer-next-small">
    <hr class="vl-separator-next">
`;
SpacerSmall.storyName = 'vl-spacer - small';

export const SpacerMedium = ({}) => html`
    <hr class="vl-separator-next vl-spacer-next-medium">
    <hr class="vl-separator-next">
`;
SpacerMedium.storyName = 'vl-spacer - medium';

export const SpacerLarge = ({}) => html`
    <hr class="vl-separator-next vl-spacer-next-large">
    <hr class="vl-separator-next">
`;
SpacerLarge.storyName = 'vl-spacer - large';

export const SpacerNone = ({}) => html`
    <hr class="vl-separator-next vl-spacer-next-none">
    <hr class="vl-separator-next">
`;
SpacerNone.storyName = 'vl-spacer - none';
