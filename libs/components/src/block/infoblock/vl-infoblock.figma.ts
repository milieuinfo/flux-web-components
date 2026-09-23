// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=203-2342
// source=libs/components/src/block/infoblock/vl-infoblock.component.ts
// component=VlInfoblockComponent
// unmapped: Property 1
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Figma-as `Property 1` heeft maar één waarde ("Default") en wordt niet gemapt.
// Het icoon komt uit de geneste instance "infoblock__header__icon", waarvan de as `Type` in Figma enkel
// "contact" kent; dat is het `type`-attribuut van het code-component (contact, publications, faq, news,
// timeline, question). Het vrije `icon`-attribuut heeft geen Figma-equivalent.
const showContent = instance.getBoolean('↳ Show content') === true;

// De titel zit in de tekstlaag "↳ Titel", de content in "↳ subtitel".
const titleText = instance.findText('↳ Titel');
const title = titleText && titleText.type === 'TEXT' ? escapeHtml(titleText.textContent) : '';
const contentText = instance.findText('↳ subtitel');
const content = showContent && contentText && contentText.type === 'TEXT' ? escapeHtml(contentText.textContent) : '';

export default {
    example: figma.code`<vl-infoblock type="contact" title="${title}">${content}</vl-infoblock>`,
    id: 'vl-infoblock',
    metadata: { nestable: true },
};
