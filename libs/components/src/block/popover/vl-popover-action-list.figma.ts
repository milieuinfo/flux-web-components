// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=827-310
// source=libs/components/src/block/popover/vl-popover-action-list.component.ts
// component=VlPopoverActionListComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-as `content-padding` (none/small/medium/large) heeft geen attribuut op
// vl-popover-action-list: in code zit `content-padding` op de omliggende vl-popover. De waarde wordt
// daarom niet hier uitgeschreven maar via `metadata.props` doorgegeven aan het vl-popover-template,
// dat er het attribuut van maakt. Staat de actielijst niet in een vl-popover, dan gaat de waarde
// verloren — dat is dan ook geen geldige opstelling in code.
const contentPadding = instance.getEnum('content-padding', {
    none: 'none',
    small: 'small',
    medium: 'medium',
    large: 'large',
});

const actions = instance.getSlot('actions');

export default {
    example: figma.code`<vl-popover-action-list>${actions}</vl-popover-action-list>`,
    id: 'vl-popover-action-list',
    metadata: { nestable: true, props: { contentPadding } },
};
