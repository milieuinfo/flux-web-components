// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=876-160
// source=libs/components/src/block/upload-progress/vl-upload-progress.component.ts
// component=VlUploadProgressComponent
// code-only vl-upload-progress: label, progress
import figma from 'figma';
import { booleanProperty } from '../../../../../resources/code-connect/boolean-property';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De as `State` codeert de status; in code zijn dat de boolean attributen indeterminate, error en success.
const state: {
    indeterminate?: boolean;
    error?: boolean;
    success?: boolean;
} =
    instance.getEnum('State', {
        default: {},
        indeterminate: { indeterminate: true },
        error: { error: true },
        success: { success: true },
    }) ?? {};

// De booleans `retryable` en `cancellable` tonen de knoppen opnieuw proberen en annuleren, in elke State.
// Een oudere library zonder de booleans toonde beide knoppen enkel in de error-variant.
const retryable = booleanProperty(instance, 'retryable', state.error === true);
const cancellable = booleanProperty(instance, 'cancellable', state.error === true);

// Bestandsnaam en -grootte zitten in de geneste vl-text instances (variant default → filename,
// variant annotation → filesize, in Figma tussen haakjes). Enkel uitgeschreven als ze afwijken van de default.
// De tekstlagen worden niet op naam gezocht: hun naam volgt in de library de voorbeeldtekst.
const texts = instance.findLayers((node) => node.type === 'INSTANCE' && node.name === '🧩 vl-text');
const textOfVariant = (variant: string) => {
    const text = texts.find((node) => node.type === 'INSTANCE' && node.getPropertyValue('variant') === variant);
    return text && text.type === 'INSTANCE' ? text.findLayers((node) => node.type === 'TEXT')[0] : undefined;
};
const filenameText = textOfVariant('default');
const filename = filenameText && filenameText.type === 'TEXT' ? escapeHtml(filenameText.textContent) : '';
const filesizeText = textOfVariant('annotation');
const filesize =
    filesizeText && filesizeText.type === 'TEXT'
        ? escapeHtml(filesizeText.textContent).replace(/^\((.*)\)$/, '$1')
        : '';

const filenameDefault = 'Document.pdf';
const filesizeDefault = '123 MB';

// De boodschap zit in de tekstlaag "message" (enkel in de error- en success-variant) → attribuut `message`.
const messageText = instance.findText('message');
const message = messageText && messageText.type === 'TEXT' ? escapeHtml(messageText.textContent) : '';

// De boolean `progress` toont de voortgangsbalk; uit is `hide-progress`. Een oudere library zonder de boolean toonde
// de balk altijd.
const progress = booleanProperty(instance, 'progress', true);

// Bewust niet gemapt: `progress` (de waarde) en `label` hebben geen Figma-equivalent;
// de geneste vl-icon en vl-progress-bar worden in code door het component zelf bepaald.

export default {
    example: figma.code`<vl-upload-progress${
        filename && filename !== filenameDefault ? ` filename="${filename}"` : ''
    }${filesize && filesize !== filesizeDefault ? ` filesize="${filesize}"` : ''}${
        state.indeterminate ? ' indeterminate' : ''
    }${state.error ? ' error' : ''}${state.success ? ' success' : ''}${retryable ? ' retryable' : ''}${
        cancellable ? ' cancellable' : ''
    }${progress ? '' : ' hide-progress'}${message ? ` message="${message}"` : ''}></vl-upload-progress>`,
    id: 'vl-upload-progress',
    metadata: { nestable: true },
};
