import { html } from 'lit-html';
import vlBodyStoriesDoc from './vl-body.stories-doc.mdx';

export default {
    id: 'styles-base-body',
    title: 'Styles/Base (intern)/body',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlBodyStoriesDoc,
        },
    },
};

export const BodyDefault = ({}) => html`
    <div>Deze specifieke &lt;body&gt; en &lt;html&gt; styling wordt automatisch op het document gezet.</div>
`;
BodyDefault.storyName = 'body - default';
