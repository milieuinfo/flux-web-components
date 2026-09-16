// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=987-2
// source=libs/components/src/block/rich-data/vl-rich-data.component.ts
// component=VlRichData
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-set heeft twee booleans: `open` (filterpaneel zichtbaar) en `pagination` (vl-pager onderaan).
// `open` mapt op het ontbreken van `filter-closed`. Het ontwerp toont altijd de "Filter"-toggleknop, wat in code
// overeenkomt met `filter-closable` (zonder dat attribuut is een gesloten filter niet opnieuw te openen).
// `pagination` heeft geen attribuut: de pager is slot-content (`slot="pager"`) en wordt als hint meegegeven.
// De geneste vl-search-filter, de resultaten en de "geen resultaten"-tekst zijn eveneens slots
// (`filter`, `content`, `no-content`); de sorteer-slot (`sorter`) komt niet voor in het ontwerp.
// `filter-max-width` heeft geen Figma-equivalent.
const open = instance.getBoolean('open');
const pagination = instance.getBoolean('pagination');

const pager = pagination
    ? `
    <vl-pager slot="pager" total-items="..." items-per-page="..." current-page="1"></vl-pager>`
    : '';

export default {
    example: figma.code`<vl-rich-data filter-closable${open ? '' : ' filter-closed'}>
    <vl-search-filter slot="filter">
        <form>...</form>
    </vl-search-filter>
    <div slot="content">...</div>
    <span slot="no-content">Geen resultaten gevonden</span>${pager}
</vl-rich-data>`,
    id: 'vl-rich-data',
    metadata: { nestable: false },
};
