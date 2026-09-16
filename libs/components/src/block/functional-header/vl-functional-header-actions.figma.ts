// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=979-2
// source=libs/components/src/block/functional-header/vl-functional-header.component.ts
// component=VlFunctionalHeaderComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// `actions` is geen apart web component: het is de inhoud van de `actions`-slot van vl-functional-header.
// Het component zoekt die inhoud op via `querySelector('[slot="actions"]')`; de stories geven de acties mee
// als een <div slot="actions"> met daarin de links/knoppen.
// De enige Figma-property is de `slot` zelf; die bevat de acties.
const slot = instance.getSlot('slot');

export default {
    example: figma.code`<div slot="actions">${slot}</div>`,
    id: 'vl-functional-header-actions',
    metadata: { nestable: true },
};
