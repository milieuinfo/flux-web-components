import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCustomValidationComponent } from '@domg-wc/integrations/form';

registerWebComponents([VlFormCustomValidationComponent]);

export default {
    title: 'Patronen/Formulier/aangepaste validatie',
} as Meta;

export const FormulierAangepasteValidatie = () => html`<vl-form-custom-validation></vl-form-custom-validation>`;

FormulierAangepasteValidatie.storyName = 'formulier - aangepaste validatie';
