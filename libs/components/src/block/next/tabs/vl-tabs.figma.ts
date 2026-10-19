// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=840-4970
// source=libs/components/src/block/next/tabs/vl-tabs.component.ts
// component=VlTabsComponent
// unmapped: variant
// code-only vl-tabs-next: label, mobile
import figma from 'figma';
import { booleanProperty } from '../../../../../../resources/code-connect/boolean-property';

const instance = figma.selectedInstance;

// De Figma-`Slot` bevat losse vl-tab-instances; dat sluit aan bij vl-tabs-next (tabs als directe
// kinderen) en niet bij het oude vl-tabs (dat de tabs zelf afleidt uit vl-tabs-pane-kinderen).
// De as `variant` (desktop / mobile / desktop (deprecated)) is enkel de responsieve weergave:
// in code schakelt vl-tabs-next zelf naar de mobiele dropdown, dus er is geen attribuut voor.
// `label` en `horizontal-navigation` bestaan enkel in code.
// De boolean `border` toont de lijn onder de tabs; uit is `no-border`. Een oudere library zonder de boolean toonde de
// lijn altijd.
const border = booleanProperty(instance, 'border', true);
const slot = instance.getSlot('Slot');

export default {
    example: figma.code`<vl-tabs-next${border ? '' : ' no-border'}>
    ${slot}
</vl-tabs-next>`,
    id: 'vl-tabs-next',
    metadata: { nestable: true },
};
