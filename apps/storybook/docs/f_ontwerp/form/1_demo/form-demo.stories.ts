import { html } from 'lit-html';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDemoComponent } from '@domg-wc/integrations/form';

registerWebComponents([VlFormDemoComponent]);

export default {
    title: 'Ontwerp/Form/Demo',
} as Meta;

export const Demo = () => html`<vl-form-demo></vl-form-demo>`;
