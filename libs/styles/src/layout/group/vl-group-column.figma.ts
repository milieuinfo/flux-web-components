// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=25-3755
// source=libs/styles/src/layout/group/vl-group.css.ts
// component=vlGroupStyles
import figma from 'figma';

// `.vl-group--column` is geen web component maar een CSS-klasse uit libs/styles.
// Dit Figma-component is een wrapper rond een `.vl-group (base)`-instance met variant "--column";
// het heeft zelf geen properties (ook geen eigen Slot-property), dus er valt niets te mappen.
// De inhoud van de groep komt in code als gewone child-elementen.

export default {
    example: figma.code`<div class="vl-group vl-group--column"></div>`,
    id: 'vl-group--column',
    metadata: { nestable: true },
};
