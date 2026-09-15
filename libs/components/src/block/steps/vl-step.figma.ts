// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=176-51588
// source=libs/components/src/block/steps/vl-step.component.ts
// component=VlStepComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `type` mengt het `type`-attribuut (disabled, success, warning, error, highlighted) met
// weergaven die in code aparte booleans zijn (`timeline`, `simple-timeline`) en met `duration`, dat in code
// een apart element is (vl-duration-step in de `duration`-slot van een vl-step).
// `size` (M/S) heeft geen code-equivalent. `toggle-opened` (INSTANCE_SWAP) is het interne accordion-icoon.
// `open` mapt op `default-open` (enkel zinvol samen met `toggleable`).
// `heading-level`, `icon-aria-label`, `timeline-aria-label` en `last-step-no-line` hebben geen Figma-equivalent.
const type: { type?: string; timeline?: boolean; simpleTimeline?: boolean; duration?: boolean } =
    instance.getEnum('type', {
        default: {},
        disabled: { type: 'disabled' },
        success: { type: 'success' },
        warning: { type: 'warning' },
        error: { type: 'error' },
        highlighted: { type: 'highlighted' },
        timeline: { timeline: true },
        'simple-timeline': { simpleTimeline: true },
        duration: { duration: true },
    }) ?? {};
instance.getEnum('size', {
    M: {},
    S: {},
});
const toggleable = instance.getBoolean('toggleable');
const open = instance.getBoolean('open');
const line = instance.getBoolean('line');
const hasSubtitle = instance.getBoolean('subtitle');

// Nummer/icoon, titel, subtitel en content zitten in tekstlagen zonder component-property.
const numberLayer = instance.findText('↳ number');
const number = numberLayer && numberLayer.type === 'TEXT' ? escapeHtml(numberLayer.textContent) : '';

const titleLayer = instance.findText('↳ Title step');
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';

const subtitleLayer = instance.findText('↳ Subtitle step');
const subtitle =
    hasSubtitle && subtitleLayer && subtitleLayer.type === 'TEXT' ? escapeHtml(subtitleLayer.textContent) : '';

const contentLayer = instance.findText('↳ content step');
const content = contentLayer && contentLayer.type === 'TEXT' ? escapeHtml(contentLayer.textContent) : '';

const iconSlot = number
    ? `
    <span slot="icon">${number}</span>`
    : '';
const subtitleSlot = subtitle
    ? `
    <span slot="subtitle">${subtitle}</span>`
    : '';
const contentSlot = content
    ? `
    <span slot="content">${content}</span>`
    : '';
// De Figma-variant `type=duration` toont een stap met een aangepaste titel, maar modelleert de
// duurtijd zelf niet: er is geen tekstlaag voor. In code is dat een apart element in de
// `duration`-slot, dat de developer invult. Er kunnen er meerdere naast elkaar staan.
const durationSlot = type.duration
    ? `
    <vl-duration-step slot="duration"></vl-duration-step>`
    : '';

export default {
    example: figma.code`<vl-step${type.type ? ` type="${type.type}"` : ''}${type.timeline ? ' timeline' : ''}${
        type.simpleTimeline ? ' simple-timeline' : ''
    }${line ? ' line' : ''}${toggleable ? ' toggleable' : ''}${toggleable && open ? ' default-open' : ''}>${iconSlot}
    <span slot="title">${title}</span>${subtitleSlot}${contentSlot}${durationSlot}
</vl-step>`,
    id: 'vl-step',
    metadata: { nestable: true },
};
