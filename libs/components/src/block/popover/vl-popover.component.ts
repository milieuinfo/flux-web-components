import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { resetStyle } from '@domg/govflanders-style/common';
import { CSSResult, html, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import FloatingController, { FloatingControllerOptions } from './vl-floating-ui.controller';
import { VlPopoverActionListComponent } from './vl-popover-action-list.component';
import { VlPopoverActionComponent } from './vl-popover-action.component';
import { popoverDefaults } from './vl-popover.defaults';
import { vlPopoverFluxStyles } from './vl-popover.flux-css';
import { POPOVER_ARIA_TYPE, POPOVER_TYPE } from './vl-popover.model';

@customElement('vl-popover')
export class VlPopoverComponent extends BaseLitElement {
    open = false;

    protected popup!: FloatingController;
    private for = popoverDefaults.for; // html id van het referentie-element
    protected trigger = popoverDefaults.trigger;
    private placement = popoverDefaults.placement;
    private distance = popoverDefaults.distance; // afstand van referentie-element in px
    protected hideArrow = popoverDefaults.hideArrow;
    protected contentPadding = popoverDefaults.contentPadding;
    private hideOnClick = popoverDefaults.hideOnClick;
    private strategy = popoverDefaults.strategy;
    private maxHeight = popoverDefaults.maxHeight;

    static {
        registerWebComponents([VlPopoverActionComponent, VlPopoverActionListComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlLegacyStyles, vlPopoverFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            for: { type: String, attribute: 'for' },
            contentPadding: { type: String, attribute: 'content-padding' },
            open: { type: Boolean, attribute: 'open', reflect: true },
            trigger: { type: String, attribute: 'trigger' },
            placement: { type: String, attribute: 'placement', reflect: true },
            distance: { type: Number, attribute: 'distance' },
            hideArrow: { type: Boolean, attribute: 'hide-arrow' },
            hideOnClick: { type: Boolean, attribute: 'hide-on-click' },
            strategy: { type: String, attribute: 'strategy' },
            maxHeight: { type: String, attribute: 'max-height' },
        };
    }

    show = () => {
        this.open = true;
    };

    hide = () => {
        this.open = false;
    };

    toggle() {
        if (this.open) {
            this.hide();
        } else {
            this.show();
        }
    }

    protected firstUpdated() {
        this.hidden = !this.open;
        this.popup = new FloatingController(this, this.popupOptions);

        if (this.open) {
            this.popup.updatePosition();
        }
    }

    protected render(): TemplateResult {
        const scrollClasses = {
            'popover-scroll': true,
            [`padding-${this.contentPadding}`]: true,
        };
        return html`
            <div class="popover-content" aria-hidden="${!this.open}">
                <div class=${classMap(scrollClasses)}>
                    <slot></slot>
                </div>
                ${!this.hideArrow ? html`<i id="popover-arrow" role="presentation"></i>` : null}
            </div>
        `;
    }

    protected updated(changedProperties: PropertyValues<this>) {
        if (changedProperties.has('open')) {
            this.handleOpenChange();
        } else {
            this.popup.setOptions(this.popupOptions);
            this.popup.updatePosition();
        }
    }

    private handleOpenChange() {
        if (this.open) {
            this.popup.updatePosition();
            this.hidden = false;
        } else {
            this.hidden = true;
        }
        this.popup.setExpanded(this.open);
    }

    protected get popupOptions(): FloatingControllerOptions {
        return {
            reference: this.for,
            trigger: this.trigger,
            distance: this.distance,
            placement: this.placement,
            showDelay: 0,
            hideDelay: 0,
            hideOnClick: this.hideOnClick,
            strategy: this.strategy,
            maxHeight: this.maxHeight,
            type: this.trigger.includes('click') ? POPOVER_TYPE.POPOVER : POPOVER_TYPE.TOOLTIP,
            ariaType: this.trigger.includes('click') ? undefined : POPOVER_ARIA_TYPE.DESCRIPTION,
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-popover': VlPopoverComponent;
    }
}
