// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=994-22179
// source=libs/components/src/block/breadcrumb/vl-breadcrumb.component.ts
// component=VlBreadcrumbComponent
// unmapped: variant
import figma from 'figma';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - `variant` (desktop/mobile): responsief gedrag, geen code-equivalent.
// Figma heeft geen aparte vl-breadcrumb-item-component: de items (tekstlagen "↳ link 1" … "↳ current page") vormen de
// standaardinhoud van `Slot` en worden als default slot doorgegeven. In code hoort elk item een <vl-breadcrumb-item>
// te zijn (met `href`, of `type="button"`/zonder href voor de huidige pagina).
const slot = instance.getSlot('Slot');

export default {
    example: figma.code`<vl-breadcrumb>${slot}</vl-breadcrumb>`,
    id: 'vl-breadcrumb',
    metadata: { nestable: true },
};
