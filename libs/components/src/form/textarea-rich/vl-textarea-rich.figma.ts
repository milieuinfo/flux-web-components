// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=900-2
// source=libs/components/src/form/textarea-rich/vl-textarea-rich.component.ts
// component=VlTextareaRichComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Het Figma-component heeft geen properties. De toolbar-tekstlagen "B", "I", "U" en "S"
// komen overeen met de standaard `toolbar` (bold italic underline strikethrough) en worden niet gemapt.

// De placeholder zit in de tekstlaag "Typ iets…" en hangt niet aan een component-property.
const placeholderLayer = instance.findText('Typ iets…');
const placeholder =
    placeholderLayer && placeholderLayer.type === 'TEXT' ? escapeHtml(placeholderLayer.textContent) : '';

export default {
    example: figma.code`<vl-textarea-rich placeholder="${placeholder}"></vl-textarea-rich>`,
    id: 'vl-textarea-rich',
    metadata: { nestable: true },
};
