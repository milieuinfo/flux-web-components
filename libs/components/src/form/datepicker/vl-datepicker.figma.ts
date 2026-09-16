// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=25-4221
// source=libs/components/src/form/datepicker/vl-datepicker.component.ts
// component=VlDatepickerComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// De as `variant` (date | date-time | time) komt overeen met het `type`-attribuut in code.
// `date` is de default in code en wordt niet uitgeschreven. Het code-type `range` heeft geen Figma-variant.
const type = instance.getEnum('variant', {
    date: '',
    'date-time': 'date-time',
    time: 'time',
});

// Bewust niet gemapt:
// - `position` (INSTANCE_SWAP): een interne "auto datepicker"-instance met de open/gesloten dropdown.
//   Het code-attribuut `position` betekent iets anders (Flatpickr-positionering van de kalender).
// - `open` en "Show time" op de geneste dropdown: runtime-state, respectievelijk afgeleid van `type`.

export default {
    example: figma.code`<vl-datepicker${type ? ` type="${type}"` : ''}></vl-datepicker>`,
    id: 'vl-datepicker',
    metadata: { nestable: true },
};
