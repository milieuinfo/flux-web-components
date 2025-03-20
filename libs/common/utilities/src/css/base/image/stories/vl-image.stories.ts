import { html } from 'lit-html';
import vlImageStoriesDoc from './vl-image.stories-doc.mdx';

export default {
    id: 'styles-next-base-intern-image',
    title: 'Styles-next/Base (intern)/image',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlImageStoriesDoc,
        },
    },
};

export const ImageDefault = ({}) => html` <img src="cat.jpeg" alt="foto van een kat" /> `;
ImageDefault.storyName = 'image - default';
