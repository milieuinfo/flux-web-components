// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=162-42686
// source=libs/components/src/block/alert/vl-alert.component.ts
// component=VlAlert
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - Het icoon volgt in Figma automatisch uit `type`; het code-attribuut `icon` wordt dus niet gezet.
// - `multiline` en `alert-role` hebben geen Figma-tegenhanger.
// - `actions slot` en de sluitknop bestaan in Figma enkel in de default-stijl; bij naked wordt geen actions-hint gezet.

const type = instance.getEnum('type', {
    info: 'info',
    error: 'error',
    warning: 'warning',
    success: 'success',
});
const size = instance.getEnum('size', { default: '', small: 'small' });
const naked = instance.getEnum('style', { default: false, naked: true });
const closable = instance.getBoolean('closable');
const hasActionsSlot = instance.getBoolean('actions slot');

// Titel en boodschap hangen niet aan een property maar zitten in tekstlagen. De boodschap heet "↳ text" in de
// default-stijl en "↳ text line 1" in de naked-stijl.
const titleLayer = instance.findText('↳ titel');
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';
const messageLayer = instance.findText(naked ? '↳ text line 1' : '↳ text');
const message = messageLayer && messageLayer.type === 'TEXT' ? escapeHtml(messageLayer.textContent) : '';

// Bij de naked variant mogen titel en boodschap enkel via attributen; anders gaat de boodschap in het default slot.
const messageAttribute = naked ? ` message="${message}"` : '';
const content = naked ? '' : message;
const actions = !naked && hasActionsSlot ? '<div slot="actions"></div>' : '';

export default {
    example: figma.code`<vl-alert type="${type}"${size ? ` size="${size}"` : ''}${naked ? ' naked' : ''}${
        closable ? ' closable' : ''
    } title="${title}"${messageAttribute}>${content}${actions}</vl-alert>`,
    id: 'vl-alert',
    metadata: { nestable: true },
};
