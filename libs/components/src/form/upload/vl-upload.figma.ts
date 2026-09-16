// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=902-39
// source=libs/components/src/form/upload/vl-upload.component.ts
// component=VlUploadComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De as `state` codeert de status; in code zijn dat de boolean attributen error, success en disabled.
// `dragging` is een runtime-state (bestand wordt over de dropzone gesleept) en heeft geen attribuut.
const state: { error?: boolean; success?: boolean; disabled?: boolean } =
    instance.getEnum('state', {
        Default: {},
        error: { error: true },
        success: { success: true },
        disabled: { disabled: true },
        dragging: {},
    }) ?? {};

// De knoptekst zit in de tekstlaag "↳ link" van de geneste vl-link → attribuut `main-title`.
// De ondertitel zit in de tekstlaag "Sleep een bijlage na Copy 4" → attribuut `sub-title`.
// Beide worden enkel uitgeschreven als ze afwijken van de code-default.
const link = instance.findText('↳ link', { traverseInstances: true });
const mainTitle = link && link.type === 'TEXT' ? escapeHtml(link.textContent) : '';
const subTitleText = instance.findText('Sleep een bijlage na Copy 4');
const subTitle = subTitleText && subTitleText.type === 'TEXT' ? escapeHtml(subTitleText.textContent) : '';

const mainTitleDefault = 'Bijlage toevoegen';
const subTitleDefault = 'Sleep de bijlage naar hier om toe te voegen.';

// Bewust niet gemapt: de icon-properties van de geneste vl-link (vast paperclip-icoon in code).

export default {
    example: figma.code`<vl-upload${state.disabled ? ' disabled' : ''}${state.error ? ' error' : ''}${
        state.success ? ' success' : ''
    }${mainTitle && mainTitle !== mainTitleDefault ? ` main-title="${mainTitle}"` : ''}${
        subTitle && subTitle !== subTitleDefault ? ` sub-title="${subTitle}"` : ''
    }></vl-upload>`,
    id: 'vl-upload',
    metadata: { nestable: true },
};
