import { html } from 'lit';
import { Meta } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import {
    VlFormCrossValidationComponent,
    VlFormCrossValidationConditionalComponent,
    VlFormCrossValidationMatchComponent,
} from '@domg-wc/integrations/form';

registerWebComponents([
    VlFormCrossValidationComponent,
    VlFormCrossValidationMatchComponent,
    VlFormCrossValidationConditionalComponent,
]);

export default {
    title: 'Patronen/Formulier/cross-validatie',
} as Meta;

export const FormulierCrossValidatie = () => html`<vl-form-cross-validation></vl-form-cross-validation>`;

FormulierCrossValidatie.storyName = 'formulier - cross-validatie';

export const FormulierCrossValidatieMatch = () =>
    html`<vl-form-cross-validation-match></vl-form-cross-validation-match>`;

FormulierCrossValidatieMatch.storyName = 'formulier - cross-validatie - velden matchen';

export const FormulierCrossValidatieConditional = () =>
    html`<vl-form-cross-validation-conditional></vl-form-cross-validation-conditional>`;

FormulierCrossValidatieConditional.storyName = 'formulier - cross-validatie - conditioneel verplicht';
