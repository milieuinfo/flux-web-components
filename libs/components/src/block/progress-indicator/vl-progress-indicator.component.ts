import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { accessibilityStyle, resetStyle } from '@domg/govflanders-style/common';
import { progressBarStyle } from '@domg/govflanders-style/component';
import { html, nothing, type PropertyDeclarations } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import 'reflect-metadata';
import { VlPopoverComponent } from '../popover';
import { vlProgressIndicatorFluxStyles } from './vl-progress-indicator.flux-css';

class ProgressIndicator {
    updateStep(shadowRoot: ShadowRoot | null, activeStep: number, focusOnChange: boolean) {
        if (shadowRoot) {
            const steps = shadowRoot.querySelectorAll<HTMLDivElement>('.vl-progress-bar__step');
            steps.forEach((step, index) => {
                step.classList.toggle('vl-progress-bar__step--active', index + 1 === activeStep);
                if (focusOnChange && index + 1 === activeStep) {
                    step.focus();
                }
            });
        }
    }
}

@customElement('vl-progress-indicator')
export class VlProgressIndicatorComponent extends BaseLitElement {
    private activeStep = 1;
    private focusOnChange = false;
    private numeric = false;
    private progressIndicator = new ProgressIndicator();
    private steps = [];
    private showLabels = false;

    static {
        registerWebComponents([VlPopoverComponent]);
    }

    constructor() {
        super();
        this.numeric = false;
        this.focusOnChange = false;
        this.activeStep = 1;
        this.progressIndicator = new ProgressIndicator();
        this.steps = [];
        this.showLabels = false;
    }

    static get styles() {
        return [resetStyle, progressBarStyle, vlProgressIndicatorFluxStyles, accessibilityStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            activeStep: {
                type: Number,
                attribute: 'active-step',
                reflect: true,
            },
            focusOnChange: {
                type: Boolean,
                attribute: 'focus-on-change',
                reflect: true,
            },
            numeric: { type: Boolean, attribute: 'numeric', reflect: true },
            steps: { type: Array },
            showLabels: { type: Boolean, attribute: 'show-labels', reflect: true },
        };
    }

    updated() {
        this.progressIndicator.updateStep(this.shadowRoot, this.activeStep, this.focusOnChange);
    }

    render() {
        const progressIndicatorClasses = {
            'vl-progress-bar': true,
            'vl-progress-bar--numeric': this.numeric,
        };

        return html` <div class=${classMap(progressIndicatorClasses)}>
            ${this.steps.map((step, index) => this.renderStep(step, index))}
        </div>`;
    }

    private renderStep = (step: string, index: number) => {
        const stepClasses = {
            'vl-progress-bar__step': true,
            'vl-progress-bar__step--active': this.activeStep === index + 1,
        };

        return html` <div class=${classMap(stepClasses)}>
            <button
                @click=${() => this.handleStepClick(step, index + 1)}
                class="vl-progress-bar__bullet"
                aria-label=${step}
                id="step-${index + 1}"
            >
                ${!this.showLabels
                    ? html`
                          <vl-popover for="step-${index + 1}" placement="top" trigger="focus hover">
                              ${step}
                          </vl-popover>
                      `
                    : nothing}
                ${this.showLabels ? html`<span class="vl-progress-bar__bullet__text" title=${step}>${step}</span>` : ''}
            </button>
        </div>`;
    };

    private handleStepClick(step: string, stepNumber: number) {
        this.dispatchEvent(
            new CustomEvent('vl-click-step', {
                bubbles: true,
                composed: true,
                detail: { step, number: stepNumber },
            })
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-progress-indicator': VlProgressIndicatorComponent;
    }
}
