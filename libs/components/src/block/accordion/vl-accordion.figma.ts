// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=146-14883
// source=libs/components/src/block/accordion/vl-accordion.component.ts
// component=VlAccordionComponent
// unmapped: variant
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - `variant` (desktop/mobile): responsief gedrag, geen code-equivalent.
// - `open` en `subtitle` op de geneste "Accordion toggle"-instance hebben enkel de waarde "nee": de accordion staat in
//   Figma altijd dicht, dus `default-open` wordt nooit gezet.
// - De geneste vl-button (menu-icoon) is vaste Figma-inhoud; in code hoort eigen inhoud in het `menu`-slot.

// De titel zit in de tekstlaag "↳ Titel": rechtstreeks (icon=ja) of binnen de geneste "Accordion toggle"-instance
// (icon=nee).
const titleLayer = instance.findText('↳ Titel', { traverseInstances: true });
const toggleText = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';

const altBackground = instance.getBoolean('alt-background');

// De `icon`-as bepaalt of er een vl-icon voor de titel staat. De icoonnaam komt uit de metadata van het geneste
// vl-icon-template (`props.icon`); zonder die metadata wordt geen `icon`-attribuut gezet.
const hasIcon = instance.getEnum('icon', { nee: false, ja: true });
let icon;
if (hasIcon) {
    const iconInstance = instance.findInstance('🧩 vl-icon');
    if (iconInstance && iconInstance.type === 'INSTANCE') {
        icon = iconInstance.executeTemplate().metadata?.props?.icon;
    }
}

// De booleans `subtitle slot` en `menu slot` zitten op de geneste "Accordion toggle"-instance (enkel bij icon=nee).
const toggle = instance.findInstance('Accordion toggle');
const hasToggle = toggle && toggle.type === 'INSTANCE';
const subtitleSlot = hasToggle && toggle.getBoolean('subtitle slot') ? '<span slot="subtitle"></span>' : '';
const menuSlot = hasToggle && toggle.getBoolean('menu slot') ? '<span slot="menu"></span>' : '';

const slot = instance.getSlot('Slot');

export default {
    example: figma.code`<vl-accordion toggle-text="${toggleText}"${icon ? ` icon="${icon}"` : ''}${
        altBackground ? ' alt-background' : ''
    }>${subtitleSlot}${menuSlot}${slot}</vl-accordion>`,
    id: 'vl-accordion',
    metadata: { nestable: true },
};
