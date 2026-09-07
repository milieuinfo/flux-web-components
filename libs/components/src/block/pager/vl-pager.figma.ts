// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=204-2270
// source=libs/components/src/block/pager/vl-pager.component.ts
// component=VlPagerComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// `paginated` is het code-default (paginanummers zichtbaar); `simple` toont enkel vorige/volgende
// en komt overeen met het `pagination-disabled`-attribuut.
const paginationDisabled = instance.getEnum('Type', {
    simple: true,
    paginated: false,
});

// Het totaal aantal items zit in de tekstlaag "637" (laagnaam = voorbeeldwaarde) zonder component-property.
// De tekstlagen "11 - 29" en "van" zijn afgeleide weergave; `items-per-page` en `current-page` zijn er niet
// betrouwbaar uit af te leiden en worden niet gemapt. De uitlijning (`align-center`/`align-right`) zit niet in Figma.
const totalItemsLayer = instance.findText('637');
const totalItems = totalItemsLayer && totalItemsLayer.type === 'TEXT' ? escapeHtml(totalItemsLayer.textContent) : '';

export default {
    example: figma.code`<vl-pager total-items="${totalItems}"${paginationDisabled ? ' pagination-disabled' : ''}></vl-pager>`,
    id: 'vl-pager',
    metadata: { nestable: true },
};
