import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components-vite';
import { registerWebComponents } from '@domg-wc/common';
import {
    VlFormCompositeInputComponent,
    VlFormCompositeInputEenheidComponent,
    VlFormCompositeInputDatumbereikComponent,
    VlFormCompositeInputContactComponent,
} from '@domg-wc/integrations/form';

registerWebComponents([
    VlFormCompositeInputComponent,
    VlFormCompositeInputEenheidComponent,
    VlFormCompositeInputDatumbereikComponent,
    VlFormCompositeInputContactComponent,
]);

export default {
    title: 'Patronen/Formulier/samengesteld veld',
} as Meta;

export const FormulierSamengesteldVeld: StoryFn = () => html`<vl-form-composite-input></vl-form-composite-input>`;
FormulierSamengesteldVeld.storyName = 'formulier - samengesteld veld';

export const FormulierSamengesteldVeldEenheid: StoryFn = () =>
    html`<vl-form-composite-input-eenheid></vl-form-composite-input-eenheid>`;
FormulierSamengesteldVeldEenheid.storyName = 'formulier - samengesteld veld - getal + eenheid (vl-select)';

export const FormulierSamengesteldVeldDatumbereik: StoryFn = () =>
    html`<vl-form-composite-input-datumbereik></vl-form-composite-input-datumbereik>`;
FormulierSamengesteldVeldDatumbereik.storyName = 'formulier - samengesteld veld - datumbereik (vl-datepicker)';

export const FormulierSamengesteldVeldContact: StoryFn = () =>
    html`<vl-form-composite-input-contact></vl-form-composite-input-contact>`;
FormulierSamengesteldVeldContact.storyName = 'formulier - samengesteld veld - contactmethode';
