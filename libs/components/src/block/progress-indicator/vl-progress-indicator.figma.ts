// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=213-736
// source=libs/components/src/block/progress-indicator/vl-progress-indicator.component.ts
// component=VlProgressIndicatorComponent
import figma from 'figma';
import { escapeHtmlInSingleQuotes } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `variant` codeert twee boolean-attributen: `numeric` en `show-labels`.
const variant: { numeric?: boolean; showLabels?: boolean } =
    instance.getEnum('variant', {
        numeric: { numeric: true, showLabels: true },
        dots: { showLabels: true },
        'numeric without labels': { numeric: true },
        'dots without labels': {},
    }) ?? {};

// De stappen zijn geneste instances "progress indicator steps" (intern, geen SLOT-property).
// Het label van elke stap zit in de tekstlaag "↳ Label"; de stap met state=active bepaalt `active-step`.
// De `steps`-property (Array) wordt als JSON-attribuut uitgeschreven (Lit parseert dit automatisch).
// `focus-on-change`, `static-steps` en `enable-future-steps` zitten niet in Figma.
const stepLayers = instance.findLayers((node) => node.type === 'INSTANCE' && node.name === 'progress indicator steps');
const stepLabels = stepLayers.map((step) => {
    const labelLayer = step.type === 'INSTANCE' ? step.findText('↳ Label') : null;
    return labelLayer && labelLayer.type === 'TEXT' ? labelLayer.textContent : '';
});
const activeStep =
    stepLayers.findIndex((step) => step.type === 'INSTANCE' && step.getPropertyValue('state') === 'active') + 1;

export default {
    example: figma.code`<vl-progress-indicator steps='${escapeHtmlInSingleQuotes(JSON.stringify(stepLabels))}'${
        activeStep > 1 ? ` active-step="${activeStep}"` : ''
    }${variant.numeric ? ' numeric' : ''}${variant.showLabels ? ' show-labels' : ''}></vl-progress-indicator>`,
    id: 'vl-progress-indicator',
    metadata: { nestable: true },
};
