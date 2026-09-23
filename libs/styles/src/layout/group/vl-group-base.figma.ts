// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=25-3364
// source=libs/styles/src/layout/group/vl-group.css.ts
// component=vlGroupStyles
import figma from 'figma';
import { vlGroupModifier } from '../group/vl-group-modifier';

const instance = figma.selectedInstance;

// `.vl-group (base)` is geen web component maar de CSS-klasse `vl-group` uit libs/styles.
// Dit is het basiscomponent met alle modifiers op één variant-as. Het wordt nooit los gebruikt: de
// andere Figma-componenten (.vl-group, .vl-group--column, ...) zijn wrappers rond een instance hiervan,
// en hun templates schrijven de groep uit. Dit template geldt enkel wanneer de base-laag zelf geselecteerd is.
const modifier = vlGroupModifier(instance);

const slot = instance.getSlot('Slot');

export default {
    example: figma.code`<div class="vl-group${modifier}">${slot}</div>`,
    id: 'vl-group-base',
    metadata: { nestable: true },
};
