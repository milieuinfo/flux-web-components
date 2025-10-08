import { formattedSourceCode } from '@resources/utils-storybook';
import { html } from 'lit-html';
import { vlIconStyles } from '../../icon-style/vl-icon-style.css';
import { vlLinkStyles } from '../vl-link-style.css';
import vlLinkStoriesDoc from './vl-link-style.stories-doc.mdx';
import { Meta } from '@storybook/web-components-vite';

export default {
    id: 'components-atom-link-style',
    title: 'Components - Atom/link-style (intern)',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlLinkStoriesDoc,
        },
    },
} as Meta;

export const LinkStyleDefault = ({}) => html`
    <style>
        ${vlLinkStyles()}
        .sb-link {
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
LinkStyleDefault.storyName = 'link-style - default';
LinkStyleDefault.parameters = formattedSourceCode;
