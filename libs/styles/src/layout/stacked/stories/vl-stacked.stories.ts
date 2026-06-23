import { html } from 'lit';
import vlStackedStoriesDoc from './vl-stacked.stories-doc.mdx';
import { Meta } from '@storybook/web-components-vite';

export default {
    id: 'styles-layout-stacked',
    title: 'Styles/Layout (afnemers)/stacked',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlStackedStoriesDoc,
        },
    },
} as Meta;

export const StackedLarge = ({}) => html`
    <style>
        .sb-line {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-stacked vl-stacked-large">
        <div class="sb-line"></div>
        <div class="sb-line"></div>
        <div class="sb-line"></div>
        <div class="sb-line"></div>
    </div>
`;
StackedLarge.storyName = 'vl-stacked - large';

export const StackedMedium = ({}) => html`
    <style>
        .sb-line {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-stacked vl-stacked-medium">
        <div class="sb-line"></div>
        <div class="sb-line"></div>
        <div class="sb-line"></div>
        <div class="sb-line"></div>
    </div>
`;
StackedMedium.storyName = 'vl-stacked - medium';

export const StackedSmall = ({}) => html`
    <style>
        .sb-line {
            background-color: mediumspringgreen;
            border: lightseagreen 2px solid;
        }
    </style>
    <div class="vl-stacked vl-stacked-small">
        <div class="sb-line"></div>
        <div class="sb-line"></div>
        <div class="sb-line"></div>
        <div class="sb-line"></div>
    </div>
`;
StackedSmall.storyName = 'vl-stacked - small';
