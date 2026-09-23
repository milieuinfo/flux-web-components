// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=385-1693
// source=libs/components/src/form/fieldset/vl-fieldset.component.ts
// component=VlFieldsetComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De as `variant` codeert de richting; in code is dat het boolean attribuut `horizontal`.
// De "deprecated (...)"-waarden mappen op hun niet-deprecated equivalent.
// Een bestand met een oudere versie van de library kan een as missen; `getEnum` geeft dan een foutobject terug in
// plaats van `undefined`. De vergelijking met `true` houdt de waarde dan op false.
const horizontal =
    instance.getEnum('variant', {
        vertical: false,
        horizontal: true,
        'deprecated (use vertical)': false,
        'deprecated (use horizontal)': true,
    }) === true;

const border =
    instance.getEnum('border', {
        yes: true,
        no: false,
    }) === true;

// De legend zit in de tekstlaag "↳ Form Label" van de geneste vl-form-label; in code is dat de `legend`-slot.
const formLabel = instance.findText('↳ Form Label', { traverseInstances: true });
const legend = formLabel && formLabel.type === 'TEXT' ? escapeHtml(formLabel.textContent) : '';

// De inhoud zit in de Figma-slot "slot" (enkel aanwezig in de niet-deprecated varianten; de deprecated
// varianten bevatten een vaste vl-input-field en renderen dus geen slot-inhoud).
const slot = instance.getSlot('slot');

// Bewust niet gemapt: `legend-classes` heeft geen Figma-equivalent.

export default {
    example: figma.code`<vl-fieldset${border ? ' border' : ''}${
        horizontal ? ' horizontal' : ''
    }><span slot="legend">${legend}</span>${slot}</vl-fieldset>`,
    id: 'vl-fieldset',
    metadata: { nestable: true },
};
