import { html, TemplateResult } from 'lit';

import { API_GAP_ROWS } from './api-gap-rows';

export type DetailStatus = 'vds' | 'flux' | 'shape';

export type ApiDetailCat = 'prop' | 'event' | 'method' | 'slot' | 'part' | 'gedrag';

export type ApiDetailRow = {
    comp: string;
    cat: ApiDetailCat;
    feat: string;
    vds: string;
    flux: string;
    status: DetailStatus;
};

export const API_DETAIL_ROWS: ApiDetailRow[] = [
    { comp: 'vl-button', cat: 'prop', feat: 'link-rendering als <a>', vds: 'href', flux: 'cta-link', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'icoon voor/na label', vds: 'icon-before / icon-after', flux: 'icon + icon-placement', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'variant', vds: 'variant enum (primary/secondary/tertiary/quaternary)', flux: 'booleans secondary/tertiary/ghost', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'size', vds: 'size enum (s/m/l)', flux: 'large (geen small/medium)', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'danger-styling', vds: 'danger', flux: 'nee (enkel error)', status: 'vds' },
    { comp: 'vl-button', cat: 'prop', feat: 'success-styling', vds: 'success', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'prop', feat: 'icon-only knop', vds: 'icon-button', flux: 'leeg slot + label', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'grow', vds: 'grow enum (hug/fill)', flux: 'block (~fill)', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'wide / narrow', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'prop', feat: 'toggle-knop', vds: 'nee', flux: 'toggle / on / controlled', status: 'flux' },
    { comp: 'vl-button', cat: 'prop', feat: 'download (op link)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'prop', feat: 'external (target + rel + icoon)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'prop', feat: 'input-group positionering', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'event', feat: 'vl-click payload', vds: 'detail { originalEvent }', flux: 'geen detail', status: 'shape' },
    { comp: 'vl-button', cat: 'event', feat: 'vl-toggle', vds: 'nee', flux: 'detail { on }', status: 'flux' },
    { comp: 'vl-button', cat: 'method', feat: 'click()', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'slot', feat: 'icon-before / icon-after', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'slot', feat: 'loading-icon / loading-text', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'part', feat: 'link', vds: 'nee (link is ook part=button)', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'part', feat: 'icon', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'part', feat: 'danger / success / loading', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'gedrag', feat: 'delegatesFocus', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-input', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id', status: 'shape' },
    { comp: 'vl-input', cat: 'prop', feat: 'clearable (wis-knop)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'prop', feat: 'loading', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'prop', feat: 'layout-chrome (size, annotation, indicator, metadata-hidden, label-hidden)', vds: 'ja (VlFormLayoutElement)', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-input', cat: 'prop', feat: 'melding-mechanisme', vds: 'intern (message-prop/slot)', flux: 'los vl-form-message (for + state)', status: 'shape' },
    { comp: 'vl-input', cat: 'prop', feat: 'extra validators', vds: 'nee', flux: 'min-exclusive / max-exclusive / regex', status: 'flux' },
    { comp: 'vl-input', cat: 'prop', feat: 'input-group', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-input', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-input', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee (native validity)', flux: 'ja', status: 'flux' },
    { comp: 'vl-input', cat: 'method', feat: 'validity-getters + formResetCallback', vds: 'ja', flux: 'nee (deels, via mixin)', status: 'vds' },
    { comp: 'vl-input', cat: 'slot', feat: 'prefix / suffix', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'part', feat: 'prefix / suffix / clear-button', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'part', feat: 'container + chrome-parts', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'gedrag', feat: 'wis-knop (leegt, herfocust, vl-change)', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-textarea', cat: 'prop', feat: 'resize (none/vertical/horizontal/both)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'loading + layout-chrome (size, annotation, indicator, metadata/label-hidden)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'character-count (ingebouwde teller)', vds: 'nee (footnote-slot)', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'rows / cols', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'event', feat: 'vl-input', vds: 'nee (enkel vl-change)', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'slot', feat: 'footnote', vds: 'ja', flux: 'nee (ingebouwde teller)', status: 'vds' },
    { comp: 'vl-textarea', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-textarea', cat: 'part', feat: 'footnote + chrome-parts', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-textarea', cat: 'gedrag', feat: 'tekentelling met aria-live', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'gedrag', feat: 'Enter submit uitgezet (submitFormOnEnter=false)', vds: 'n.v.t.', flux: 'ja', status: 'flux' },

    { comp: 'vl-select', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id', status: 'shape' },
    { comp: 'vl-select', cat: 'prop', feat: 'loading + layout-chrome', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'prop', feat: 'zichtbaar label', vds: 'label-prop + slot', flux: 'enkel aria-label', status: 'shape' },
    { comp: 'vl-select', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-select', cat: 'prop', feat: 'wisbaar', vds: 'clearable (opt-in)', flux: 'not-deletable (opt-out)', status: 'shape' },
    { comp: 'vl-select', cat: 'prop', feat: 'options programmatisch', vds: 'nee (geslotte <option>)', flux: 'options / initial-options', status: 'flux' },
    { comp: 'vl-select', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-select', cat: 'event', feat: 'per-toets event', vds: 'native input re-dispatch', flux: 'vl-input', status: 'shape' },
    { comp: 'vl-select', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-select', cat: 'method', feat: 'setCustomValidity', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'method', feat: 'selectedValue / selectedIndex / selectedOptions', vds: 'ja', flux: 'nee (options-model)', status: 'vds' },
    { comp: 'vl-select', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'part', feat: 'select / clear-button', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'part', feat: 'container + chrome-parts', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'gedrag', feat: 'data-alt-label (korte label in trigger)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'gedrag', feat: 'hug-width (auto-breedte naar langste optie)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'gedrag', feat: 'weergave', vds: 'native select met appearance: base-select (VDS tekent ook de uitklaplijst)', flux: 'native select met appearance: none (uitklaplijst van het besturingssysteem)', status: 'shape' },

    { comp: 'vl-datepicker', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'loading + layout-chrome', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'min/max grens', vds: 'min / max', flux: 'min-date / max-date', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'type (range / time / date-time)', vds: 'nee (single date)', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'min-time / max-time / am-pm', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'display-format', vds: 'locale-gedreven Intl', flux: 'format-tokens (flatpickr)', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'locale / first-day-of-week', vds: 'ja', flux: 'nee (hardcoded nl)', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'months (meerdere naast elkaar)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'disabledDates', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'outside-days-hidden / today-button-hidden', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'position / static / anchor-positioning', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'pattern / raw-value / disable-mask-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'event', feat: 'vl-change payload', vds: 'detail { value: Date, formattedValue }', flux: 'detail { value: ISO }', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'event', feat: 'vl-open / vl-close / vl-focus / vl-blur', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'method', feat: 'open() / close() / clear()', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'method', feat: 'goToDate / goToToday / goToPrevious/NextMonth', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'method', feat: 'setCustomValidity', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'method', feat: 'getRawValue / getDates', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'slot', feat: 'error-message / suffix', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'part', feat: 'input / toggle-button / calendar / input-wrapper', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'gedrag', feat: 'kalender-lib', vds: 'Cally', flux: 'flatpickr', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'gedrag', feat: 'input-masking tijdens typen', vds: 'nee', flux: 'ja (cleave.js)', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'gedrag', feat: '"Vandaag"-shortcut + meerdere maanden', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-checkbox', cat: 'prop', feat: 'value', vds: 'defaultValue (attr value)', flux: 'value', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'label-mechanisme', vds: 'prop in shadow gerenderd', flux: 'default-slot (prop = aria-label)', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id (auto)', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'readonly', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'loading', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'tile (kaart-layout)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'label-hidden', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'default-checked (reset-waarde)', vds: 'ja', flux: 'nee (intern snapshot)', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'switch-variant (role=switch)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-checkbox', cat: 'event', feat: 'vl-change payload', vds: 'detail { value, checked }', flux: 'detail { checked, value?, currentTarget }', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'event', feat: 'vl-input', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-checkbox', cat: 'event', feat: 'vl-valid', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-checkbox', cat: 'slot', feat: 'prefix / suffix / content', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'part', feat: 'input / checkbox / label / tile / prefix / suffix / content', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-radio-group', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'label-render', vds: 'zichtbaar', flux: 'visually-hidden legend', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'loading + layout-chrome (annotation, indicator, size, metadata/label-hidden)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'tiles', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-radio-group', cat: 'event', feat: 'vl-change op groepsniveau', vds: 'ja', flux: 'nee (niet her-dispatcht)', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'event', feat: 'native input (form-compatibel)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-radio-group', cat: 'method', feat: 'focus() (routeert naar checked/eerste enabled)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'part', feat: 'container / radios', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'gedrag', feat: 'roving tabindex (expliciet 0/-1)', vds: 'ja', flux: 'nee (delegatesFocus)', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'gedrag', feat: 'state-propagatie met author-override-tracking', vds: 'ja (grondig)', flux: 'ja (simpeler)', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'gedrag', feat: 'vl-radio: event-model', vds: 'group dispatcht change', flux: 'radio dispatcht zelf', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'gedrag', feat: 'vl-radio: a11y-model', vds: 'custom role=radio', flux: 'native <input type=radio>', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'vl-radio: tile / grow', vds: 'ja / enum', flux: 'nee / block', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'vl-radio: readonly', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-radio-group', cat: 'slot', feat: 'vl-radio: prefix / suffix / content', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-fieldset', cat: 'gedrag', feat: 'base-laag', vds: 'WithFormLayout(VlFormControlElement)', flux: 'BaseLitElement (geen FormControl)', status: 'shape' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'groepslabel', vds: 'label-prop + slot label', flux: 'slot legend + legend-classes', status: 'shape' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'disabled/error/success/readonly/loading (+ propagatie)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'layout-chrome (annotation, indicator, message, size, grow, metadata/label-hidden)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'validation-/disabled-propagation-blocked', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'border (kader)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'horizontal (grid-layout)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'legend-classes', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-fieldset', cat: 'method', feat: 'propagateStateToChildren / slottedElements', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'slot', feat: 'message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'part', feat: 'fieldset / label / content / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'gedrag', feat: 'state-propagatie naar slotted kinderen', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'gedrag', feat: 'legende-klik focust eerste control', vds: 'nee', flux: 'ja', status: 'flux' },

    { comp: 'vl-icon', cat: 'prop', feat: 'icon-validatie', vds: 'reflect + dev-warn tegen enum', flux: 'getypeerd, geen runtime-check', status: 'shape' },
    { comp: 'vl-icon', cat: 'prop', feat: 'size', vds: 'enum (s/m/l)', flux: 'booleans small / large', status: 'shape' },
    { comp: 'vl-icon', cat: 'prop', feat: 'tag (wrapper i/span/div/p)', vds: 'ja', flux: 'nee (altijd span)', status: 'vds' },
    { comp: 'vl-icon', cat: 'prop', feat: 'rotated-half / rotated-full', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-icon', cat: 'prop', feat: 'toegankelijk label', vds: 'native aria-label (delegatie)', flux: 'label-prop naar aria-label', status: 'shape' },
    { comp: 'vl-icon', cat: 'prop', feat: 'left-margin / right-margin', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-icon', cat: 'prop', feat: 'light (kleurvariant)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-icon', cat: 'prop', feat: 'clickable (gedeprecieerd)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-icon', cat: 'slot', feat: 'default (inline SVG custom icoon)', vds: 'ja', flux: 'nee (enkel font-glyph)', status: 'vds' },
    { comp: 'vl-icon', cat: 'gedrag', feat: 'dev-warn bij ongeldige icon', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-icon', cat: 'gedrag', feat: 'wrapper-tag-validatie', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-title', cat: 'prop', feat: 'volledige component (type, appearance, underline, alt, no-space-bottom)', vds: 'geen VDS-component (enkel typografie-tokens)', flux: 'ja', status: 'flux' },
    { comp: 'vl-*-tag', cat: 'gedrag', feat: 'één component met modes', vds: '4 componenten (informative, removable, selectable, clickable)', flux: '1 component (closable, checkable, clickable)', status: 'shape' },
    { comp: 'vl-*-tag', cat: 'prop', feat: 'status', vds: 'status default/success/warning/error/info/highlight', flux: 'type success/warning/error', status: 'shape' },
    { comp: 'vl-*-tag', cat: 'prop', feat: 'disabled', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-*-tag', cat: 'prop', feat: 'variant (outlined)', vds: 'ja (informative: primary/secondary)', flux: 'nee', status: 'vds' },
    { comp: 'vl-*-tag', cat: 'prop', feat: 'truncate', vds: 'ja (informative)', flux: 'nee', status: 'vds' },
    { comp: 'vl-*-tag', cat: 'prop', feat: 'size', vds: 'ja (s/m/l)', flux: 'nee', status: 'vds' },
    { comp: 'vl-*-tag', cat: 'prop', feat: 'label van de verwijderknop', vds: 'close-label', flux: 'nee (vaste tekst)', status: 'vds' },
    { comp: 'vl-*-tag', cat: 'prop', feat: 'geselecteerd', vds: 'selected', flux: 'checked', status: 'shape' },
    { comp: 'vl-*-tag', cat: 'event', feat: 'verwijderen', vds: 'vl-remove', flux: 'close', status: 'shape' },
    { comp: 'vl-*-tag', cat: 'event', feat: 'selectie wijzigt', vds: 'vl-change (detail.value)', flux: 'check (detail.checked)', status: 'shape' },
    { comp: 'vl-*-tag', cat: 'event', feat: 'klik', vds: 'vl-click', flux: 'click', status: 'shape' },
    { comp: 'vl-*-tag', cat: 'method', feat: 'programmatisch', vds: 'requestRemove(), select(), deselect()', flux: 'nee', status: 'vds' },
    { comp: 'vl-*-tag', cat: 'slot', feat: 'icoon voor/na het label', vds: 'before / after', flux: 'nee', status: 'vds' },
    { comp: 'vl-*-tag', cat: 'gedrag', feat: 'selecteerbaar als', vds: 'toggle-button', flux: 'native checkbox in een label', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'prop', feat: 'open bij start', vds: 'open (ook live state)', flux: 'default-open (enkel bij start)', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'prop', feat: 'heading-niveau', vds: 'level h1 tot h6 of span', flux: 'heading-level 1 tot 6', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'prop', feat: 'visuele grootte los van niveau', vds: 'appearance', flux: 'nee', status: 'vds' },
    { comp: 'vl-collapsible', cat: 'prop', feat: 'breedte', vds: 'grow hug/fill', flux: 'nee', status: 'vds' },
    { comp: 'vl-collapsible', cat: 'prop', feat: 'trigger-tekst als attribuut', vds: 'nee (slot trigger)', flux: 'toggle-text', status: 'flux' },
    { comp: 'vl-collapsible', cat: 'prop', feat: 'andere tekst open/dicht', vds: 'nee', flux: 'open-toggle-text / close-toggle-text', status: 'flux' },
    { comp: 'vl-collapsible', cat: 'prop', feat: 'disabled', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-collapsible', cat: 'prop', feat: 'stijlvarianten', vds: 'nee', flux: 'bold, alt-background, content-padding', status: 'flux' },
    { comp: 'vl-collapsible', cat: 'method', feat: 'openen', vds: 'show() (open is een property)', flux: 'open()', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'method', feat: 'sluiten', vds: 'hide()', flux: 'close()', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'event', feat: 'toggle', vds: 'vl-toggle (detail.expanded) + vl-open / vl-close', flux: 'vl-on-toggle (detail.open)', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'slot', feat: 'titel', vds: 'trigger', flux: 'title', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'slot', feat: 'inhoud', vds: 'content (named)', flux: 'default slot', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'slot', feat: 'extra acties', vds: 'actions', flux: 'menu', status: 'shape' },
    { comp: 'vl-collapsible', cat: 'slot', feat: 'subtitel', vds: 'nee', flux: 'subtitle', status: 'flux' },
    { comp: 'vl-divider', cat: 'gedrag', feat: 'vorm', vds: 'web-component', flux: 'CSS-klasse op <hr>', status: 'shape' },
    { comp: 'vl-divider', cat: 'prop', feat: 'stijl', vds: 'appearance default/dashed/dotted/wave/tilt', flux: 'vl-separator / -wave / -slash', status: 'shape' },
    { comp: 'vl-divider', cat: 'prop', feat: 'dikte', vds: 'size m/l/xl', flux: 'nee', status: 'vds' },
    { comp: 'vl-divider', cat: 'prop', feat: 'kleur', vds: 'color default/subtle', flux: 'nee', status: 'vds' },
    { comp: 'vl-divider', cat: 'prop', feat: 'verticaal', vds: 'orientation', flux: 'nee', status: 'vds' },
    { comp: 'vl-divider', cat: 'prop', feat: 'a11y-rol', vds: 'purpose informative/decorative', flux: 'nee (native hr)', status: 'vds' },
    { comp: 'vl-section-message', cat: 'prop', feat: 'status', vds: 'status info/success/warning/danger', flux: 'type info/success/warning/error', status: 'shape' },
    { comp: 'vl-section-message', cat: 'prop', feat: 'titel en boodschap als attribuut', vds: 'nee (slots)', flux: 'title / message', status: 'flux' },
    { comp: 'vl-section-message', cat: 'prop', feat: 'icoon', vds: 'automatisch per status (slot icon)', flux: 'icon (enkel als gezet)', status: 'shape' },
    { comp: 'vl-section-message', cat: 'prop', feat: 'compacte en naakte vorm', vds: 'nee (zie vl-inline-message)', flux: 'size small / naked', status: 'flux' },
    { comp: 'vl-section-message', cat: 'prop', feat: 'multiline', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-section-message', cat: 'prop', feat: 'rol', vds: 'nee', flux: 'alert-role (alert / alertdialog / geen) + focus()', status: 'flux' },
    { comp: 'vl-section-message', cat: 'prop', feat: 'variant', vds: 'primary / secondary', flux: 'nee', status: 'vds' },
    { comp: 'vl-section-message', cat: 'prop', feat: 'breedte', vds: 'grow', flux: 'nee', status: 'vds' },
    { comp: 'vl-section-message', cat: 'slot', feat: 'inhoud', vds: 'body (named)', flux: 'default slot', status: 'shape' },
    { comp: 'vl-section-message', cat: 'slot', feat: 'extra slots', vds: 'illustration, footer', flux: 'actions', status: 'shape' },
    { comp: 'vl-section-message', cat: 'event', feat: 'sluiten', vds: 'vl-close (blijft staan)', flux: 'vl-alert-closed (verwijdert zichzelf eerst)', status: 'shape' },
    { comp: 'vl-tabs', cat: 'gedrag', feat: 'structuur', vds: 'vl-tab + vl-tabpanel (tab-id)', flux: 'vl-tabs-pane (id + title)', status: 'shape' },
    { comp: 'vl-tabs', cat: 'gedrag', feat: 'kinderen op tagnaam gezocht', vds: 'ja (:scope > vl-tab), dus erven onder een andere tag kan niet', flux: 'ja (vl-tabs-pane)', status: 'shape' },
    { comp: 'vl-tabs', cat: 'prop', feat: 'actieve tab', vds: 'active-tab', flux: 'active-tab', status: 'shape' },
    { comp: 'vl-tabs', cat: 'prop', feat: 'stijl', vds: 'variant, density, grow, align, panel-align', flux: 'alt', status: 'shape' },
    { comp: 'vl-tabs', cat: 'prop', feat: 'verticaal', vds: 'orientation, collapsed-vertical', flux: 'nee', status: 'vds' },
    { comp: 'vl-tabs', cat: 'prop', feat: 'hash-links', vds: 'nee', flux: 'ja (disable-links om uit te zetten)', status: 'flux' },
    { comp: 'vl-tabs', cat: 'prop', feat: 'mobiele weergave', vds: 'overflow-menu', flux: 'responsive-label, display-style collapsed', status: 'shape' },
    { comp: 'vl-tabs', cat: 'prop', feat: 'disabled tab', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-tabs', cat: 'event', feat: 'wissel', vds: 'vl-change (detail.tab)', flux: 'change (detail.activeTab)', status: 'shape' },
    { comp: 'vl-tabs', cat: 'slot', feat: 'icoon voor/na label', vds: 'before / after', flux: 'nee', status: 'vds' },
    { comp: 'vl-table', cat: 'prop', feat: 'zebra', vds: 'zebra (even rijen)', flux: 'zebra (oneven rijen), flux-zebra', status: 'shape' },
    { comp: 'vl-table', cat: 'prop', feat: 'grid-lijnen', vds: 'grid', flux: 'grid', status: 'shape' },
    { comp: 'vl-table', cat: 'prop', feat: 'hover en matrix', vds: 'nee (hover altijd aan)', flux: 'hover / matrix', status: 'flux' },
    { comp: 'vl-table', cat: 'prop', feat: 'lijstweergave op mobiel', vds: 'layout auto/list/table (één breakpoint)', flux: 'collapsed-m / -s / -xs', status: 'shape' },
    { comp: 'vl-table', cat: 'prop', feat: 'laden', vds: 'loading (overlay + inert)', flux: 'nee', status: 'vds' },
    { comp: 'vl-table', cat: 'prop', feat: 'horizontaal scrollen', vds: 'horizontal-scroll (sticky, fades)', flux: 'nee', status: 'vds' },
    { comp: 'vl-table', cat: 'event', feat: 'sorteren en scrollen', vds: 'vl-table-sort, vl-table-scroll', flux: 'nee', status: 'vds' },
    { comp: 'vl-table', cat: 'method', feat: 'details-rijen', vds: 'nee', flux: 'expandDetails / collapseDetails / toggleDetails', status: 'flux' },
    { comp: 'vl-table', cat: 'slot', feat: 'lege en laad-toestand', vds: 'empty / loading', flux: 'nee', status: 'vds' },
    { comp: 'vl-table', cat: 'gedrag', feat: 'styling van de native table', vds: 'document-sheet op vl-table table', flux: 'klasse vl-table op de table', status: 'shape' },
];

export const detailStatusBadge = (status: DetailStatus): TemplateResult => {
    const map: Record<DetailStatus, readonly [string, string, string]> = {
        vds: ['#0055cc', '#eef6ff', 'enkel VDS'],
        flux: ['#9a6700', '#fff8e1', 'enkel flux'],
        shape: ['#8250df', '#f3eefb', 'andere shape/naam'],
    };
    const [fg, bg, label] = map[status];
    return html`<span
        style="color: ${fg}; background: ${bg}; padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 600; white-space: nowrap;"
        >${label}</span
    >`;
};

export const detailCatLabel: Record<ApiDetailCat, string> = {
    prop: 'property',
    event: 'event',
    method: 'method',
    slot: 'slot',
    part: 'part',
    gedrag: 'gedrag',
};

// Zet een aanwezigheids-cel ('ja' / 'nee', eventueel met toelichting tussen haakjes)
// om naar een groene checkmark of rode kruis-icon, met de resterende tekst ernaast.
export const renderPresence = (value: string): TemplateResult => {
    const trimmed = value.trim();
    const check = html`<span role="img" aria-label="ja" style="color: #1a7f37; font-weight: 700;">✓</span>`;
    const cross = html`<span role="img" aria-label="nee" style="color: #b3261e; font-weight: 700;">✗</span>`;
    const lead = trimmed.match(/^(ja|nee)(?![a-z])/i);
    if (lead) {
        const icon = lead[1].toLowerCase() === 'ja' ? check : cross;
        const rest = trimmed.slice(lead[1].length).trim();
        return rest ? html`${icon} <span style="color: #555;">${rest}</span>` : icon;
    }
    return html`<span style="color: #555;">${trimmed}</span>`;
};

export const API_DETAIL_INLINED_TAGS = [
    'vl-button',
    'vl-input',
    'vl-datepicker',
    'vl-checkbox',
    'vl-select',
    'vl-radio-group',
    'vl-icon',
    'vl-textarea',
    'vl-fieldset',
    'vl-title',
    'vl-*-tag',
    'vl-collapsible',
    'vl-divider',
    'vl-section-message',
    'vl-tabs',
    'vl-table',
];

export const renderApiDetailAccordion = (vdsTag: string): TemplateResult => {
    const rows = API_DETAIL_ROWS.filter((r) => r.comp === vdsTag);
    if (!rows.length) {
        return html``;
    }
    const fluxTag = API_GAP_ROWS.find((c) => c.vds === vdsTag)?.flux ?? null;
    const v = rows.filter((r) => r.status === 'vds').length;
    const f = rows.filter((r) => r.status === 'flux').length;
    const s = rows.filter((r) => r.status === 'shape').length;
    const th = 'text-align: left; padding: 5px 10px; border-bottom: 2px solid #cbd2d9; font-size: 11px;';
    const td = 'padding: 5px 10px; border-bottom: 1px solid #eaecef; font-size: 12px; vertical-align: top;';
    return html`
        <details
            style="border: 1px solid #e1e4e8; border-radius: 6px; margin: 0 0 20px; padding: 0 12px; max-width: 900px; background: #fbfcfd;"
        >
            <summary
                style="cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 13px; display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap;"
            >
                <span
                    >API-gap: welke publieke API wijkt af tussen <code>${vdsTag}</code> en
                    ${fluxTag ? html`<code>${fluxTag}</code>` : 'flux'}</span
                >
                <span style="font-weight: 400; color: #6b7280; font-size: 12px;">
                    ${rows.length} ${rows.length === 1 ? 'afwijking' : 'afwijkingen'} (${v} enkel-VDS ·
                    ${f} enkel-flux · ${s} andere shape/naam)
                </span>
            </summary>
            <table style="border-collapse: collapse; width: 100%; margin: 4px 0 12px;">
                <thead>
                    <tr>
                        <th scope="col" style="${th}">Type</th>
                        <th scope="col" style="${th}">Functionaliteit</th>
                        <th scope="col" style="${th}">VDS</th>
                        <th scope="col" style="${th}">flux</th>
                        <th scope="col" style="${th}">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(
                        (r) => html`<tr>
                            <td style="${td} color: #6b7280;">${detailCatLabel[r.cat]}</td>
                            <td style="${td}">${r.feat}</td>
                            <td style="${td}">${renderPresence(r.vds)}</td>
                            <td style="${td}">${renderPresence(r.flux)}</td>
                            <td style="${td}">${detailStatusBadge(r.status)}</td>
                        </tr>`
                    )}
                </tbody>
            </table>
        </details>
    `;
};
