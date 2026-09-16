// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=25-3782
// source=libs/styles/src/layout/group/vl-group.css.ts
// component=vlGroupStyles
import figma from 'figma';

// `.vl-group--stretch-children` is geen web component maar een CSS-klasse uit libs/styles.
// Dit Figma-component is een wrapper rond een `.vl-group (base)`-instance; het heeft zelf geen
// properties (ook geen eigen Slot-property), dus er valt niets te mappen.
// Let op (Figma ≠ code): de naam vermeldt enkel `--stretch-children`, maar de onderliggende
// base-instance staat op de variant "--column + --stretch-children". De output volgt wat Figma
// effectief toont — en komt overeen met de stories, waar `vl-group--stretch-children` altijd
// samen met `vl-group--column` gebruikt wordt.

export default {
    example: figma.code`<div class="vl-group vl-group--column vl-group--stretch-children"></div>`,
    id: 'vl-group--stretch-children',
    metadata: { nestable: true },
};
