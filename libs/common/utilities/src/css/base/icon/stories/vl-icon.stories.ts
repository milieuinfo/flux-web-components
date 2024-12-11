import { html } from 'lit-html';
import { vlIconStyles } from '../vl-icon.css';
import vlIconStoriesDoc from './vl-icon.stories-doc.mdx';

export default {
    id: 'styles-next-base-intern-icon',
    title: 'Styles-next/Base (intern)/icon',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlIconStoriesDoc,
        },
    },
};

export const IconDefault = ({}) => html`
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
IconDefault.storyName = 'icon - default';
