import { formattedSourceCode } from '@domg-wc/common-storybook';
import { html } from 'lit-html';
import { vlIconStyles } from '../../icon/vl-icon.css';
import { vlLinkStyles } from '../vl-link.css';
import vlLinkStoriesDoc from './vl-link.stories-doc.mdx';

export default {
    id: 'styles-next-base-intern-link',
    title: 'Styles-next/Base (intern)/link',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlLinkStoriesDoc,
        },
    },
};

export const LinkDefault = ({}) => html`
    <style>
        .sb-link {
            ${vlLinkStyles()};
            ${vlIconStyles};
            margin-bottom: 1rem;
        }
    </style>
    <div class="sb-link">
        <a>link - default</a>
    </div>
    <div class="sb-link">
        <a class="bold">link - bold</a>
    </div>
    <div class="sb-link">
        <a class="small">link - small</a>
    </div>
    <div class="sb-link">
        <a class="large">link - large</a>
    </div>
    <div class="sb-link">
        <a class="error">link - error</a>
    </div>
    <div class="sb-link">
        <a
            ><span class="vl-icon vl-icon--before vl-icon--bike"></span>link - fiets<span
                class="vl-icon vl-icon--after vl-icon--bike"
            ></span
        ></a>
    </div>
`;
LinkDefault.storyName = 'link - default';
LinkDefault.parameters = formattedSourceCode;
