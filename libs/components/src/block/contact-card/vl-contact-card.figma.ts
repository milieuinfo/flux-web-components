// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=203-2019
// source=libs/components/src/block/contact-card/vl-contact-card.component.ts
// component=VlContactCardComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-component heeft geen properties. Icoon, "↳ Titel" en "↳ subtitel" vormen samen het info-blok; in code is dat
// een vl-infoblock (type "contact") in het `info`-slot. Het icoon is vaste Figma-inhoud en volgt in code uit
// type="contact".
const titleLayer = instance.findText('↳ Titel');
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';
const subtitleLayer = instance.findText('↳ subtitel');
const subtitle = subtitleLayer && subtitleLayer.type === 'TEXT' ? escapeHtml(subtitleLayer.textContent) : '';

// De geneste vl-properties-instance rendert via haar eigen template. Een uitgevoerd template kan geen slot-attribuut
// krijgen, daarom wordt het in een <div slot="properties"> gewikkeld.
const properties = instance.findInstance('🧩 vl-properties');
let propertiesCode;
if (properties && properties.type === 'INSTANCE') {
    propertiesCode = properties.executeTemplate().example;
}

export default {
    example: figma.code`<vl-contact-card>
    <vl-infoblock slot="info" type="contact" title="${title}">${subtitle ? `<p>${subtitle}</p>` : ''}</vl-infoblock>
    ${propertiesCode ? figma.code`<div slot="properties">${propertiesCode}</div>` : ''}
</vl-contact-card>`,
    id: 'vl-contact-card',
    metadata: { nestable: true },
};
