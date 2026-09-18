// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=990-21301
// source=libs/components/src/block/rich-data-table/vl-rich-data-table.component.ts
// component=VlRichDataTable
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-component heeft zelf geen properties; ze bestaat uit één geneste vl-rich-data-instance met de booleans
// `open` (filterpaneel zichtbaar) en `pagination` (vl-pager onderaan). Die worden hier uitgelezen en gemapt zoals
// bij vl-rich-data: `open` → ontbreken van `filter-closed` (samen met `filter-closable`), `pagination` → slot-hint.
// De tabelkolommen (vl-rich-data-field), `data`, `caption`/`label`, `zebra`, `flux-zebra`, `collapsed-*`,
// `multi-sort` en `filter-max-width` hebben geen Figma-equivalent en worden als hint/weggelaten getoond.
const richData = instance.findInstance('🧩 vl-rich-data');
let open = true;
let pagination = false;
if (richData && richData.type === 'INSTANCE') {
    open = String(richData.getPropertyValue('open')) === 'true';
    pagination = String(richData.getPropertyValue('pagination')) === 'true';
}

const pager = pagination
    ? `
    <vl-pager slot="pager" total-items="..." items-per-page="..." current-page="1"></vl-pager>`
    : '';

export default {
    example: figma.code`<vl-rich-data-table caption="..." filter-closable${open ? '' : ' filter-closed'}>
    <vl-rich-data-field name="..." label="..." selector="..."></vl-rich-data-field>
    <vl-search-filter slot="filter">
        <form>...</form>
    </vl-search-filter>
    <span slot="no-content">Geen resultaten gevonden</span>${pager}
</vl-rich-data-table>`,
    id: 'vl-rich-data-table',
    metadata: { nestable: false },
};
