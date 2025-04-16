import { html } from 'lit-html';
import { Meta } from '@storybook/web-components';
import formCustomValidationDoc from './form-custom-validation.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCustomValidationComponent } from '@domg-wc/integration/form/custom-validation';

registerWebComponents([VlFormCustomValidationComponent]);

export default {
    title: 'Ontwerp/Form/Custom Validation',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: formCustomValidationDoc,
        },
    },
} as Meta;

export const CustomValidation = () => html`<vl-form-custom-validation></vl-form-custom-validation>`;
