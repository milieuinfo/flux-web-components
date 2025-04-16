import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { wizardStyle } from '@domg/govflanders-style/component';
import '@govflanders/vl-ui-util/dist/js/util.js';
import { html, PropertyDeclarations } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VlProgressBarComponent } from '../progress-bar/vl-progress-bar.component';
import { VlWizardPane } from './vl-wizard-pane.component'; // onduidelijk waarom de vl declaratie en de util.js import nodig zijn, maar zonder falen de component.cy testen

@customElement('vl-wizard')
export class VlWizard extends BaseLitElement {
    private activeStep: number;
    private panes: VlWizardPane[];
    private hideLabels: boolean;
    private numeric = false;

    static {
        registerWebComponents([VlProgressBarComponent, VlWizardPane]);
    }

    static get styles() {
        return [resetStyle, wizardStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            panes: { type: Array },
            activeStep: {
                type: Number,
                attribute: 'data-vl-active-step',
                reflect: true,
            },
            hideLabels: { type: Boolean, attribute: 'data-vl-hide-labels' },
            numeric: { type: Boolean, attribute: 'data-vl-numeric' },
        };
    }

    constructor() {
        super();
        this.panes = [];
        this.activeStep = 1;
        this.hideLabels = false;
    }

    onSlotChange() {
        this.panes = [...this.querySelectorAll('vl-wizard-pane')];
    }

    updated() {
        this.panes.forEach((pane, index) => {
            pane.isActive = this.activeStep === index + 1;
        });
    }

    render() {
        return html`
            <section class="vl-wizard" data-vl-wizard>
                <header class="vl-wizard__heading" role="none">
                    <slot name="title"></slot>
                    <slot name="header"></slot>
                </header>
                <vl-progress-bar
                    data-vl-active-step=${this.activeStep}
                    ?data-vl-show-labels=${!this.hideLabels}
                    ?data-vl-numeric=${this.numeric}
                    .steps=${this.panes.map((pane) => pane.name)}
                ></vl-progress-bar>
                <div class="vl-wizard__panes">
                    <section class="vl-wizard__pane">
                        <slot @slotchange=${this.onSlotChange}></slot>
                    </section>
                </div>
            </section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-wizard': VlWizard;
    }
}
