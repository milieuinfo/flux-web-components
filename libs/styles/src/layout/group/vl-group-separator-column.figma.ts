// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=147-17248
// source=libs/styles/src/layout/group/vl-group.css.ts
// component=vlGroupStyles
// unmapped: variant
import figma from 'figma';

// `.vl-group--separator-column` is geen web component maar een CSS-klasse uit libs/styles.
// Dit Figma-component is een wrapper rond een `.vl-group (base)`-instance met variant
// "--column + --stretch-children"; het heeft geen eigen Slot-property. De scheidingslijnen
// komen van `vl-group--separator-column`, dat de wrapper zelf toevoegt.
// De combinatie komt overeen met de story "vl-group - accordions" (column + stretch-children +
// separator-column).
//
// Bewust niet gemapt: de variant-as met de waarden "default" en "vl-accordion". Die tonen
// welk soort inhoud in de groep zit, niet een CSS-modifier.
// De bijhorende modifiers `vl-group--separator-column-before` en
// `vl-group--separator-column-after` bestaan wel in de CSS maar hebben geen Figma-property.

export default {
    example: figma.code`<div class="vl-group vl-group--column vl-group--stretch-children vl-group--separator-column"></div>`,
    id: 'vl-group--separator-column',
    metadata: { nestable: true },
};
