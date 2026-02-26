import { html } from 'lit';
import vlBodyStoriesDoc from './vl-body.stories-doc.mdx';
import { Meta } from '@storybook/web-components-vite';

export default {
    id: 'styles-base-body',
    title: 'Styles/Base (intern)/body',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlBodyStoriesDoc,
        },
    },
} as Meta;

export const BodyDefault = ({}) => html`
    <div>Deze specifieke &lt;body&gt; en &lt;html&gt; styling wordt automatisch op het document gezet.</div>
`;
BodyDefault.storyName = 'body - default';
