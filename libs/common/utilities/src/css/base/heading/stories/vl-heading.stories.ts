import { formattedSourceCode } from '@domg-wc/common-storybook';
import { html } from 'lit-html';
import { vlHeading1, vlHeading2, vlHeading3, vlHeading4, vlHeading5, vlHeading6 } from '../vl-heading.css';
import vlHeadingStoriesDoc from './vl-heading.stories-doc.mdx';

export default {
    id: 'styles-next-base-intern-heading',
    title: 'Styles-next/Base (intern)/heading',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlHeadingStoriesDoc,
        },
    },
};

export const HeadingDefault = ({}) => html`
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
HeadingDefault.storyName = 'heading - default';
HeadingDefault.parameters = formattedSourceCode;
