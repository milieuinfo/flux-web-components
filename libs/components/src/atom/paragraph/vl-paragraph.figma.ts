// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=271-8020
// source=libs/components/src/atom/paragraph/vl-paragraph.component.ts
// component=VlParagraphComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

const variant: { bold?: boolean; introduction?: boolean } =
    instance.getEnum('variant', {
        default: {},
        bold: { bold: true },
        introduction: { introduction: true },
    }) ?? {};

// De tekst zit per variant in een anders genaamde tekstlaag ("vl-paragraph - default", "vl-paragraph - bold",
// "vl-paragraph - introduction") zonder component-property; neem daarom de eerste tekstlaag.
const textLayer = instance.findLayers((node) => node.type === 'TEXT')[0];
const text = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

export default {
    example: figma.code`<vl-paragraph${variant.bold ? ' bold' : ''}${variant.introduction ? ' introduction' : ''}>${text}</vl-paragraph>`,
    id: 'vl-paragraph',
    metadata: { nestable: true },
};
