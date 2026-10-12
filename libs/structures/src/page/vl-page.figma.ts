// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=3424-2779
// source=libs/structures/src/page/vl-page.component.ts
// component=VlPage
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-as `variant` mengt de attributen `v-center` en `v-stretch` met pagina-layouts die in code
// geen attribuut van vl-page zijn: "side navigation" (vl-side-navigation-layout in de main-slot)
// en "full width" (vl-functional-header en vl-content-block met full-width). Die worden niet gemapt.
const variant: { vCenter?: boolean; vStretch?: boolean } =
    instance.getEnum('variant', {
        'deprecated (use default)': {},
        default: {},
        'side navigation': {},
        'full width': {},
        'v-center': { vCenter: true },
        'v-stretch': { vStretch: true },
    }) ?? {};

// De Figma-`slot` is de pagina-inhoud en komt overeen met de `main`-slot.
// De geneste header- en footer-instances zijn geen properties van dit component;
// in code zijn dat vl-header-next en vl-footer-next in de slots `header` en `footer`.
// `skip-to-content-id` (id van de eerste heading van de pagina-inhoud, WCAG 2.4.1) zit niet in Figma en blijft leeg.
const slot = instance.getSlot('slot');

export default {
    example: figma.code`<vl-page${variant.vCenter ? ' v-center' : ''}${variant.vStretch ? ' v-stretch' : ''}>
    <vl-header-next slot="header" identifier="" skip-to-content-id=""></vl-header-next>
    <div slot="main">
        ${slot}
    </div>
    <vl-footer-next slot="footer" identifier=""></vl-footer-next>
</vl-page>`,
    id: 'vl-page',
    metadata: { nestable: false },
};
