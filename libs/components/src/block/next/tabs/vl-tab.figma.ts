// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=188-70627
// source=libs/components/src/block/next/tabs/vl-tab.component.ts
// component=VlTabComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `state` mengt het attribuut `selected` (active) met een interactietoestand (hover).
// `hover` heeft geen attribuut en wordt niet gemapt; `link` is de gewone, niet-geselecteerde tab.
const state: { selected?: boolean } =
    instance.getEnum('state', {
        link: {},
        active: { selected: true },
        hover: {},
    }) ?? {};

// Het tab-label zit in de tekstlaag "↳ Label name" en hangt niet aan een component-property.
// `id` en `panel` zijn verplicht in code maar zitten niet in Figma; ze blijven leeg.
const labelLayer = instance.findText('↳ Label name');
const label = labelLayer && labelLayer.type === 'TEXT' ? escapeHtml(labelLayer.textContent) : '';

export default {
    example: figma.code`<vl-tab-next id="" panel=""${state.selected ? ' selected' : ''}>${label}</vl-tab-next>`,
    id: 'vl-tab-next',
    metadata: { nestable: true },
};
