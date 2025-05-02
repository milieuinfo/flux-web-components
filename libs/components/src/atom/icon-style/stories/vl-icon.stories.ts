import { html } from 'lit-html';
import { vlIconStyles } from '../vl-icon.css';
import vlIconStoriesDoc from './vl-icon.stories-doc.mdx';

export default {
    id: 'components-atom-icon-style',
    title: 'Components - Atom/icon-style',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlIconStoriesDoc,
        },
    },
};

export const IconStyleDefault = ({}) => html`
    <style>
        .sb-icon {
            ${vlIconStyles};
            margin-bottom: 1rem;
        }
    </style>
    <div class="sb-icon">
        <div>icon - default</div>
        <span class="vl-icon vl-icon--paperplane">
    </div>
    <div class="sb-icon">
        <div>icon - small</div>
        <span class="vl-icon vl-icon--small vl-icon--paperplane">
    </div>
    <div class="sb-icon">
        <div>icon - large</div>
        <span class="vl-icon vl-icon--large vl-icon--paperplane">
    </div>
    <div class="sb-icon">
        <div>icon - light</div>
        <span class="vl-icon vl-icon--light vl-icon--paperplane">
    </div>
    <div class="sb-icon">
        <div>icon - right-margin</div>
        <span class="vl-icon vl-icon--right-margin vl-icon--paperplane">
    </div>
    <div class="sb-icon">
        <div>icon - left-margin</div>
        <span class="vl-icon vl-icon--left-margin vl-icon--paperplane">
    </div>
    <div class="sb-icon">
        <div>icon - clickable</div>
        <span class="vl-icon vl-icon--clickable vl-icon--paperplane">
    </div>
`;
IconStyleDefault.storyName = 'icon-style - default';
