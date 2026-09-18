// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=182-61297
// source=libs/components/src/block/properties/vl-properties.component.ts
// component=VlPropertiesComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-as `variant` bepaalt in code de wrapper-div rond de properties: geen wrapper (default),
// `<div class="column">` per kolom (column) of `<div class="stacked">` (collapsed; `stacked` vervangt
// de deprecated class `collapsed`). De deprecated Figma-waarden mappen op hun vervanger.
const layout = instance.getEnum('variant', {
    default: 'default',
    column: 'column',
    collapsed: 'stacked',
    'deprecated (use default)': 'default',
    'deprecated (use column)': 'column',
    'deprecated (use collapsed)': 'stacked',
});

// De Figma-boolean `padding-bottom` toont de witruimte onderaan; in code is dat het omgekeerde attribuut `no-padding-bottom`.
const paddingBottom = instance.getBoolean('padding-bottom');

// `Slot` bevat de (eerste kolom) properties, `Slot2` de tweede kolom (enkel in de column-variant).
// `label-width`, `value-bold` en de `props`-property zitten niet in Figma.
const slot = instance.getSlot('Slot');
const slot2 = instance.getSlot('Slot2');

let body;
if (layout === 'column') {
    body = figma.code`<div class="column">${slot}</div>${slot2 ? figma.code`<div class="column">${slot2}</div>` : ''}`;
} else if (layout === 'stacked') {
    body = figma.code`<div class="stacked">${slot}</div>`;
} else {
    body = figma.code`${slot}${slot2 ? slot2 : ''}`;
}

export default {
    example: figma.code`<vl-properties${paddingBottom ? '' : ' no-padding-bottom'}>${body}</vl-properties>`,
    id: 'vl-properties',
    metadata: { nestable: true },
};
