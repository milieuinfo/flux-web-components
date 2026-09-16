// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=272-6376
// source=libs/components/src/block/document/vl-document.component.ts
// component=VlDocumentComponent
// unmapped: size
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Figma-as `size` ("L" / "S (Figma-only)") heeft geen code-equivalent: het code-component kent één formaat.
// De attributen `href` en `target` hebben geen Figma-property en worden niet uitgeschreven.
// Type, titel en metadata hangen niet aan een component-property maar zitten in tekstlagen:
// "DocType", "↳ link" (in de geneste vl-link-instance) en "↪︎ Label".
const typeText = instance.findText('DocType');
const type = typeText && typeText.type === 'TEXT' ? escapeHtml(typeText.textContent) : '';
const titleText = instance.findText('↳ link', { traverseInstances: true });
const title = titleText && titleText.type === 'TEXT' ? escapeHtml(titleText.textContent) : '';
const metadataText = instance.findText('↪︎ Label');
const metadata = metadataText && metadataText.type === 'TEXT' ? escapeHtml(metadataText.textContent) : '';

export default {
    example: figma.code`<vl-document>
    <span slot="type">${type}</span>
    <span slot="title">${title}</span>
    <span slot="metadata">${metadata}</span>
</vl-document>`,
    id: 'vl-document',
    metadata: { nestable: true },
};
