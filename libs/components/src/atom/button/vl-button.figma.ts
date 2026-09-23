// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=24-1865
// source=libs/components/src/atom/button/vl-button.component.ts
// component=VlButtonComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

type LayerHandle = ReturnType<typeof instance.findLayers>[number] | undefined;

// De icoonnaam komt uit de Code Connect van het icoon zelf, via `metadata.props.icon`. Zie
// `libs/components/src/atom/icon/vl-icon-library.figma.batch.ts`.
//
// Leid de naam nooit af uit de laagnaam. Vastgesteld met een diagnostisch template op vl-icon
// (2026-09-08): `name` op een handle levert de laagnaam uit de componentdefinitie, niet die van de
// geswapte instance, en zou hier dus voor élk gekozen icoon de naam van het standaardicoon geven.
//
// Blijft `icon` leeg, dan heeft het gekozen icoon geen Code Connect-mapping. Het attribuut wordt
// dan nog steeds uitgeschreven, zodat zichtbaar is dat er een icoon hoort te staan.
function iconNameOf(handle: LayerHandle): string {
    if (!handle || handle.type !== 'INSTANCE') {
        return '';
    }
    const metadata = handle.executeTemplate().metadata;
    const fromTemplate = metadata && metadata.props ? metadata.props.icon : undefined;
    return typeof fromTemplate === 'string' ? fromTemplate : '';
}

// primary is de default in code en wordt niet als attribuut uitgeschreven.
const variant: { secondary?: boolean; tertiary?: boolean; ghost?: boolean } =
    instance.getEnum('variant', {
        primary: {},
        secondary: { secondary: true },
        tertiary: { tertiary: true },
        ghost: { ghost: true },
    }) ?? {};

const sizes: { large?: boolean; narrow?: boolean; wide?: boolean } =
    instance.getEnum('sizes', {
        default: {},
        large: { large: true },
        narrow: { narrow: true },
        'large - narrow': { large: true, narrow: true },
        wide: { wide: true },
        'large - wide': { large: true, wide: true },
    }) ?? {};

const state: { error?: boolean; disabled?: boolean; loading?: boolean } =
    instance.getEnum('state', {
        default: {},
        error: { error: true },
        disabled: { disabled: true },
        loading: { loading: true },
    }) ?? {};

const iconPlacement = instance.getEnum('icon-placement', {
    only: 'only',
    none: 'none',
    before: 'before',
    after: 'after',
});

// Bij de varianten before/after/only zit het icoon in de `icon`-swap. Bij `none` tonen de booleans
// `icon-placement=before`/`icon-placement=after` de swaps `↪︎ icon left`/`↪︎ icon right`;
// een vl-button heeft maar één icoon, dus links krijgt voorrang op rechts.
// `before` is de default van icon-placement in code en wordt niet uitgeschreven.
let icon = '';
let placement = '';
if (iconPlacement === 'none') {
    if (instance.getBoolean('icon-placement=before') === true) {
        icon = iconNameOf(instance.getInstanceSwap('↪︎ icon left'));
        placement = 'before';
    } else if (instance.getBoolean('icon-placement=after') === true) {
        icon = iconNameOf(instance.getInstanceSwap('↪︎ icon right'));
        placement = 'after';
    }
} else {
    icon = iconNameOf(instance.getInstanceSwap('icon'));
    placement = typeof iconPlacement === 'string' ? iconPlacement : '';
}

// Zodra de Figma-variant een icoon toont, hoort het icon-attribuut in het snippet te staan —
// ook als de naam niet af te leiden viel. `only` is in code geen aparte waarde: een icoon-knop
// heeft geen inhoud en vereist daarom een `label` voor de toegankelijke naam.
const showsIcon = placement !== '';
const iconOnly = placement === 'only';

// De knoptekst zit in de tekstlaag "↳ ButtonText" (afwezig bij icon-placement=only).
const buttonText = instance.findText('↳ ButtonText');
const label = buttonText && buttonText.type === 'TEXT' ? escapeHtml(buttonText.textContent) : '';

// Een icoon-knop heeft geen zichtbare tekst; de toegankelijke naam komt uit de TEXT-property `label`, die in de
// icon-only varianten aan een verborgen tekstlaag hangt. Blijft die op de default staan, dan toont het snippet een
// placeholder: een leeg `label` zou een knop zonder toegankelijke naam opleveren.
// Een bestand met een oudere versie van de library kent de property `label` nog niet.
const labelProperty = iconOnly && 'label' in instance.properties ? escapeHtml(instance.getString('label')) : '';
const iconOnlyLabel = labelProperty && labelProperty !== 'Label' ? labelProperty : '...';

// Niet gemapt (geen Figma-equivalent): type, block, toggle, on, controlled, cta-link, download,
// external en input-group.
export default {
    example: figma.code`<vl-button${variant.secondary ? ' secondary' : ''}${variant.tertiary ? ' tertiary' : ''}${
        variant.ghost ? ' ghost' : ''
    }${sizes.large ? ' large' : ''}${sizes.narrow ? ' narrow' : ''}${sizes.wide ? ' wide' : ''}${
        state.error ? ' error' : ''
    }${state.disabled ? ' disabled' : ''}${state.loading ? ' loading' : ''}${showsIcon ? ` icon="${icon}"` : ''}${
        placement === 'after' ? ' icon-placement="after"' : ''
    }${iconOnly ? ` label="${iconOnlyLabel}"` : ''}>${iconOnly ? '' : label}</vl-button>`,
    id: 'vl-button',
    metadata: { nestable: true },
};
