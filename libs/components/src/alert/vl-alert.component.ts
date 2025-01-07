import { html, PropertyDeclarations, TemplateResult, CSSResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseLitElement, findNodesForSlot } from '@domg-wc/common-utilities';
import { alertStyle, iconStyle } from '@domg/govflanders-style/component';
import { accessibilityStyle, resetStyle, markStyle } from '@domg/govflanders-style/common';
import { VlAlertClosedEvent, VlAlertModel } from './vl-alert.model';
import { classMap } from 'lit/directives/class-map.js';
import vlAlertUigCss from './vl-alert.uig-css';

@customElement('vl-alert')
export class VlAlert extends BaseLitElement implements VlAlertModel {
    icon = '';
    title = '';
    type?: 'info' | 'success' | 'warning' | 'error';
    size = '';
    message = '';
    naked = false;
    closable = false;

    static get styles(): CSSResult[] {
        return [resetStyle, alertStyle, iconStyle, accessibilityStyle, markStyle, vlAlertUigCss];
    }

    static get properties(): PropertyDeclarations {
        return {
            icon: { type: String, attribute: 'data-vl-icon' },
            title: { type: String, attribute: 'data-vl-title' },
            closable: { type: Boolean, attribute: 'data-vl-closable' },
            type: { type: String, attribute: 'data-vl-type' },
            size: { type: String, attribute: 'data-vl-size' },
            naked: { type: Boolean, attribute: 'data-vl-naked' },
            message: { type: String, attribute: 'data-vl-message' },
        };
    }

    protected updated(changedProperties: Map<string, unknown>): void {
        super.updated(changedProperties);
        this.processButtons();
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

        return html`
            <div id="alert" class=${classMap(classes)} role="alert">
                ${this.icon &&
                html` <div class="vl-alert__icon">
                    <span is="vl-icon" data-vl-icon="${this.icon}"></span>
                </div>`}
                <div id="content" class="vl-alert__content">
                    <p id="title" class="vl-alert__title">
                        <slot class=${markClass} name="title">${this.title}</slot>
                    </p>
                    <div id="message" class="vl-alert__message">
                        <p class=${markClass}>${this.message}</p>
                        <slot id="message-slot"></slot>
                    </div>
                    <div id="actions" class="vl-alert__actions ${hideEmptyActionsSlot}">
                        <slot id="actions-slot" @slotchange=${this.requestUpdate} name="actions"></slot>
                    </div>
                </div>
                ${this.closable
                    ? html`
                          <button id="close" class="vl-alert__close" type="button" @click=${this.removeAlert}>
                              <i class="vl-vi vl-vi-cross" aria-hidden="true"></i>
                              <span class="vl-u-visually-hidden">Melding sluiten</span>
                          </button>
                      `
                    : ''}
            </div>
        `;
    }

    private removeAlert() {
        this.remove();
        this.dispatchEvent(new VlAlertClosedEvent());
    }

    private processButtons() {
        const actionsSlotElement = this.renderRoot.querySelector('slot[name="actions"]') as HTMLSlotElement;
        const buttonNodes = actionsSlotElement
            ?.assignedNodes()
            .filter((element) => element instanceof HTMLButtonElement);

        buttonNodes.forEach((node) => (node as HTMLButtonElement).setAttribute('data-vl-narrow', ''));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-alert': VlAlert;
    }
}
