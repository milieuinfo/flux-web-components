// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=162-42686
// source=libs/components/src/block/alert/vl-alert.component.ts
// component=VlAlert
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - Het icoon volgt in Figma automatisch uit `type`; het code-attribuut `icon` wordt dus niet gezet.
// - `multiline` en `alert-role` hebben geen Figma-tegenhanger.
// - `actions slot` bestaat in Figma enkel in de default-stijl, de sluitknop in de default- en banner-stijl. Een
//   naked alert krijgt nooit een sluitknop of actions-hint, ook al staat de boolean `closable` op set-niveau
//   standaard aan.
// - Een banner is in code altijd klein; `size` wordt daar dus niet uitgeschreven.

// Een bestand met een oudere versie van de library kan properties missen. De getters geven dan een foutobject terug
// in plaats van `undefined`; daarom de typeof-controles en de vergelijkingen met `true`.
const typeValue = instance.getEnum('type', {
    info: 'info',
    error: 'error',
    warning: 'warning',
    success: 'success',
});
const type = typeof typeValue === 'string' ? typeValue : '';
const style = instance.getEnum('style', { default: 'default', naked: 'naked', banner: 'banner' });
const naked = style === 'naked';
const banner = style === 'banner';
const sizeValue = banner ? '' : instance.getEnum('size', { default: '', small: 'small' });
const size = typeof sizeValue === 'string' ? sizeValue : '';
const closable = !naked && instance.getBoolean('closable') === true;
const hasActionsSlot = style === 'default' && instance.getBoolean('actions slot') === true;

// Titel en boodschap hangen niet aan een property maar zitten in tekstlagen. De boodschap heet "↳ text" in de
// default-stijl en "↳ text line 1" in de naked-stijl. De banner heeft één laag "↳ titel + text" met het
// scheidingsteken " - " in de tekst; in code tekent het component dat scheidingsteken zelf.
const textOf = (name: string) => {
    const layer = instance.findText(name);
    return layer && layer.type === 'TEXT' ? layer.textContent : '';
};
const bannerText = banner ? textOf('↳ titel + text') : '';
const separatorIndex = bannerText.indexOf(' - ');
const title = escapeHtml(
    banner ? (separatorIndex === -1 ? '' : bannerText.slice(0, separatorIndex)) : textOf('↳ titel'),
);
const message = escapeHtml(
    banner
        ? separatorIndex === -1
            ? bannerText
            : bannerText.slice(separatorIndex + 3)
        : textOf(naked ? '↳ text line 1' : '↳ text'),
);

// Bij de naked variant mogen titel en boodschap enkel via attributen; anders gaat de boodschap in het default slot.
const messageAttribute = naked ? ` message="${message}"` : '';
const content = naked ? '' : message;
const actions = !naked && hasActionsSlot ? '<div slot="actions"></div>' : '';

export default {
    example: figma.code`<vl-alert type="${type}"${size ? ` size="${size}"` : ''}${naked ? ' naked' : ''}${
        banner ? ' banner' : ''
    }${closable ? ' closable' : ''} title="${title}"${messageAttribute}>${content}${actions}</vl-alert>`,
    id: 'vl-alert',
    metadata: { nestable: true },
};
