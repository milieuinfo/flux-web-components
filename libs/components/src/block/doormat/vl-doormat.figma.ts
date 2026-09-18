// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=765-13
// source=libs/components/src/block/doormat/vl-doormat.component.ts
// component=VlDoormatComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Figma-as `type` codeert drie dingen: de alt-stijl (`alt`), of er een afbeelding is (`image-src`) en of die
// als graphic getoond wordt (`graphic`). "title only" is in code gewoon een doormat zonder text-slot.
// De Figma-slots `image` en `graphic` bevatten de afbeelding zelf; in code is dat een url in `image-src`,
// die niet uit Figma te halen is en dus leeg blijft (net als `image-alt`, `image-width` en `image-height`).
// `href`, `link-label` en `full-height` hebben geen Figma-property en worden niet uitgeschreven.
const type: { alt?: boolean; image?: boolean; graphic?: boolean } =
    instance.getEnum('type', {
        default: {},
        alt: { alt: true },
        'title only': {},
        image: { image: true },
        graphic: { image: true, graphic: true },
    }) ?? {};
const external = instance.getBoolean('external');

// Titel en tekst zitten in de tekstlagen "title" en "text"; de tekstlaag ontbreekt bij "title only".
const titleText = instance.findText('title');
const title = titleText && titleText.type === 'TEXT' ? escapeHtml(titleText.textContent) : '';
const textText = instance.findText('text');
const text = textText && textText.type === 'TEXT' ? escapeHtml(textText.textContent) : '';
const textSlot = text ? `\n    <span slot="text">${text}</span>` : '';

export default {
    example: figma.code`<vl-doormat${type.alt ? ' alt' : ''}${external ? ' external' : ''}${
        type.image ? ' image-src=""' : ''
    }${type.graphic ? ' graphic' : ''}>
    <span slot="title">${title}</span>${textSlot}
</vl-doormat>`,
    id: 'vl-doormat',
    metadata: { nestable: true },
};
