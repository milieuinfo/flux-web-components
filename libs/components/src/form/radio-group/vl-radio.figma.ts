// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=381-716
// source=libs/components/src/form/radio-group/vl-radio.component.ts
// component=VlRadioComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De as `variant` codeert de state; in code zijn dat de boolean attributen error, disabled en success.
const variant: { error?: boolean; disabled?: boolean; success?: boolean } =
    instance.getEnum('variant', {
        default: {},
        error: { error: true },
        disabled: { disabled: true },
        success: { success: true },
    }) ?? {};

// De labeltekst zit in de tekstlaag "↳ text" en hangt niet aan een component-property.
const text = instance.findText('↳ text');
const label = text && text.type === 'TEXT' ? escapeHtml(text.textContent) : '';

// De checked-state zit op de geneste (niet-gepubliceerde) instance "Radio base" (as `Checked?`);
// de disabled-variant gebruikt de laagnaam "◇ Radio base". Binnen de set is enkel `False` zichtbaar,
// de waarde wordt daarom raw (hoofdletterongevoelig) vergeleken met "true".
const radioBase = instance.findInstance('Radio base');
const radioBaseDisabled = instance.findInstance('◇ Radio base');
const base =
    radioBase && radioBase.type === 'INSTANCE'
        ? radioBase
        : radioBaseDisabled && radioBaseDisabled.type === 'INSTANCE'
          ? radioBaseDisabled
          : null;
const checked = base ? String(base.getPropertyValue('Checked?')).toLowerCase() === 'true' : false;

// Bewust niet gemapt:
// - "↳ Show Error Label" (BOOLEAN): de foutboodschap is in code een aparte vl-form-message onder de
//   vl-radio-group, geen attribuut van vl-radio.
// - "↳ Annotation" (BOOLEAN) + tekstlaag "↳ Annotation": vl-radio heeft geen annotatie-attribuut of -slot.
// - "Focus?" op "Radio base": focus is een runtime-state.

export default {
    example: figma.code`<vl-radio${checked ? ' checked' : ''}${variant.disabled ? ' disabled' : ''}${
        variant.error ? ' error' : ''
    }${variant.success ? ' success' : ''}>${label}</vl-radio>`,
    id: 'vl-radio',
    metadata: { nestable: true },
};
