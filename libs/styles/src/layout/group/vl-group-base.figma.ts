// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=25-3364
// source=libs/styles/src/layout/group/vl-group.css.ts
// component=vlGroupStyles
import figma from 'figma';

const instance = figma.selectedInstance;

// `.vl-group (base)` is geen web component maar de CSS-klasse `vl-group` uit libs/styles.
// Dit is het basiscomponent met alle modifiers op één variant-as; de andere Figma-componenten
// (.vl-group, .vl-group--column, ...) zijn wrappers rond een instance hiervan.
// De "(deprecated)"-varianten zijn legacy-kopieën en leveren dezelfde klassen als hun
// niet-deprecated tegenhanger.
// Modifiers die wél in vl-group.css.ts bestaan maar geen Figma-variant hebben, worden hier
// niet gegenereerd: `--stretch-children` los, `--separator-row-before/-after`,
// `--separator-column(-before/-after)` en `--collapse-l/-m/-s/-xs`.
const modifier = instance.getEnum('variant', {
    'deprecated (use default)': '',
    default: '',
    '--column (deprecated)': ' vl-group--column',
    '--column': ' vl-group--column',
    '--column + --stretch-children (deprecated)': ' vl-group--column vl-group--stretch-children',
    '--column + --stretch-children': ' vl-group--column vl-group--stretch-children',
    '--input-group (deprecated)': ' vl-group--input-group',
    '--input-group': ' vl-group--input-group',
    '--no-gap': ' vl-group--no-gap',
    '--no-row-gap': ' vl-group--no-row-gap',
    '--no-column-gap': ' vl-group--no-column-gap',
    '--wrap': ' vl-group--wrap',
    '--space-between': ' vl-group--space-between',
    '--justify-start': ' vl-group--justify-start',
    '--justify-center': ' vl-group--justify-center',
    '--justify-end': ' vl-group--justify-end',
    '--align-start': ' vl-group--align-start',
    '--align-center': ' vl-group--align-center',
    '--align-end': ' vl-group--align-end',
    '--baseline': ' vl-group--baseline',
    '--separator-row': ' vl-group--separator-row',
});

const slot = instance.getSlot('Slot');

export default {
    example: figma.code`<div class="vl-group${modifier}">${slot}</div>`,
    id: 'vl-group-base',
    metadata: { nestable: true },
};
