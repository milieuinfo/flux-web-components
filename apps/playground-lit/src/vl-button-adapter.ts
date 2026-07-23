// FLUX-704 PoC stap 2: flux `vl-button` met de VDS-button ONDERLIGGEND.
//
// Strategie: adapter/wrapper (optie B). Deze module registreert `vl-button`
// VOORDAT flux z'n eigen VlButtonComponent laadt; flux' defineWebComponent
// ziet de tag bezet en skipt silent (first-wins). Bestaande markup met de
// oude flux-API blijft werken; intern rendert de adapter een `<vlds-button>`
// (geregistreerd via defineAll('vlds') in vds-prefix-aware.ts).
//
// API-mapping flux -> VDS:
//   (default)               -> variant="primary"
//   secondary               -> variant="secondary"
//   tertiary                -> variant="tertiary"   (ook: toggle && !on)
//   ghost                   -> variant="ghost"
//   error                   -> danger
//   large                   -> size="large"
//   loading                 -> loading
//   disabled                -> disabled
//   icon + icon-placement   -> icon-before / icon-after (default: before)
//   cta-link (+ external)   -> href (target=_blank kent VDS-button NIET; gat)
//   label                   -> aria-label (icon-only naam)
//   type                    -> type (native semantics; formAssociated-gat, zie onder)
//
// NIET gemapt (geen VDS-equivalent), gedocumenteerd als integratie-gat:
//   block / wide / narrow / input-group  (layout-modifiers)
//   toggle / on / controlled             (toggle-button gedrag)
//   external target=_blank               (VDS-button heeft geen new-window)
//
// Bekende beperking: VDS-button is formAssociated, maar door de extra
// shadow-laag van deze adapter ziet hij het buitenste <form> niet;
// type="submit" submit dus niet door de adapter heen.
import { html, LitElement, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export class VlButtonVdsAdapter extends LitElement {
    declare secondary: boolean;
    declare tertiary: boolean;
    declare ghost: boolean;
    declare error: boolean;
    declare large: boolean;
    declare loading: boolean;
    declare disabled: boolean;
    declare toggle: boolean;
    declare on: boolean;
    declare icon: string | undefined;
    declare iconPlacement: string | undefined;
    declare ctaLink: string | undefined;
    declare external: boolean;
    declare label: string | undefined;
    declare type: string | undefined;

    static properties = {
        secondary: { type: Boolean },
        tertiary: { type: Boolean },
        ghost: { type: Boolean },
        error: { type: Boolean },
        large: { type: Boolean },
        loading: { type: Boolean },
        disabled: { type: Boolean, reflect: true },
        toggle: { type: Boolean },
        on: { type: Boolean },
        icon: { type: String },
        iconPlacement: { type: String, attribute: 'icon-placement' },
        ctaLink: { type: String, attribute: 'cta-link' },
        external: { type: Boolean },
        label: { type: String },
        type: { type: String },
    };

    constructor() {
        super();
        this.secondary = false;
        this.tertiary = false;
        this.ghost = false;
        this.error = false;
        this.large = false;
        this.loading = false;
        this.disabled = false;
        this.toggle = false;
        this.on = false;
        this.external = false;
    }

    private get variant(): string {
        if (this.tertiary || (this.toggle && !this.on)) return 'tertiary';
        if (this.secondary) return 'secondary';
        if (this.ghost) return 'ghost';
        return 'primary';
    }

    render(): TemplateResult {
        const iconBefore = this.icon && this.iconPlacement !== 'after' ? this.icon : undefined;
        const iconAfter = this.icon && this.iconPlacement === 'after' ? this.icon : undefined;
        return html`<vlds-button
            variant=${this.variant}
            size=${this.large ? 'large' : 'medium'}
            ?danger=${this.error}
            ?loading=${this.loading}
            ?disabled=${this.disabled}
            icon-before=${ifDefined(iconBefore)}
            icon-after=${ifDefined(iconAfter)}
            href=${ifDefined(this.ctaLink || undefined)}
            type=${ifDefined(this.type || undefined)}
            aria-label=${ifDefined(this.label || undefined)}
            ><slot></slot
        ></vlds-button>`;
    }
}

// First-wins: alleen registreren als flux nog niet won (HMR-herlaad-safe).
if (!customElements.get('vl-button')) {
    customElements.define('vl-button', VlButtonVdsAdapter);
    console.info('[FLUX-704] vl-button tag geclaimd door VDS-adapter (flux-registratie zal silent skippen)');
} else {
    console.warn('[FLUX-704] vl-button was al geregistreerd; adapter NIET actief (import-volgorde checken)');
}
