// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=3566-26702
// source=libs/components/src/form/textarea-rich/vl-textarea-rich.component.ts
// component=VlTextareaRichComponent
// code-only vl-textarea-rich: autocomplete, block, blur-validation, character-count, cols, describedby, height, label
// code-only vl-textarea-rich: max-length, min-length, name, plugins, preview, readonly, required, rows, toolbar, value
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De toolbar-tekstlagen "B", "I", "U" en "S"
// komen overeen met de standaard `toolbar` (bold italic underline strikethrough) en worden niet gemapt.

// De placeholder is de laatste tekstlaag (na de toolbar) en hangt niet aan een component-property. Ze wordt niet op
// naam gezocht: de laagnaam volgt in de library de voorbeeldtekst en verandert mee als die aangepast wordt.
// De as `state` (Default | error | success | disabled) komt overeen met de gelijknamige boolean attributen;
// de waarde staat al met een spatie ervoor in de markup.
const stateValue = instance.getEnum('state', {
    Default: '',
    error: ' error',
    success: ' success',
    disabled: ' disabled',
});
const state = typeof stateValue === 'string' ? stateValue : '';

const placeholderLayer = instance.findLayers((node) => node.type === 'TEXT').pop();
const placeholder =
    placeholderLayer && placeholderLayer.type === 'TEXT' ? escapeHtml(placeholderLayer.textContent) : '';

export default {
    example: figma.code`<vl-textarea-rich placeholder="${placeholder}"${state}></vl-textarea-rich>`,
    id: 'vl-textarea-rich',
    metadata: { nestable: true },
};
