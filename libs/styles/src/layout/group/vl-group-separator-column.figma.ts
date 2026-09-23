// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=147-17248
// source=libs/styles/src/layout/group/vl-group.css.ts
// component=vlGroupStyles
// unmapped: variant
import figma from 'figma';
import { vlGroupModifier } from './vl-group-modifier';

// `.vl-group--separator-column` is geen web component maar een CSS-klasse uit libs/styles.
// Dit Figma-component is een wrapper rond een `.vl-group (base)`-instance, zonder eigen Slot-property.
// De variant van de base bepaalt de modifier ("--column + --stretch-children"); de inhoud zit in de Slot
// van de base. De scheidingslijnen komen van `vl-group--separator-column`, dat de base niet kent en de
// wrapper zelf toevoegt. De combinatie komt overeen met de story "vl-group - accordions".
//
// Bewust niet gemapt: de variant-as met de waarden "default" en "vl-accordion". Die tonen
// welk soort inhoud in de groep zit, niet een CSS-modifier.
// De bijhorende modifiers `vl-group--separator-column-before` en
// `vl-group--separator-column-after` bestaan wel in de CSS maar hebben geen Figma-property.
const base = figma.selectedInstance.findInstance('🧩 .vl-group (base)');
const modifier = base && base.type === 'INSTANCE' ? vlGroupModifier(base) : '';
const slot = base && base.type === 'INSTANCE' ? base.getSlot('Slot') : undefined;

export default {
    example: figma.code`<div class="vl-group${modifier} vl-group--separator-column">${slot}</div>`,
    id: 'vl-group--separator-column',
    metadata: { nestable: true },
};
