// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=563-51146
// source=libs/styles/src/layout/section/vl-section.css.ts
// component=vlSectionStyles
import figma from 'figma';

const instance = figma.selectedInstance;

// `.vl-section` is geen web component maar een CSS-klasse uit libs/styles.
// De Figma-as `variant` mapt één op één op de modifier-klassen uit vl-section.css.ts.
// De waarde "deprecated (use default)" is een legacy-variant zonder eigen CSS-modifier en
// levert dus dezelfde output als "default".
const modifier = instance.getEnum('variant', {
    'deprecated (use default)': '',
    default: '',
    '--alt': ' vl-section--alt',
    '--small': ' vl-section--small',
    '--medium': ' vl-section--medium',
    '--bordered': ' vl-section--bordered',
    '--overlap': ' vl-section--overlap',
});

const slot = instance.getSlot('slot');

export default {
    example: figma.code`<section class="vl-section${modifier}">${slot}</section>`,
    id: 'vl-section',
    metadata: { nestable: true },
};
