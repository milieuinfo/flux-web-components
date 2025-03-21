import { formattedSourceCode } from '@domg-wc/common-storybook';
import { css } from 'lit';
import { html } from 'lit-html';
import vlSectionStoriesDoc from './vl-section.stories-doc.mdx';

export default {
    id: 'styles-next-layout-afnemers-section',
    title: 'Styles-next/Layout (afnemers)/section',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlSectionStoriesDoc,
        },
    },
};

const sectionCss = css`
    .vl-section-next {
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
    <section class="vl-section-next vl-section-next--alt">
        <p>vl-section-next vl-section-next--alt</p>
    </section>
    <section class="vl-section-next vl-section-next--bordered">
        <p>vl-section-next vl-section-next--bordered</p>
    </section>
    <section class="vl-section-next vl-section-next--bordered vl-section-next--small">
        <p>vl-section-next vl-section-next--bordered vl-section-next--small</p>
    </section>
    <section class="vl-section-next vl-section-next--bordered">
        <p>vl-section-next vl-section-next--bordered</p>
    </section>
`;
SectionDefault.storyName = 'vl-section - default';
SectionDefault.parameters = formattedSourceCode;

export const SectionLightBlue = ({}) => html`
    <style>
        ${sectionCss} .sb-light-blue {
            &.vl-section-next {
                --vl-section--alt-bg: lightblue;
                --vl-section--border: lightblue;
            }
        }
    </style>
    <section class="sb-light-blue vl-section-next vl-section-next--alt">
        <p>vl-section-next vl-section-next--alt</p>
    </section>
    <section class="sb-light-blue vl-section-next vl-section-next--bordered">
        <p>vl-section-next vl-section-next--bordered</p>
    </section>
    <section class="sb-light-blue vl-section-next vl-section-next--bordered vl-section-next--small">
        <p>vl-section-next vl-section-next--bordered vl-section-next--small</p>
    </section>
    <section class="sb-light-blue vl-section-next vl-section-next--bordered">
        <p>vl-section-next vl-section-next--bordered</p>
    </section>
`;
SectionLightBlue.storyName = 'vl-section - light blue';
SectionLightBlue.parameters = formattedSourceCode;

export const SectionOverlap = ({}) => html`
    <style>
        ${sectionCss} .sb-overlap {
            &.vl-section-next {
                --vl-section--alt-bg: lightblue;
                --vl-section--border: lightblue;
            }
        }
    </style>
    <section class="sb-overlap vl-section-next vl-section-next--overlap">
        <p class="vl-content-block-next">vl-content-block-next</p>
        <p>vl-section-next vl-section-next--overlap</p>
    </section>
    <section class="sb-overlap vl-section-next vl-section-next--bordered">
        <p>vl-section-next vl-section-next--bordered</p>
    </section>
    <section class="sb-overlap vl-section-next vl-section-next--bordered">
        <p>vl-section-next vl-section-next--bordered</p>
    </section>
    <section class="sb-overlap vl-section-next vl-section-next--bordered">
        <p>vl-section-next vl-section-next--bordered</p>
    </section>
`;
SectionOverlap.storyName = 'vl-section - overlap';
SectionOverlap.parameters = formattedSourceCode;
