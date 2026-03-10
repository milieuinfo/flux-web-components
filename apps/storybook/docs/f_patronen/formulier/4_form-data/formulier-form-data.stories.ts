import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDataComponent } from '@domg-wc/integrations/form';

registerWebComponents([VlFormDataComponent]);

export default {
    title: 'Patronen/Formulier/form data',
} as Meta;

export const FormulierFormData = () => html`<vl-form-data></vl-form-data>`;

FormulierFormData.storyName = 'formulier - form data';
