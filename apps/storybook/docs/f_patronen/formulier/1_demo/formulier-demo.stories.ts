import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDemoComponent } from '@domg-wc/integrations/form';

registerWebComponents([VlFormDemoComponent]);

export default {
    title: 'Patronen/Formulier/demo',
} as Meta;

export const FormulierDemo = () => html`<vl-form-demo></vl-form-demo>`;
FormulierDemo.storyName = 'formulier - demo';
