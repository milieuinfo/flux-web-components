// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=8-6178
// source=libs/styles/src/layout/content-block/vl-content-block.css.ts
// component=vlContentBlockStyles
import figma from 'figma';

const instance = figma.selectedInstance;

// `.vl-content-block` is geen web component maar een CSS-klasse uit libs/styles.
// De CSS kent maar één modifier: `vl-content-block--full-width`.
// De twee "deprecated"-varianten zijn legacy-kopieën van "default" en "--full-width" en
// leveren dezelfde output.
const modifier = instance.getEnum('variant', {
    'deprecated (use default)': '',
    'deprecated (use --full-width)': ' vl-content-block--full-width',
    default: '',
    '--full-width': ' vl-content-block--full-width',
});

const slot = instance.getSlot('slot');

export default {
    example: figma.code`<div class="vl-content-block${modifier}">${slot}</div>`,
    id: 'vl-content-block',
    metadata: { nestable: true },
};
