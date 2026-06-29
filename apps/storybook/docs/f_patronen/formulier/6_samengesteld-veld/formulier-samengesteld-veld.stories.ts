import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormCompositeInputComponent } from '@domg-wc/integrations/form';

registerWebComponents([VlFormCompositeInputComponent]);

export default {
    title: 'Patronen/Formulier/samengesteld veld',
} as Meta;

export const FormulierSamengesteldVeld = () => html`<vl-form-composite-input></vl-form-composite-input>`;

FormulierSamengesteldVeld.storyName = 'formulier - samengesteld veld';
