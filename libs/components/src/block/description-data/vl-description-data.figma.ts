// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=726-5702
// source=libs/components/src/block/description-data/vl-description-data.component.ts
// component=VlDescriptionData
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma-as `variant`: enkel `bordered` heeft een code-equivalent (het `bordered`-attribuut).
// `default` is de code-default en `deprecated` is een oude Figma-stijl zonder code-equivalent; beide renderen
// zonder attribuut. De kolombreedtes (items-size, items-medium-size, items-small-size, items-extra-small-size)
// hebben geen Figma-property en worden niet uitgeschreven.
const variant: { bordered?: boolean } =
    instance.getEnum('variant', {
        deprecated: { bordered: false },
        default: { bordered: false },
        bordered: { bordered: true },
    }) ?? {};

// De items zitten in de Figma-slot "Slot" en renderen via de template van vl-description-data-item.
const items = instance.getSlot('Slot');

export default {
    example: figma.code`<vl-description-data${variant.bordered ? ' bordered' : ''}>${items}</vl-description-data>`,
    id: 'vl-description-data',
    metadata: { nestable: true },
};
