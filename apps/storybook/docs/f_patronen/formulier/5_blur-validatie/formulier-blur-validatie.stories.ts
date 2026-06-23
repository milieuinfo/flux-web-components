import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormLabelComponent, VlFormMessageComponent, VlInputFieldComponent } from '@domg-wc/components/form';

registerWebComponents([VlInputFieldComponent, VlFormLabelComponent, VlFormMessageComponent]);

export default {
    title: 'Patronen/Formulier/blur validatie',
} as Meta;

export const FormulierBlurValidatiePerVeld: StoryFn = () => html`
    <form onsubmit="return false;">
        <vl-form-label for="voornaam" label="Voornaam *"></vl-form-label>
        <vl-input-field
            id="voornaam"
            name="voornaam"
            autocomplete="given-name"
            required
            min-length="3"
            pattern="^[a-zA-Z]*$"
            blur-validation
        ></vl-input-field>
        <vl-form-message for="voornaam" state="valueMissing">Gelieve een voornaam in te vullen.</vl-form-message>
        <vl-form-message for="voornaam" state="tooShort">Gelieve minimum 3 karakters te gebruiken.</vl-form-message>
        <vl-form-message for="voornaam" state="patternMismatch"
            >Gelieve geen nummers of speciale tekens in te vullen.</vl-form-message
        >
    </form>
`;
FormulierBlurValidatiePerVeld.storyName = 'formulier - blur-validatie per veld';

export const FormulierBlurValidatieForm: StoryFn = () => html`
    <form onsubmit="return false;" blur-validation>
        <vl-form-label for="voornaam" label="Voornaam *"></vl-form-label>
        <vl-input-field id="voornaam" name="voornaam" autocomplete="given-name" required min-length="3">
        </vl-input-field>
        <vl-form-message for="voornaam" state="valueMissing">Gelieve een voornaam in te vullen.</vl-form-message>
        <vl-form-message for="voornaam" state="tooShort">Gelieve minimum 3 karakters te gebruiken.</vl-form-message>

        <vl-form-label for="familienaam" label="Familienaam *"></vl-form-label>
        <vl-input-field id="familienaam" name="familienaam" autocomplete="family-name" required min-length="2">
        </vl-input-field>
        <vl-form-message for="familienaam" state="valueMissing">Gelieve een familienaam in te vullen.</vl-form-message>
        <vl-form-message for="familienaam" state="tooShort">Gelieve minimum 2 karakters te gebruiken.</vl-form-message>
    </form>
`;
FormulierBlurValidatieForm.storyName = 'formulier - blur-validatie op de form';
