import { formattedSourceCode } from '@resources/utils-storybook';
import { html } from 'lit';
import { vlHeading1, vlHeading2, vlHeading3, vlHeading4, vlHeading5, vlHeading6 } from '../vl-heading-style.css';
import vlHeadingStoriesDoc from './vl-heading-style.stories-doc.mdx';
import { Meta } from '@storybook/web-components-vite';

export default {
    id: 'components-atom-heading-style',
    title: 'Components - Atom/heading-style (intern)',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlHeadingStoriesDoc,
        },
    },
} as Meta;

export const HeadingStyleDefault = ({}) => html`
    <style>
        .sb-heading-1 {
            ${vlHeading1}
        }

        .sb-heading-2 {
            ${vlHeading2}
        }

        .sb-heading-3 {
            ${vlHeading3}
        }

        .sb-heading-4 {
            ${vlHeading4}
        }

        .sb-heading-5 {
            ${vlHeading5}
        }

        .sb-heading-6 {
            ${vlHeading6}
        }
    </style>
    <div class="sb-heading-1">Heading van grootte 1</div>
    <div class="sb-heading-2">Heading van grootte 2</div>
    <div class="sb-heading-3">Heading van grootte 3</div>
    <div class="sb-heading-4">Heading van grootte 4</div>
    <div class="sb-heading-5">Heading van grootte 5</div>
    <div class="sb-heading-6">Heading van grootte 6</div>
`;
HeadingStyleDefault.storyName = 'heading-style - default';
HeadingStyleDefault.parameters = formattedSourceCode;
