// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=448-151
// source=libs/components/src/block/side-sheet/vl-side-sheet.component.ts
// component=VlSideSheet
import figma from 'figma';

const instance = figma.selectedInstance;

// De Figma-as `variant` combineert positie (rechts = default, `left-*`) met toestand (`open`, `closed`, `mobile`).
// `mobile` is de geopende weergave op een klein scherm: die volgt in code uit de viewport en mapt op `open`.
// `show toggle button` mapt op het ontbreken van `hide-toggle-button`.
// `absolute`, `enable-swipe`, `top`, `shadow`, `toggle-text`, `tooltip-text`, `custom-icon` en `icon-placement`
// hebben geen Figma-equivalent (het icoon in het ontwerp is de standaard-placeholder van vl-button).
const variant: { open?: boolean; left?: boolean } =
    instance.getEnum('variant', {
        open: { open: true },
        closed: {},
        mobile: { open: true },
        'left-open': { left: true, open: true },
        'left-closed': { left: true },
        'left-mobile': { left: true, open: true },
    }) ?? {};
const showToggleButton = instance.getBoolean('show toggle button');

// De inhoud is default-slot-content; in het ontwerp is dat een vl-text-instance (enkel in de open varianten).
const text = instance.findInstance('🧩 vl-text');
let content;
if (text && text.type === 'INSTANCE') {
    content = text.executeTemplate().example;
}

export default {
    example: figma.code`<vl-side-sheet${variant.left ? ' left' : ''}${variant.open ? ' open' : ''}${
        showToggleButton ? '' : ' hide-toggle-button'
    }>${content || ''}</vl-side-sheet>`,
    id: 'vl-side-sheet',
    metadata: { nestable: false },
};
