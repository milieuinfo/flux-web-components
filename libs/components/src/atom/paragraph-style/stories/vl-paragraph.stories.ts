import { formattedSourceCode } from '@resources/utils-storybook';
import { html } from 'lit-html';
import { vlParagraphStyles } from '../vl-paragraph.css';
import vlParagraphStoriesDoc from './vl-paragraph.stories-doc.mdx';

export default {
    id: 'components-atom-paragraph-style',
    title: 'Components - Atom/paragraph-style',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlParagraphStoriesDoc,
        },
    },
};

export const ParagraphStyleDefault = ({}) => html`
    <style>
        ${vlParagraphStyles}
    </style>
    <p class="cy-p-default">paragraph - default</p>
    <p class="bold cy-p-bold">paragraph - bold</p>
    <p class="introduction cy-p-introduction">paragraph - introduction</p>
    <p class="bold introduction cy-p-introduction">paragraph - bold introduction</p>
`;
ParagraphStyleDefault.storyName = 'paragraph - default';
ParagraphStyleDefault.parameters = formattedSourceCode;
