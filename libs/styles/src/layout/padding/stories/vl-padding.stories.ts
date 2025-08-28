import { formattedSourceCode } from '@resources/utils-storybook';
import { css } from 'lit';
import { html } from 'lit-html';
import vlPaddingStoriesDoc from './vl-padding.stories-doc.mdx';
import { Meta } from '@storybook/web-components-vite';

export default {
    id: 'styles-layout-afnemers-padding',
    title: 'Styles/Layout (afnemers)/padding',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlPaddingStoriesDoc,
        },
    },
} as Meta;

const paddingCss = css`
    .sb-container {
        width: 300px;
        height: 100px;
        background-color: lightblue;
        border: rgb(152, 191, 34) 5px solid;
        padding: 15px; /* normaal specifieert de container (bvb. de vl-section) dit */
    }

    .sb-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        background-color: white;
        border: black 1px dashed;
    }
`;

export const PaddingDefault = ({}) => html`
    <style>
        ${paddingCss}
    </style>
    <div class="sb-container">
        <div class="sb-content">default</div>
    </div>
`;
PaddingDefault.storyName = 'vl-padding - default';
PaddingDefault.parameters = formattedSourceCode;

export const PaddingSmall = ({}) => html`
    <style>
        ${paddingCss}
    </style>
    <div class="sb-container vl-padding--small">
        <div class="sb-content">vl-padding--small</div>
    </div>
`;
PaddingSmall.storyName = 'vl-padding - small';
PaddingSmall.parameters = formattedSourceCode;

export const PaddingMedium = ({}) => html`
    <style>
        ${paddingCss}
    </style>
    <div class="sb-container vl-padding--medium">
        <div class="sb-content">vl-padding--medium</div>
    </div>
`;
PaddingMedium.storyName = 'vl-padding - medium';
PaddingMedium.parameters = formattedSourceCode;

export const PaddingNo = ({}) => html`
    <style>
        ${paddingCss}
    </style>
    <div class="sb-container vl-padding--no">
        <div class="sb-content">vl-padding--no</div>
    </div>
`;
PaddingNo.storyName = 'vl-padding - no';
PaddingNo.parameters = formattedSourceCode;

export const PaddingNoBottom = ({}) => html`
    <style>
        ${paddingCss}
    </style>
    <div class="sb-container vl-padding--no-bottom">
        <div class="sb-content">vl-padding--no-bottom</div>
    </div>
`;
PaddingNoBottom.storyName = 'vl-padding - no bottom';
PaddingNoBottom.parameters = formattedSourceCode;

export const PaddingNoTop = ({}) => html`
    <style>
        ${paddingCss}
    </style>
    <div class="sb-container vl-padding--no-top">
        <div class="sb-content">vl-padding--no-top</div>
    </div>
`;
PaddingNoTop.storyName = 'vl-padding - no top';
PaddingNoTop.parameters = formattedSourceCode;
