import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, TemplateResult } from 'lit';
import { joinFigureZone } from './figure-zones';
import { vlDataControlsFluxStyles } from './vl-data-controls.flux-css';

/**
 * Vervangt de standaardknoppen naast de kop van vl-data-figure.
 *
 * @slot - Plaats hier vl-data-download en vl-data-fullscreen componenten.
 */
@webComponent('vl-data-controls')
export class VlDataControls extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlDataControlsFluxStyles];
    }

    connectedCallback(): void {
        super.connectedCallback();
        joinFigureZone(this, 'controls');
    }

    render(): TemplateResult {
        return html`<slot></slot>`;
    }
}
