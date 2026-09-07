// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=272-5680
// source=libs/components/src/block/description-data/vl-description-data-item.component.ts
// component=VlDescriptionDataItem
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Het Figma-component heeft geen properties: label en waarde zitten in de tekstlagen "label" en "value".
// De kolombreedtes per item (items-size, items-medium-size, items-small-size, items-extra-small-size)
// hebben geen Figma-equivalent en worden niet uitgeschreven.
const labelText = instance.findText('label');
const label = labelText && labelText.type === 'TEXT' ? escapeHtml(labelText.textContent) : '';
const valueText = instance.findText('value');
const value = valueText && valueText.type === 'TEXT' ? escapeHtml(valueText.textContent) : '';

export default {
    example: figma.code`<vl-description-data-item label="${label}" value="${value}"></vl-description-data-item>`,
    id: 'vl-description-data-item',
    metadata: { nestable: true },
};
