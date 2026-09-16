// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=161-40454
// source=libs/styles/src/layout/separator/vl-separator.css.ts
// component=vlSeparatorStyles
import figma from 'figma';

// `.vl-separator-wave` is geen web component maar een CSS-klasse uit libs/styles.
// Het Figma-component heeft geen properties; het golfpatroon is in code de
// achtergrondafbeelding van de klasse.
// Let op: deze klasse gebruikt één streepje (`vl-separator-wave`), geen BEM-modifier.

export default {
    example: figma.code`<hr class="vl-separator-wave" />`,
    id: 'vl-separator-wave',
    metadata: { nestable: true },
};
