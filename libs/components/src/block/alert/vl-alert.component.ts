import { BaseLitElement, findNodesForSlot } from '@domg-wc/common';
import { accessibilityStyle, markStyle, resetStyle } from '@domg/govflanders-style/common';
import { alertStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { ALERT_ROLE, VlAlertClosedEvent, VlAlertModel } from './vl-alert.model';
import { vlAlertFluxStyles } from './vl-alert.flux-css';

@customElement('vl-alert')
export class VlAlert extends BaseLitElement implements VlAlertModel {
    icon = '';
    title = '';
    type?: 'info' | 'success' | 'warning' | 'error';
    size = '';
    message = '';
    naked = false;
    closable = false;
    multiline = false;
    alertRole: ALERT_ROLE = ALERT_ROLE.ALERT;

    static get styles(): CSSResult[] {
        return [resetStyle, alertStyle, accessibilityStyle, markStyle, vlAlertFluxStyles, vlIconStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            icon: { type: String, attribute: 'icon' },
            title: { type: String, attribute: 'title' },
            closable: { type: Boolean, attribute: 'closable' },
            type: { type: String, attribute: 'type' },
            size: { type: String, attribute: 'size' },
            naked: { type: Boolean, attribute: 'naked' },
            message: { type: String, attribute: 'message' },
            multiline: { type: Boolean, attribute: 'multiline', reflect: true },
            alertRole: { type: String, attribute: 'alert-role' },
        };
    }

    protected render(): TemplateResult {
        const classes = {
            'vl-alert': true,
            [`vl-alert--${this.type}`]: Boolean(this.type),
            'vl-alert--small': this.size === 'small',
            'vl-alert--naked': this.naked,
        };

        const markClass = this.naked ? `vl-u-mark--${this.type}` : '';
        const hideEmptyActionsSlot = findNodesForSlot(this, 'actions')?.length ? '' : 'vl-u-visually-hidden';
        const role = this.getEffectiveRole();
        const isAlertDialog = role === ALERT_ROLE.ALERT_DIALOG;
        // we verwijzen enkel naar een element dat effectief inhoud heeft: de titel benoemt, de boodschap beschrijft
        const hasTitle = Boolean(this.title) || Boolean(findNodesForSlot(this, 'title')?.length);
        const hasMessage = Boolean(this.message) || this.hasDefaultSlotContent();
        const labelledBy = isAlertDialog && hasTitle ? 'title' : undefined;
        const describedBy = isAlertDialog && hasMessage ? 'message' : undefined;

        return html`
            <div
                id="alert"
                class=${classMap(classes)}
                role=${ifDefined(role)}
                tabindex=${ifDefined(isAlertDialog ? '-1' : undefined)}
                aria-labelledby=${ifDefined(labelledBy)}
                aria-describedby=${ifDefined(describedBy)}
            >
                ${this.icon &&
                html` <div class="vl-alert__icon">
                    <span class="vl-icon vl-icon--${this.icon}"></span>
                </div>`}
                <div id="content" class="vl-alert__content">
                    <p id="title" class="vl-alert__title">
                        <slot class=${markClass} @slotchange=${this.handleSlotChange} name="title">${this.title}</slot>
                    </p>
                    <div id="message" class="vl-alert__message">
                        <p class=${markClass}>${this.message}</p>
                        <slot id="message-slot" @slotchange=${this.handleSlotChange}></slot>
                    </div>
                    <div id="actions" class="vl-alert__actions ${hideEmptyActionsSlot}">
                        <slot id="actions-slot" @slotchange=${this.handleSlotChange} name="actions"></slot>
                    </div>
                </div>
                ${this.closable
                    ? html`
                          <button
                              id="close"
                              class="vl-alert__close"
                              type="button"
                              aria-controls="alert"
                              aria-expanded="true"
                              @click=${this.removeAlert}
                          >
                              <span class="vl-icon vl-icon--cross" aria-hidden="true"></span>
                              <span class="vl-u-visually-hidden">Melding sluiten</span>
                          </button>
                      `
                    : ''}
            </div>
        `;
    }

    /**
     * Verplaatst de focus naar de melding zelf, zodat een schermlezer haar rol, naam en beschrijving aankondigt.
     * Enkel bij alert-role="alertdialog" is de melding focusbaar; bij de andere rollen gebeurt er niets.
     */
    override focus(options?: FocusOptions): void {
        const alert = this.shadowRoot?.querySelector<HTMLElement>('#alert');

        if (alert) {
            alert.focus(options);
            return;
        }

        super.focus(options);
    }

    // lit 3 breekt requestUpdate af wanneer het rechtstreeks als listener gebonden wordt: het event komt dan binnen
    // als property-naam en de update wordt genegeerd
    private handleSlotChange = () => this.requestUpdate();

    private hasDefaultSlotContent(): boolean {
        return Array.from(this.childNodes).some((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return Boolean(node.textContent?.trim());
            }

            return node.nodeType === Node.ELEMENT_NODE && !(node as Element).hasAttribute('slot');
        });
    }

    private getEffectiveRole(): ALERT_ROLE | undefined {
        switch (this.alertRole) {
            case ALERT_ROLE.NO_ROLE:
                return undefined;
            case ALERT_ROLE.ALERT_DIALOG:
                return ALERT_ROLE.ALERT_DIALOG;
            default:
                return ALERT_ROLE.ALERT;
        }
    }

    private removeAlert() {
        this.remove();
        this.dispatchEvent(new VlAlertClosedEvent());
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-alert': VlAlert;
    }
}
