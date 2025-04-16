import { html } from 'lit-html';
import vlStackedStoriesDoc from './vl-stacked.stories-doc.mdx';

export default {
    id: 'styles-layout-afnemers-stacked',
    title: 'Styles/Layout (afnemers)/stacked',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlStackedStoriesDoc,
        },
    },
};

export const StackedLarge = ({}) => html`
    <style>
        .vl-grid .vl-column {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-grid vl-stacked-large">
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
    </div>
`;
StackedLarge.storyName = 'vl-stacked - large';

export const StackedMedium = ({}) => html`
    <style>
        .vl-grid .vl-column {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-grid vl-stacked-medium">
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
    </div>
`;
StackedMedium.storyName = 'vl-stacked - medium';

export const StackedSmall = ({}) => html`
    <style>
        .vl-grid .vl-column {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-grid vl-stacked-small">
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
        <div class="vl-column vl-column--8 vl-column--start-3"></div>
    </div>
`;
StackedSmall.storyName = 'vl-stacked - small';
