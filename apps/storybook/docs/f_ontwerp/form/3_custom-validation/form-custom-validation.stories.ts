import { html } from 'lit-html';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCustomValidationComponent } from '@domg-wc/integrations/form';

registerWebComponents([VlFormCustomValidationComponent]);

export default {
    title: 'Ontwerp/Form/Custom Validation',
} as Meta;

export const CustomValidation = () => html`<vl-form-custom-validation></vl-form-custom-validation>`;
