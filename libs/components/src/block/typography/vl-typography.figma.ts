// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=592-271
// source=libs/components/src/block/typography/vl-typography.component.ts
// component=VlTypography
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-component heeft geen properties; de inhoud zit in één tekstlaag zonder component-property.
const textLayer = instance.findLayers((node) => node.type === 'TEXT')[0];
const text = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

// Niet gemapt (geen Figma-equivalent): parameters en update-url-hash.
export default {
    example: figma.code`<vl-typography>${text}</vl-typography>`,
    id: 'vl-typography',
    metadata: { nestable: true },
};
