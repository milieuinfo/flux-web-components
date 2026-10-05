// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=3424-2779
// source=libs/structures/src/page/vl-page.component.ts
// component=VlPage
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-as `variant` mengt het attribuut `v-center` met pagina-layouts die in code geen
// attribuut van vl-page zijn: "side navigation" (vl-side-navigation-layout in de main-slot)
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
// De skip link van de header verwijst naar de main content; die koppeling zit niet in Figma.
const slot = instance.getSlot('slot');

export default {
    example: figma.code`<vl-page${variant.vCenter ? ' v-center' : ''}>
    <vl-header-next slot="header" identifier="" skip-to-content-id="main-content"></vl-header-next>
    <div id="main-content" slot="main">
        ${slot}
    </div>
    <vl-footer-next slot="footer" identifier=""></vl-footer-next>
</vl-page>`,
    id: 'vl-page',
    metadata: { nestable: false },
};
