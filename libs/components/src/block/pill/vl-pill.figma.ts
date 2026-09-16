// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=182-69529
// source=libs/components/src/block/pill/vl-pill.component.ts
// component=VlPillComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// `default` is het code-default (geen `type`-attribuut).
const type = instance.getEnum('type', {
    default: '',
    success: 'success',
    warning: 'warning',
    error: 'error',
});
const clickable = instance.getEnum('clickable', { no: false, yes: true });
const checkable = instance.getEnum('checkable', { no: false, yes: true });
const closable = instance.getEnum('closable', { no: false, yes: true });

// De Figma-as `state` mengt attributen (disabled, checked) met de interactietoestand `hover`, die niet gemapt wordt.
const state: { disabled?: boolean; checked?: boolean } =
    instance.getEnum('state', {
        default: {},
        hover: {},
        disabled: { disabled: true },
        checked: { checked: true },
    }) ?? {};

// Het label zit in de tekstlaag "↳ label" en hangt niet aan een component-property.
const labelLayer = instance.findText('↳ label');
const label = labelLayer && labelLayer.type === 'TEXT' ? escapeHtml(labelLayer.textContent) : '';

export default {
    example: figma.code`<vl-pill${type ? ` type="${type}"` : ''}${clickable ? ' clickable' : ''}${
        checkable ? ' checkable' : ''
    }${closable ? ' closable' : ''}${state.checked ? ' checked' : ''}${state.disabled ? ' disabled' : ''}>${label}</vl-pill>`,
    id: 'vl-pill',
    metadata: { nestable: true },
};
