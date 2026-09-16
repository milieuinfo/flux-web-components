// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=182-64325
// source=libs/components/src/block/properties/vl-properties.component.ts
// component=VlPropertiesComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// `vl-property` en `vl-property-data` zijn geen aparte web components: het zijn light-DOM tags die door
// vl-properties (vl-properties.builder.ts) worden uitgelezen. Daarom verwijst `source` naar vl-properties.
// De Figma-as `variant` codeert twee dimensies: `collapsed` wordt in code bepaald door de wrapper in vl-properties
// (niet door de property zelf) en wordt hier niet gemapt; `data slot` vervangt de datatekst door een generieke
// slot-placeholder (instance "[Flux] Slot (framed)", geen SLOT-property) en levert een lege vl-property-data op.
const variant: { dataSlot?: boolean } =
    instance.getEnum('variant', {
        default: {},
        collapsed: {},
        'data slot': { dataSlot: true },
        'data slot collapsed': { dataSlot: true },
    }) ?? {};

// Label en data zitten in de tekstlagen "↳ label" en "↳ data" en hangen niet aan een component-property.
const labelLayer = instance.findText('↳ label');
const label = labelLayer && labelLayer.type === 'TEXT' ? escapeHtml(labelLayer.textContent) : '';
const dataLayer = variant.dataSlot ? null : instance.findText('↳ data');
const data = dataLayer && dataLayer.type === 'TEXT' ? escapeHtml(dataLayer.textContent) : '';

export default {
    example: figma.code`<vl-property>${label}</vl-property>
<vl-property-data>${data}</vl-property-data>`,
    id: 'vl-property',
    metadata: { nestable: true },
};
