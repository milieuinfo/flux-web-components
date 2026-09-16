// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=26-15688
// source=libs/components/src/block/modal/vl-modal.component.ts
// component=VlModalComponent
// unmapped: variant
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// `default` (size) en `center` (position) zijn de code-defaults en worden niet uitgeschreven.
const size = instance.getEnum('size', {
    default: '',
    medium: 'medium',
    large: 'large',
    'full-screen': 'full-screen',
});
const position = instance.getEnum('position', {
    center: '',
    left: 'left',
    right: 'right',
});
// `cancellable` staat standaard aan, zoals in code; uitgezet wordt het `not-cancellable`.
const cancellable = instance.getBoolean('cancellable');

// De Figma-as `variant` (desktop/mobile) is een responsive weergave zonder code-attribuut en wordt niet gemapt.
// De instance "[Flux] Slot" is een generieke placeholder (geen SLOT-property) en wordt niet gemapt.

// De titel en de tekst zitten in de tekstlagen "↳ Title" en "↳ Text" en hangen niet aan een component-property.
const titleLayer = instance.findText('↳ Title');
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';
const textLayer = instance.findText('↳ Text');
const text = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

// De Figma-modal bevat twee vl-button instances: de primaire actie (variant=primary) hoort in het `button`-slot,
// de ghost icon-only knop is de sluitknop die in code via het `closable`-attribuut verschijnt.
const buttons = instance.findLayers((node) => node.type === 'INSTANCE' && node.name === '🧩 vl-button');
const actionButton = buttons.find((node) => node.type === 'INSTANCE' && node.getPropertyValue('variant') === 'primary');
const closeButton = buttons.find(
    (node) => node.type === 'INSTANCE' && node.getPropertyValue('icon-placement') === 'only',
);
let actionButtonCode;
if (actionButton && actionButton.type === 'INSTANCE') {
    actionButtonCode = actionButton.executeTemplate().example;
}

export default {
    example: figma.code`<vl-modal title="${title}"${size ? ` size="${size}"` : ''}${
        position ? ` position="${position}"` : ''
    }${closeButton ? ' closable' : ''}${cancellable ? '' : ' not-cancellable'}>
    <div slot="content">${text}</div>
    ${actionButtonCode ? figma.code`<span slot="button">${actionButtonCode}</span>` : ''}
</vl-modal>`,
    id: 'vl-modal',
    metadata: { nestable: false },
};
