// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=159-20408
// source=libs/components/src/block/spotlight/vl-spotlight.component.ts
// component=VlSpotlight
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-set heeft drie assen: `size` (S/L/XS), `header` (Image/--none--) en `Link` (yes/no).
// `header=Image` mapt op `img-src` (+ `img-alt`), `Link=yes` op `link`; de effectieve url's zijn geen
// design-informatie en worden als placeholder getoond.
// `alt`, `no-border`, `external` en `link-label` hebben geen Figma-equivalent (de geneste spotlight-container
// heeft enkel `alt background=No`).
// Een bestand met een oudere versie van de library kan de as missen; `getEnum` geeft dan een foutobject terug in
// plaats van `undefined`.
const sizeValue = instance.getEnum('size', {
    S: 's',
    L: 'l',
    XS: 'xs',
});
const size = typeof sizeValue === 'string' ? sizeValue : '';
const header: { image?: boolean } =
    instance.getEnum('header', {
        Image: { image: true },
        '--none--': {},
    }) ?? {};
const link: { link?: boolean } =
    instance.getEnum('Link', {
        yes: { link: true },
        no: {},
    }) ?? {};

// Titel, subtitel en tekst zitten in tekstlagen van de geneste (interne) spotlight-container-instance;
// de zichtbaarheid van subtitel en tekst hangt aan de booleans `subtitle` en `text` van die instance.
const container = instance.findInstance('spotlight-container');
let hasSubtitle = false;
let hasText = false;
if (container && container.type === 'INSTANCE') {
    hasSubtitle = String(container.getPropertyValue('subtitle')) === 'true';
    hasText = String(container.getPropertyValue('text')) === 'true';
}

const titleLayer = instance.findText('↳ Title', { traverseInstances: true });
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';

const subtitleLayer = instance.findText('↳ Subtitle', { traverseInstances: true });
const subtitle =
    hasSubtitle && subtitleLayer && subtitleLayer.type === 'TEXT' ? escapeHtml(subtitleLayer.textContent) : '';

const textLayer = instance.findText('↳ Text', { traverseInstances: true });
const text = hasText && textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

const subtitleSlot = subtitle
    ? `
    <span slot="subtitle">${subtitle}</span>`
    : '';
const textSlot = text
    ? `
    <span slot="text">${text}</span>`
    : '';

export default {
    example: figma.code`<vl-spotlight size="${size}"${header.image ? ' img-src="..." img-alt="..."' : ''}${link.link ? ' link="..."' : ''}>
    <span slot="title">${title}</span>${subtitleSlot}${textSlot}
</vl-spotlight>`,
    id: 'vl-spotlight',
    metadata: { nestable: true },
};
