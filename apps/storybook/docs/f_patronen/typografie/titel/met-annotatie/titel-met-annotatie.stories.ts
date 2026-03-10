import { registerWebComponents } from '@domg-wc/common';
import { vlGroupStyles } from '@domg-wc/styles';
import { VlTextComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';

registerWebComponents([VlTitleComponent, VlTextComponent]);

export default {
    title: 'Patronen/Typografie/Titel/met annotatie',
} as Meta;

export const TitelMetAnnotatie = () => html`
    <style>
        ${vlGroupStyles}
    </style>
    <div class="vl-group vl-group--baseline">
        <vl-title type="h2" no-space-bottom>Mijn sectie</vl-title>
        <vl-text annotation>Optioneel</vl-text>
    </div>
`;
TitelMetAnnotatie.storyName = 'titel - met annotatie';
