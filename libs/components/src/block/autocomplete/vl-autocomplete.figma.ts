// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=674-13
// source=libs/components/src/block/autocomplete/vl-autocomplete.component.ts
// component=VlAutocomplete
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - `open`: toont in Figma de suggestielijst. In code is `opened` interne state die volgt uit de ingetikte zoekterm
//   en de gevonden items; als attribuut zetten heeft geen zin.
// - `Slot`: bevat in Figma de suggesties. In code komen die uit de `items`-property (of het `search`-event); het
//   default slot van de code vervangt het invoerveld zelf en is dus geen equivalent.

// De tekst in het geneste vl-input-field (state=Default) wordt als `placeholder` doorgegeven.
const textLayer = instance.findText('↳ text', { traverseInstances: true });
const placeholder = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

export default {
    example: figma.code`<vl-autocomplete${placeholder ? ` placeholder="${placeholder}"` : ''}></vl-autocomplete>`,
    id: 'vl-autocomplete',
    metadata: { nestable: true },
};
