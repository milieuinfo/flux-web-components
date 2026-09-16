// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=563-50953
// source=libs/components/src/block/template/vl-template.component.ts
// component=VlTemplate
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-as `variant` mengt het attribuut `v-center` met pagina-layouts die in code geen
// attribuut van vl-template zijn: "side navigation" (vl-side-navigation-layout in de main-slot)
// en "full width" (vl-functional-header en vl-content-block met full-width). Die worden niet gemapt.
// `v-stretch` bestaat enkel in code.
const variant: { vCenter?: boolean } =
    instance.getEnum('variant', {
        'deprecated (use default)': {},
        default: {},
        'side navigation': {},
        'full width': {},
        'v-center': { vCenter: true },
    }) ?? {};

// De Figma-`slot` is de pagina-inhoud en komt overeen met de `main`-slot.
// De geneste header- en footer-instances zijn geen properties van dit component;
// in code zijn dat vl-header-next en vl-footer-next in de slots `header` en `footer`.
const slot = instance.getSlot('slot');

export default {
    example: figma.code`<vl-template${variant.vCenter ? ' v-center' : ''}>
    <vl-header-next slot="header" identifier=""></vl-header-next>
    <div slot="main">
        ${slot}
    </div>
    <vl-footer-next slot="footer" identifier=""></vl-footer-next>
</vl-template>`,
    id: 'vl-template',
    metadata: { nestable: false },
};
