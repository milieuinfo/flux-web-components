import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormMessageComponent, VlFormLabelComponent, VlInputFieldComponent } from '@domg-wc/components/form';

registerWebComponents([VlInputFieldComponent, VlFormLabelComponent, VlFormMessageComponent]);

export default {
    title: 'Ontwerp/Form/Validation',
} as Meta;

export const ValidationRequired: StoryFn = () => html`
    <form onsubmit="return false;">
        <vl-form-label for="voornaam" label="Voornaam *"></vl-form-label>
        <vl-input-field id="voornaam" name="voornaam" autocomplete="given-name" required></vl-input-field>
        <vl-form-message for="voornaam" state="valueMissing"> Gelieve een voornaam in te vullen. </vl-form-message>
    </form>
`;

export const ValidationPattern: StoryFn = () => html`
    <form onsubmit="return false;">
        <vl-form-label for="familienaam" label="Familienaam"></vl-form-label>
        <vl-input-field
            id="familienaam"
            name="familienaam"
            autocomplete="family-name"
            pattern="^[a-zA-Z]*$"
        ></vl-input-field>
        <vl-form-message for="familienaam" state="patternMismatch">
            Gelieve geen nummers of speciale tekens in te vullen.
        </vl-form-message>
    </form>
`;
