// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=794-8
// source=libs/components/src/block/progress-bar/vl-progress-bar.component.ts
// component=VlProgressBarComponent
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-as `state` komt overeen met de boolean-attributen `success`, `error` en `indeterminate`.
const state: { success?: boolean; error?: boolean; indeterminate?: boolean } =
    instance.getEnum('state', {
        default: {},
        success: { success: true },
        error: { error: true },
        indeterminate: { indeterminate: true },
    }) ?? {};

// `value` (0-100) en het voor de toegankelijkheid verplichte `label`/`labelledby` zitten niet in Figma.

export default {
    example: figma.code`<vl-progress-bar${state.success ? ' success' : ''}${state.error ? ' error' : ''}${
        state.indeterminate ? ' indeterminate' : ''
    }></vl-progress-bar>`,
    id: 'vl-progress-bar',
    metadata: { nestable: true },
};
