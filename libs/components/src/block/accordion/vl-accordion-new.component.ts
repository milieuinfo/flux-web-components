import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlIconStyles, VlTitleComponent } from '@domg-wc/components/atom';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, PropertyDeclarations } from 'lit';
import { html } from 'lit-element';
import { classMap } from 'lit/directives/class-map.js';
import { vlAccordionNewFluxStyles } from './vl-accordion-new.flux-css';

registerWebComponents([VlTitleComponent]);

@webComponent('vl-accordion-next')
export class VlAccordionComponentNew extends BaseLitElement {
    private icon = 'arrow-down-fat';
    private titleType = 'h5';

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlAccordionNewFluxStyles, vlIconStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            titleType: { type: String, attribute: 'title-type' },
            // TODO: bij custom icon, pijl uiterst rechts tonen
            icon: { type: String },
            // TODO: het moet ook mogelijk zijn om animatie aan of uit te zetten
            // TODO: implementeren overige properties
        };
    }

    render() {
        const summaryClasses = {
            [`vl-icon--${this.icon}`]: true,
        };
        // TODO implementeren overige slots
        return html`
            <details class="vl-accordion__summary">
                <summary class="${classMap(summaryClasses)} vl-accordion__title">
                    <!-- TODO icon font size should scale with title font size -->
                    <vl-title type=${this.titleType} no-space-bottom><slot name="title"></slot></vl-title>
                </summary>
                <div>
                    <slot name="content"></slot>
                </div>
            </details>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-accordion-next': VlAccordionComponentNew;
    }
}
