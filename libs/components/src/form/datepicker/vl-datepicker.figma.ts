// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=25-4221
// source=libs/components/src/form/datepicker/vl-datepicker.component.ts
// component=VlDatepickerComponent
// code-only vl-datepicker: am-pm, autocomplete, block, blur-validation, describedby, disable-mask-validation, format
// code-only vl-datepicker: inline-positioning, label, max-date, max-time, min-date, min-time, name, pattern
// code-only vl-datepicker: placeholder, position, raw-value, readonly, required, static, value
import figma from 'figma';

const instance = figma.selectedInstance;

// De as `variant` (date | date-time | time | range) komt overeen met het `type`-attribuut in code.
// `date` is de default in code en wordt niet uitgeschreven.
// Een bestand met een oudere versie van de library kan de as missen; `getEnum` geeft dan een foutobject terug in
// plaats van `undefined`.
const typeValue = instance.getEnum('variant', {
    date: '',
    'date-time': 'date-time',
    time: 'time',
    range: 'range',
});
const type = typeof typeValue === 'string' ? typeValue : '';

// De as `state` (default | error | success | disabled) komt overeen met de gelijknamige boolean attributen;
// de waarde staat al met een spatie ervoor in de markup.
const stateValue = instance.getEnum('state', {
    default: '',
    error: ' error',
    success: ' success',
    disabled: ' disabled',
});
const state = typeof stateValue === 'string' ? stateValue : '';

// Bewust niet gemapt:
// - `position` (INSTANCE_SWAP): een interne "auto datepicker"-instance met de open/gesloten dropdown.
//   Het code-attribuut `position` betekent iets anders (Flatpickr-positionering van de kalender).
// - `open` en "Show time" op de geneste dropdown: runtime-state, respectievelijk afgeleid van `type`.

export default {
    example: figma.code`<vl-datepicker${type ? ` type="${type}"` : ''}${state}></vl-datepicker>`,
    id: 'vl-datepicker',
    metadata: { nestable: true },
};
