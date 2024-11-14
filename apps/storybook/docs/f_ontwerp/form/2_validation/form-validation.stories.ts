import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components';
import formValidatorsDoc from './form-validation.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlErrorMessageComponent } from '@domg-wc/form/next/error-message';

registerWebComponents([VlInputFieldComponent, VlFormLabelComponent, VlErrorMessageComponent]);

export default {
    title: 'Ontwerp/Form/Validation',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: formValidatorsDoc,
        },
    },
} as Meta;

export const ValidationRequired: StoryFn = () => html`
    <form onsubmit="return false;">
        <vl-form-label-next for="voornaam" label="Voornaam *"></vl-form-label-next>
        <vl-input-field-next id="voornaam" name="voornaam" autocomplete="given-name" required></vl-input-field-next>
        <vl-error-message-next for="voornaam" state="valueMissing">
            Gelieve een voornaam in te vullen.
        </vl-error-message-next>
    </form>
`;

export const ValidationPattern: StoryFn = () => html`
    <form onsubmit="return false;">
        <vl-form-label-next for="familienaam" label="Familienaam"></vl-form-label-next>
        <vl-input-field-next
            id="familienaam"
            name="familienaam"
            autocomplete="family-name"
            pattern="^[a-zA-Z]*$"
        ></vl-input-field-next>
        <vl-error-message-next for="familienaam" state="patternMismatch">
            Gelieve geen nummers of speciale tekens in te vullen.
        </vl-error-message-next>
    </form>
`;
