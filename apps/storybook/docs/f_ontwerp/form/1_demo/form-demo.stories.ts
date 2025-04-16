import { html } from 'lit-html';
import { Meta } from '@storybook/web-components';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDemoComponent } from '@domg-wc/integration/form/demo';
import formDemoDoc from './form-demo.stories-doc.mdx';

registerWebComponents([VlFormDemoComponent]);

export default {
    title: 'Ontwerp/Form/Demo',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: formDemoDoc,
        },
    },
} as Meta;

export const Demo = () => html`<vl-form-demo></vl-form-demo>`;
