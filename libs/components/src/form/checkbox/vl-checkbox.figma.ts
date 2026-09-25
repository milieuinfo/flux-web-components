// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=11-7786
// source=libs/components/src/form/checkbox/vl-checkbox.component.ts
// component=VlCheckboxComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-set heeft één as `variant` (default | switch) die het `switch`-attribuut stuurt.
// Een bestand met een oudere versie van de library kan de as missen; `getEnum` geeft dan een foutobject terug in
// plaats van `undefined`. De vergelijking met `true` houdt de waarde dan op false.
const isSwitch =
    instance.getEnum('variant', {
        default: false,
        switch: true,
    }) === true;

// De labeltekst zit in de tekstlaag "↳ text" van de geneste instance "checkbox" / "checkbox switch".
const text = instance.findText('↳ text', { traverseInstances: true });
const label = text && text.type === 'TEXT' ? escapeHtml(text.textContent) : '';

// Checked/disabled/error zitten niet op de hoofdset maar op de geneste (niet-gepubliceerde) basis-instance
// "↳ Checkbox base" (default) of "↳ Switch base" (switch): as `check` en as `state`.
// Binnen de hoofdset zijn enkel `check=false` en `state=Default` zichtbaar; de overige waarden lezen we raw
// (hoofdletterongevoelig) uit, naar analogie met "Radio base" (Default | Error | Disabled | Success).
const checkboxBase = instance.findInstance('↳ Checkbox base', { traverseInstances: true });
const switchBase = instance.findInstance('↳ Switch base', { traverseInstances: true });
const base =
    checkboxBase && checkboxBase.type === 'INSTANCE'
        ? checkboxBase
        : switchBase && switchBase.type === 'INSTANCE'
          ? switchBase
          : null;
const check = base ? String(base.getPropertyValue('check')).toLowerCase() : '';
const state = base ? String(base.getPropertyValue('state')).toLowerCase() : '';
const checked = check === 'true';
const disabled = state === 'disabled';
const error = state === 'error';
const success = state === 'success';

// Bewust niet gemapt:
// - "↳ Show Error Label" (BOOLEAN op de geneste instance): de foutboodschap is in code een aparte
//   vl-form-message, geen attribuut van vl-checkbox.
// - `size` (M) op "↳ Checkbox base": vl-checkbox heeft geen size-attribuut.

export default {
    example: figma.code`<vl-checkbox${isSwitch ? ' switch' : ''}${checked ? ' checked' : ''}${
        disabled ? ' disabled' : ''
    }${error ? ' error' : ''}${success ? ' success' : ''}>${label}</vl-checkbox>`,
    id: 'vl-checkbox',
    metadata: { nestable: true },
};
