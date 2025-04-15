import { html } from 'lit-html';
import vlVarStoriesDoc from './vl-var.stories-doc.mdx';

export default {
    id: 'styles-base-intern-var',
    title: 'Styles/Base (intern)/var',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlVarStoriesDoc,
        },
    },
};

export const VarColor = ({}) => html` <style>
        .sb-var {
            background-color: var(--vl-color--background-alt);
            border: var(--vl-color--border-alt) 1px solid;
            width: 240px;
            padding: 10px;
            text-align: center;
        }
    </style>
    <div class="sb-var">de alternatieve achtergrond en rand kleur</div>`;
VarColor.storyName = 'vl-var - color';
