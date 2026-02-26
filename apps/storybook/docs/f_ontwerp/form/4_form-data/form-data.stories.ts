import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDataComponent } from '@domg-wc/integrations/form';

registerWebComponents([VlFormDataComponent]);

export default {
    title: 'Ontwerp/Form/Form Data',
} as Meta;

export const FormData = () => html`<vl-form-data></vl-form-data>`;
