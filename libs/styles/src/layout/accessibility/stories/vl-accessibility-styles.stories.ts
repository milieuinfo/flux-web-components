import { html } from 'lit-html';
import page from './vl-accessibility-styles.stories-doc.mdx';

export default {
    id: 'styles-layout-accessibility',
    title: 'Styles/Layout (afnemers)/accessibility',
    tags: ['autodocs'],
    parameters: {
        docs: { page },
    },
};

export const VisuallyHiddenDefault = () => html`
    <div>Deze content is zichtbaar voor de gebruiker.
        Maar deze content ...<span class="vl-visually-hidden">... is enkel toegankelijk voor screenreaders.</span>
    </div>
`;
VisuallyHiddenDefault.storyName = 'vl-visually-hidden - default';
