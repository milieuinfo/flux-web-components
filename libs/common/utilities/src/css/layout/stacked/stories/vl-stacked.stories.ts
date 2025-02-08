import { html } from 'lit-html';
import vlStackedStoriesDoc from './vl-stacked.stories-doc.mdx';

export default {
    id: 'styles-next-layout-afnemers-stacked',
    title: 'Styles-next/Layout (afnemers)/stacked',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlStackedStoriesDoc,
        },
    },
};

export const StackedLarge = ({}) => html`
    <style>
        .vl-grid-next .vl-column-next {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-grid-next vl-stacked-next-large">
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
    </div>
`;
StackedLarge.storyName = 'vl-stacked - large';

export const StackedMedium = ({}) => html`
    <style>
        .vl-grid-next .vl-column-next {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-grid-next vl-stacked-next-medium">
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
    </div>
`;
StackedMedium.storyName = 'vl-stacked - medium';

export const StackedSmall = ({}) => html`
    <style>
        .vl-grid-next .vl-column-next {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-grid-next vl-stacked-next-small">
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-3"></div>
    </div>
`;
StackedSmall.storyName = 'vl-stacked - small';
