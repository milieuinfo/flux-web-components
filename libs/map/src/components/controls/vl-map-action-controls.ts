import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CSSResult } from 'lit/development';
import { VlMapActionControl } from './action-control/vl-map-action-control';
import { vlMapControlsFluxStyles } from './vl-map-controls.flux-css';
import { BaseLitElement } from '@domg-wc/common';

@customElement('vl-map-action-controls')
export class VlMapActionControls extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlMapControlsFluxStyles];
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.actionControls.forEach((control) => {
            control.addEventListener('change-control', (event: CustomEvent) => {
                const actionId = control.getAttribute('action-id');
                this.handleActionControlChange(actionId, event);
            });
        });
    }

    render(): TemplateResult {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }

    private get actionControls(): VlMapActionControl[] {
        return this.querySelectorAll('vl-map-action-control') as unknown as VlMapActionControl[];
    }

    private handleActionControlChange(actionId: string, event: CustomEvent): void {
        if (event.detail?.isActive) {
            [...this.actionControls]
                .filter((control) => control.getAttribute('action-id') !== actionId)
                .filter((control) => control.active)
                .forEach((control) => control.deactivate());
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-action-controls': VlMapActionControls;
    }
}
