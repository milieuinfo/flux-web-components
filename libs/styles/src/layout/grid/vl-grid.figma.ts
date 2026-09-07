// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=149-17584
// source=libs/styles/src/layout/grid/vl-grid.css.ts
// component=vlGridStyles
import figma from 'figma';

const instance = figma.selectedInstance;

// `.vl-grid` is geen web component maar een CSS-klasse uit libs/styles.
// Het Figma-component heeft enkel een `Slot`-property, geen variant-as: de kolomindeling
// wordt in code bepaald door `vl-column`-klassen op de kinderen (bv.
// `vl-column--6 vl-column--m-12`) en is in Figma niet als property gemodelleerd.
// De modifiers uit vl-grid.css.ts (`vl-grid--justify-items-*` en `vl-grid--align-items-*`,
// met hun m-/s-/xs-varianten) hebben eveneens geen Figma-property.
const slot = instance.getSlot('Slot');

export default {
    example: figma.code`<div class="vl-grid">${slot}</div>`,
    id: 'vl-grid',
    metadata: { nestable: true },
};
