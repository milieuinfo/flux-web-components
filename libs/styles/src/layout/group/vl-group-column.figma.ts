// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=25-3755
// source=libs/styles/src/layout/group/vl-group.css.ts
// component=vlGroupStyles
import figma from 'figma';
import { vlGroupModifier } from './vl-group-modifier';

// `.vl-group--column` is geen web component maar een CSS-klasse uit libs/styles.
// Dit Figma-component is een wrapper rond een `.vl-group (base)`-instance, zonder eigen properties of
// Slot-property. De variant van de base bepaalt de modifier; de inhoud zit in de Slot van de base.
const base = figma.selectedInstance.findInstance('🧩 .vl-group (base)');
const modifier = base && base.type === 'INSTANCE' ? vlGroupModifier(base) : '';
const slot = base && base.type === 'INSTANCE' ? base.getSlot('Slot') : undefined;

export default {
    example: figma.code`<div class="vl-group${modifier}">${slot}</div>`,
    id: 'vl-group--column',
    metadata: { nestable: true },
};
