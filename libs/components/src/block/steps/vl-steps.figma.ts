// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=642-3093
// source=libs/components/src/block/steps/vl-steps.component.ts
// component=VlStepsComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-component heeft enkel een `Slot` met vl-step-instances.
// `line`, `timeline`, `simple-timeline` en `last-step-no-line` hebben geen Figma-equivalent op dit niveau:
// in Figma zitten `line` (boolean) en `type=timeline|simple-timeline` op de individuele vl-step.
//
// Een vl-step met `type=duration` is in Figma een eigen stap, maar in code een vl-duration-step in de `duration`-slot
// van de voorgaande vl-step. De stappen worden daarom uit hun metadata opnieuw samengesteld (zie vl-step.figma.ts):
// elke duration-stap gaat in de gewone stap ervoor. Bevat de slot geen vl-steps, dan gaat hij ongewijzigd door.
type StepProps = { duration?: boolean; stepStart?: string; durationStep?: string };

const slot = instance.getSlot('Slot');
const steps = slot ? slot.connectedInstances.filter((step) => step.codeConnectId() === 'vl-step') : [];
const stepProps = steps.map((step) => (step.executeTemplate().metadata?.props ?? {}) as StepProps);

const indent = (code: string) => code.replace(/\n/g, '\n    ');
let composed = '';
let stepOpen = false;
for (const props of stepProps) {
    if (props.duration) {
        // Een duration-stap zonder gewone stap ervoor blijft los staan.
        composed += stepOpen ? `\n        ${props.durationStep}` : `\n    ${props.durationStep}`;
        continue;
    }
    if (stepOpen) {
        composed += '\n    </vl-step>';
    }
    composed += `\n    ${indent(props.stepStart ?? '')}`;
    stepOpen = true;
}
if (stepOpen) {
    composed += '\n    </vl-step>';
}

export default {
    example: stepProps.length
        ? figma.code`<vl-steps>${composed}
</vl-steps>`
        : figma.code`<vl-steps>${slot}</vl-steps>`,
    id: 'vl-steps',
    metadata: { nestable: true },
};
