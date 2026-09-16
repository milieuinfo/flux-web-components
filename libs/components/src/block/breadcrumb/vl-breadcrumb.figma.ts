// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=994-22179
// source=libs/components/src/block/breadcrumb/vl-breadcrumb.component.ts
// component=VlBreadcrumbComponent
// unmapped: variant
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - `variant` (desktop/mobile): responsief gedrag, geen code-equivalent. De mobile-variant toont een tussenliggend
//   item "..." dat in code geen item is en daarom wordt overgeslagen.
// Figma heeft geen aparte vl-breadcrumb-item-component: de items zijn de tekstlagen in `Slot`, met `nav-right`-iconen
// ertussen die het component in code zelf tekent. Elke tekstlaag wordt een <vl-breadcrumb-item>, in volgorde en
// ongeacht haar naam: de laatste is de huidige pagina (zonder `href`), de andere zijn links (met `href`). Verborgen
// lagen komen niet in de Code Connect-boom en vallen dus vanzelf weg.
const texts = instance
    .findLayers((node) => node.type === 'TEXT')
    .map((node) => (node.type === 'TEXT' ? node.textContent : ''))
    .filter((text) => text !== '...');
const items = texts
    .map((text, index) =>
        index === texts.length - 1
            ? `\n    <vl-breadcrumb-item>${escapeHtml(text)}</vl-breadcrumb-item>`
            : `\n    <vl-breadcrumb-item href="#">${escapeHtml(text)}</vl-breadcrumb-item>`,
    )
    .join('');

// Bevat de slot geen tekstlagen (bijvoorbeeld enkel vl-link-instances), dan gaat de slot ongewijzigd door.
const slot = items ? '' : instance.getSlot('Slot');

export default {
    example: figma.code`<vl-breadcrumb>${items ? `${items}\n` : slot}</vl-breadcrumb>`,
    id: 'vl-breadcrumb',
    metadata: { nestable: true },
};
