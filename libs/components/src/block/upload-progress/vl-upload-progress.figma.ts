// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=876-160
// source=libs/components/src/block/upload-progress/vl-upload-progress.component.ts
// component=VlUploadProgressComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De as `State` codeert de status; in code zijn dat de boolean attributen indeterminate, error en success.
// De error-variant toont in Figma een retry- en een annuleer-knop (geneste vl-buttons zonder property);
// in code zijn dat de attributen `retryable` en `cancellable`.
const state: {
    indeterminate?: boolean;
    error?: boolean;
    retryable?: boolean;
    cancellable?: boolean;
    success?: boolean;
} =
    instance.getEnum('State', {
        default: {},
        indeterminate: { indeterminate: true },
        error: { error: true, retryable: true, cancellable: true },
        success: { success: true },
    }) ?? {};

// Bestandsnaam en -grootte zitten in de geneste vl-text instances (variant default → filename,
// variant annotation → filesize, in Figma tussen haakjes). Enkel uitgeschreven als ze afwijken van de default.
const filenameText = instance.findText('vl-text - default', { traverseInstances: true });
const filename = filenameText && filenameText.type === 'TEXT' ? escapeHtml(filenameText.textContent) : '';
const filesizeText = instance.findText('vl-text - annotation', { traverseInstances: true });
const filesize =
    filesizeText && filesizeText.type === 'TEXT'
        ? escapeHtml(filesizeText.textContent).replace(/^\((.*)\)$/, '$1')
        : '';

const filenameDefault = 'Document.pdf';
const filesizeDefault = '123 MB';

// De boodschap zit in de tekstlaag "message" (enkel in de error- en success-variant) → attribuut `message`.
const messageText = instance.findText('message');
const message = messageText && messageText.type === 'TEXT' ? escapeHtml(messageText.textContent) : '';

// Bewust niet gemapt: `progress`, `label` en `hide-progress` hebben geen Figma-equivalent;
// de geneste vl-icon en vl-progress-bar worden in code door het component zelf bepaald.

export default {
    example: figma.code`<vl-upload-progress${
        filename && filename !== filenameDefault ? ` filename="${filename}"` : ''
    }${filesize && filesize !== filesizeDefault ? ` filesize="${filesize}"` : ''}${
        state.indeterminate ? ' indeterminate' : ''
    }${state.error ? ' error' : ''}${state.success ? ' success' : ''}${state.retryable ? ' retryable' : ''}${
        state.cancellable ? ' cancellable' : ''
    }${message ? ` message="${message}"` : ''}></vl-upload-progress>`,
    id: 'vl-upload-progress',
    metadata: { nestable: true },
};
