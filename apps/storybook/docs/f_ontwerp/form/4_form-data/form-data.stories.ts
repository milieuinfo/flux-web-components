import { html } from 'lit-html';
import { Meta } from '@storybook/web-components';
import formDataDoc from './form-data.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDataComponent } from '@domg-wc/integration/form/form-data';

registerWebComponents([VlFormDataComponent]);

export default {
    title: 'Ontwerp/Form/Form Data',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: formDataDoc,
        },
    },
} as Meta;

export const FormData = () => html`<vl-form-data></vl-form-data>`;
