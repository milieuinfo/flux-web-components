import { formattedSourceCode } from '@resources/utils-storybook';
import { css } from 'lit';
import { html } from 'lit-html';
import vlMarginStoriesDoc from './vl-margin.stories-doc.mdx';

export default {
    id: 'styles-layout-afnemers-margin',
    title: 'Styles/Layout (afnemers)/margin',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlMarginStoriesDoc,
        },
    },
};

const marginCss = css`
    .sb-container {
        width: 300px;
        background-color: lightblue;
        border: black 1px dashed;
    }

    .sb-content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        margin: 15px; /* normaal specifieert de container (bvb. de vl-section) dit */
        height: 50px;
        background-color: white;
        border: rgb(152, 191, 34) 5px solid;
    }
`;

export const MarginDefault = ({}) => html`
    <style>
        ${marginCss}
    </style>
    <div class="sb-container">
        <div class="sb-content">default</div>
    </div>
`;
MarginDefault.storyName = 'vl-margin - default';
MarginDefault.parameters = formattedSourceCode;

export const MarginSmall = ({}) => html`
    <style>
        ${marginCss}
    </style>
    <div class="sb-container">
        <div class="sb-content vl-margin--small">vl-margin--small</div>
    </div>
`;
MarginSmall.storyName = 'vl-margin - small';
MarginSmall.parameters = formattedSourceCode;

export const MarginMedium = ({}) => html`
    <style>
        ${marginCss}
    </style>
    <div class="sb-container">
        <div class="sb-content vl-margin--medium">vl-margin--medium</div>
    </div>
`;
MarginMedium.storyName = 'vl-margin - medium';
MarginMedium.parameters = formattedSourceCode;

export const MarginNo = ({}) => html`
    <style>
        ${marginCss}
    </style>
    <div class="sb-container">
        <div class="sb-content vl-margin--no">vl-margin--no</div>
    </div>
`;
MarginNo.storyName = 'vl-margin - no';
MarginNo.parameters = formattedSourceCode;

export const MarginNoBottom = ({}) => html`
    <style>
        ${marginCss}
    </style>
    <div class="sb-container">
        <div class="sb-content vl-margin--no-bottom">vl-margin--no-bottom</div>
    </div>
`;
MarginNoBottom.storyName = 'vl-margin - no bottom';
MarginNoBottom.parameters = formattedSourceCode;

export const MarginNoTop = ({}) => html`
    <style>
        ${marginCss}
    </style>
    <div class="sb-container">
        <div class="sb-content vl-margin--no-top">vl-margin--no-top</div>
    </div>
`;
MarginNoTop.storyName = 'vl-margin - no top';
MarginNoTop.parameters = formattedSourceCode;
