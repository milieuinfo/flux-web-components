// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=554-46061
// source=libs/styles/src/layout/stacked/vl-stacked.css.ts
// component=vlStackedStyles
import figma from 'figma';

const instance = figma.selectedInstance;

// `.vl-stacked` is geen web component maar een CSS-klasse uit libs/styles.
// De maat-klassen gebruiken één streepje (`vl-stacked-small`), geen BEM-modifier met twee
// streepjes; de Figma-variantnamen bevatten de klassenaam letterlijk (met een punt ervoor).
const size = instance.getEnum('variant', {
    '.vl-stacked-small': 'vl-stacked-small',
    '.vl-stacked-medium': 'vl-stacked-medium',
    '.vl-stacked-large': 'vl-stacked-large',
});

const slot = instance.getSlot('slot');

export default {
    example: figma.code`<div class="vl-stacked ${size}">${slot}</div>`,
    id: 'vl-stacked',
    metadata: { nestable: true },
};
