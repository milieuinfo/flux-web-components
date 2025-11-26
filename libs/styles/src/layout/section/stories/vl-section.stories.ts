import { formattedSourceCode } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { css } from 'lit';
import { html } from 'lit-html';
import vlSectionStoriesDoc from './vl-section.stories-doc.mdx';

export default {
    id: 'styles-layout-section',
    title: 'Styles/Layout (afnemers)/section',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlSectionStoriesDoc,
        },
    },
} as Meta;

const sectionCss = css`
    .vl-section {
        p {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
        }
    }
`;

export const SectionDefault = ({}) => html`
    <style>
        ${sectionCss}
    </style>
    <section class="vl-section vl-section--alt">
        <p>vl-section vl-section--alt</p>
    </section>
    <section class="vl-section vl-section--bordered">
        <p>vl-section vl-section--bordered</p>
    </section>
    <section class="vl-section vl-section--bordered vl-section--small">
        <p>vl-section vl-section--bordered vl-section--small</p>
    </section>
    <section class="vl-section vl-section--bordered">
        <p>vl-section vl-section--bordered</p>
    </section>
`;
SectionDefault.storyName = 'vl-section - default';
SectionDefault.parameters = formattedSourceCode;

export const SectionLightBlue = ({}) => html`
    <style>
        ${sectionCss} .sb-light-blue {
            &.vl-section {
                --vl-section--alt-bg: lightblue;
                --vl-section--border: lightblue;
            }
        }
    </style>
    <section class="sb-light-blue vl-section vl-section--alt">
        <p>vl-section vl-section--alt</p>
    </section>
    <section class="sb-light-blue vl-section vl-section--bordered">
        <p>vl-section vl-section--bordered</p>
    </section>
    <section class="sb-light-blue vl-section vl-section--bordered vl-section--small">
        <p>vl-section vl-section--bordered vl-section--small</p>
    </section>
    <section class="sb-light-blue vl-section vl-section--bordered">
        <p>vl-section vl-section--bordered</p>
    </section>
`;
SectionLightBlue.storyName = 'vl-section - light blue';
SectionLightBlue.parameters = formattedSourceCode;

export const SectionOverlap = ({}) => html`
    <style>
        ${sectionCss}
    </style>
    <section class="vl-section vl-section--overlap">
        <p class="vl-content-block">vl-content-block</p>
        <p>vl-section vl-section--overlap</p>
    </section>
    <section class="vl-section vl-section--bordered">
        <p>vl-section vl-section--bordered</p>
    </section>
    <section class="vl-section vl-section--bordered">
        <p>vl-section vl-section--bordered</p>
    </section>
    <section class="vl-section vl-section--bordered">
        <p>vl-section vl-section--bordered</p>
    </section>
`;
SectionOverlap.storyName = 'vl-section - overlap';
SectionOverlap.parameters = formattedSourceCode;
