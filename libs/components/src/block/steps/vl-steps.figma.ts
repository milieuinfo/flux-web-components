// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=642-3093
// source=libs/components/src/block/steps/vl-steps.component.ts
// component=VlStepsComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-component heeft enkel een `Slot` met vl-step-instances.
// `line`, `timeline`, `simple-timeline` en `last-step-no-line` hebben geen Figma-equivalent op dit niveau:
// in Figma zitten `line` (boolean) en `type=timeline|simple-timeline` op de individuele vl-step.
const slot = instance.getSlot('Slot');

export default {
    example: figma.code`<vl-steps>${slot}</vl-steps>`,
    id: 'vl-steps',
    metadata: { nestable: true },
};
