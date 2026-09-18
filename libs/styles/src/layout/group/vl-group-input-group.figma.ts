// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=25-3944
// source=libs/styles/src/layout/group/vl-group.css.ts
// component=vlGroupStyles
// unmapped: variant
import figma from 'figma';

// `.vl-group--input-group` is geen web component maar een CSS-klasse uit libs/styles.
// Dit Figma-component is een wrapper rond een `.vl-group (base)`-instance met variant
// "--input-group"; het heeft geen eigen Slot-property.
//
// Bewust niet gemapt: de variant-as met de waarden "button right", "button left", "icon right"
// en "icon left". Die beschrijven welke inhoud naast het invoerveld staat en aan welke kant —
// dat is geen CSS-modifier: vl-group.css.ts kent enkel `vl-group--input-group`. De volgorde
// van knop/icoon t.o.v. het invoerveld bepaal je in code met de volgorde van de child-elementen.

export default {
    example: figma.code`<div class="vl-group vl-group--input-group"></div>`,
    id: 'vl-group--input-group',
    metadata: { nestable: true },
};
