// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=828-216
// source=libs/components/src/block/popover/vl-popover-action.component.ts
// component=VlPopoverActionComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

type LayerHandle = ReturnType<typeof instance.findLayers>[number] | null | undefined;

// In code is `icon` een icoon-naam (string-attribuut); in Figma is het een INSTANCE_SWAP.
// De naam komt uit de Code Connect van het icoon zelf, via `metadata.props.icon`. Zie
// `libs/components/src/atom/icon/vl-icon-library.figma.batch.ts`.
//
// Leid de naam nooit af uit de laagnaam. Vastgesteld met een diagnostisch template op vl-icon
// (2026-09-08): `name` op een handle levert de laagnaam uit de componentdefinitie, niet die van de
// geswapte instance, en zou hier dus stil de verkeerde naam opleveren.
//
// Blijft `icon` leeg, dan heeft het gekozen icoon geen Code Connect-mapping.
function iconNameOf(handle: LayerHandle): string {
    if (!handle || handle.type !== 'INSTANCE') {
        return '';
    }
    const metadata = handle.executeTemplate().metadata;
    const fromTemplate = metadata && metadata.props ? metadata.props.icon : undefined;
    return typeof fromTemplate === 'string' ? fromTemplate : '';
}

// Een bestand met een oudere versie van de library kan properties missen. De getters geven dan een foutobject terug
// in plaats van `undefined`; daarom de vergelijking met `true` en de controle op `instance.properties`.
const selected = instance.getBoolean('selected') === true;
const label = 'label' in instance.properties ? escapeHtml(instance.getString('label')) : '';
const icon = iconNameOf(instance.getInstanceSwap('icon'));

// Niet gemapt (geen Figma-equivalent): action, href, target en rel.
export default {
    example: figma.code`<vl-popover-action icon="${icon}"${selected ? ' selected' : ''}>${label}</vl-popover-action>`,
    id: 'vl-popover-action',
    metadata: { nestable: true },
};
