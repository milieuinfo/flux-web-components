// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=161-39758
// source=libs/styles/src/layout/separator/vl-separator.css.ts
// component=vlSeparatorStyles
import figma from 'figma';

// `.vl-separator` is geen web component maar een CSS-klasse uit libs/styles.
// Het Figma-component heeft geen properties en geen variant-as; de drie stijlen
// (`vl-separator`, `vl-separator-slash`, `vl-separator-wave`) zijn aparte Figma-componenten
// met elk een eigen template.

export default {
    example: figma.code`<hr class="vl-separator" />`,
    id: 'vl-separator',
    metadata: { nestable: true },
};
