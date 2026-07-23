// FLUX-704: het DOELPRODUCT via INHERITANCE (voorkeursaanpak).
//
// We houden de VDS-code zo intact mogelijk: flux-button ERFT van de VDS
// `VlButton` (geen extra shadow-laag, geen wrapper). Daardoor blijven
// formAssociated, ElementInternals, ::part en events native werken, in
// tegenstelling tot de compositie-variant (zie vl-button-adapter.ts).
//
// Visuele pariteit met de huidige flux-look komt PUUR uit hun design-token-
// systeem: we overschrijven de relevante `--base-*` tokens op `:host`. De
// VDS-render leest die tokens, dus we raken hun code niet aan. Waar nodig zou
// een directe selector kunnen (zelfde shadow, want subclass), maar tokens
// hebben de voorkeur (versie-robuust).
//
// API: voorlopig de VDS-API (`variant`, `size`, ...). Het mappen van de oude
// flux-API (`secondary`, `tertiary`, ...) is een latere stap, niet nu de focus.
//
// Registreert als `flux-button` zodat het naast de echte flux `vl-button`
// (kolom 1 van de styling-demo) getoond kan worden. In productie zou ditzelfde
// patroon zich als `vl-button` registreren.
import { css } from 'lit';
import { VlButton } from '@govflanders/vl-ui-design-system-web-components';

export class FluxButton extends VlButton {
    static properties = {
        secondary: { type: Boolean },
        tertiary: { type: Boolean },
        ghost: { type: Boolean },
        large: { type: Boolean },
        block: { type: Boolean },
    };

    declare secondary: boolean;
    declare tertiary: boolean;
    declare ghost: boolean;
    declare large: boolean;
    declare block: boolean;

    static styles = [
        (VlButton as unknown as { styles: unknown }).styles,
        css`
            :host {
                --base-border-radius-selectable-default: 0.3rem;
                --base-border-width-default: 2px;
                --base-space-selectable-inset-horizontal-l: calc(var(--global-font-size-scaled-base, 1rem) * 0.625);
            }
        `,
    ];

    protected willUpdate(changed: Map<PropertyKey, unknown>): void {
        const vds = this as unknown as { variant: string; size: string; grow: string };
        if (this.secondary) vds.variant = 'secondary';
        else if (this.tertiary) vds.variant = 'tertiary';
        else if (this.ghost) vds.variant = 'ghost';
        if (this.large) vds.size = 'large';
        if (this.block) vds.grow = 'fill';
        super.willUpdate(changed);
    }
}

if (!customElements.get('flux-button')) {
    customElements.define('flux-button', FluxButton);
}
