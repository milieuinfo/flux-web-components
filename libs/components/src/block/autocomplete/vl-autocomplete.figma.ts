// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=3566-2
// source=libs/components/src/block/autocomplete/vl-autocomplete.component.ts
// component=VlAutocomplete
// code-only vl-autocomplete: caption-format, clear-tooltip, disable-loading, group-by, initial-value, items, loading
// code-only vl-autocomplete: max-suggestions, min-chars, no-matches-text, opened
import figma from 'figma';
import { booleanProperty } from '../../../../../resources/code-connect/boolean-property';
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

// De boolean `label` toont een vl-form-label boven het veld; zijn tekst gaat naar het attribuut `label`. Een oudere
// library zonder de boolean had geen label.
const showLabel = booleanProperty(instance, 'label', false);
const labelInstance = instance.findInstance('🧩 vl-form-label');
const labelText =
    showLabel && labelInstance && labelInstance.type === 'INSTANCE'
        ? labelInstance.findLayers((node) => node.type === 'TEXT')[0]
        : undefined;
const label = labelText && labelText.type === 'TEXT' ? escapeHtml(labelText.textContent) : '';

// De assen `show-clear` (sluit-icoon in het veld) en `label-small` (label op 14px) zijn de gelijknamige attributen.
const showClear = instance.getEnum('show-clear', { false: false, true: true }) === true;
const labelSmall = instance.getEnum('label-small', { false: false, true: true }) === true;

export default {
    example: figma.code`<vl-autocomplete${label ? ` label="${label}"` : ''}${labelSmall && label ? ' label-small' : ''}${placeholder ? ` placeholder="${placeholder}"` : ''}${showClear ? ' show-clear' : ''}></vl-autocomplete>`,
    id: 'vl-autocomplete',
    metadata: { nestable: true },
};
