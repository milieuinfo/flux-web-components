// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=161-40458
// source=libs/styles/src/layout/separator/vl-separator.css.ts
// component=vlSeparatorStyles
import figma from 'figma';

// `.vl-separator-slash` is geen web component maar een CSS-klasse uit libs/styles.
// Het Figma-component heeft geen properties; het schuine streepjespatroon zit in de geneste
// laag "vl-separator-slash-line", die in code de achtergrondafbeelding van de klasse is.
// Let op: deze klasse gebruikt één streepje (`vl-separator-slash`), geen BEM-modifier.

export default {
    example: figma.code`<hr class="vl-separator-slash" />`,
    id: 'vl-separator-slash',
    metadata: { nestable: true },
};
