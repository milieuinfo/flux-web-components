import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCrossValidationComponent } from '@domg-wc/integrations/form';

registerWebComponents([VlFormCrossValidationComponent]);

export default {
    title: 'Patronen/Formulier/cross-validatie',
} as Meta;

export const FormulierCrossValidatie = () => html`<vl-form-cross-validation></vl-form-cross-validation>`;

FormulierCrossValidatie.storyName = 'formulier - cross-validatie';
