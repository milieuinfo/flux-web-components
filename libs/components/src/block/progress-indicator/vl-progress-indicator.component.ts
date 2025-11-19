import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { accessibilityStyle, resetStyle } from '@domg/govflanders-style/common';
import { progressBarStyle } from '@domg/govflanders-style/component';
import { html, nothing, type PropertyDeclarations } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import 'reflect-metadata';
import { VlTooltipComponent } from '../tooltip';
import { vlProgressIndicatorFluxStyles } from './vl-progress-indicator.flux-css';

class ProgressIndicator {
    updateStep(shadowRoot: ShadowRoot | null, activeStep: number, focusOnChange: boolean) {
        if (shadowRoot) {
            const segments = shadowRoot.querySelectorAll<HTMLDivElement>('.vl-progress-indicator__segment');
            segments.forEach((segment, index) => {
                segment.classList.toggle('vl-progress-indicator__segment--active', index + 1 === activeStep);
                if (focusOnChange && index + 1 === activeStep) {
                    segment.querySelector<HTMLButtonElement>('button.vl-progress-indicator__step')?.focus();
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
    private steps: string[] = [];
    private showLabels = false;
    private staticSteps = false;
    private enableFutureSteps = false;

    static {
        registerWebComponents([VlTooltipComponent]);
    }

    constructor() {
        super();
        this.numeric = false;
        this.focusOnChange = false;
        this.activeStep = 1;
        this.progressIndicator = new ProgressIndicator();
        this.steps = [];
        this.showLabels = false;
        this.staticSteps = false;
        this.enableFutureSteps = false;
    }

    static get styles() {
        return [resetStyle, vlLegacyStyles, progressBarStyle, vlProgressIndicatorFluxStyles, accessibilityStyle];
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
            staticSteps: { type: Boolean, attribute: 'static-steps' },
            enableFutureSteps: { type: Boolean, attribute: 'enable-future-steps' },
        };
    }

    private updatePadding = async () => {
        this.style.setProperty(
            '--vl-progress-indicator--padding-right',
            `${this.showLabels ? this.lastLabelWidth / 2 : 0}px`
        );
    };

    async updated(changedProps: Map<string, unknown>) {
        this.progressIndicator.updateStep(this.shadowRoot, this.activeStep, this.focusOnChange);

        if (changedProps.has('showLabels') || changedProps.has('steps')) {
            this.updatePadding();
        }
    }

    connectedCallback(): void {
        super.connectedCallback();

        window.addEventListener('resize', this.updatePadding);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener('resize', this.updatePadding);
    }

    render() {
        const progressIndicatorClasses = {
            'vl-progress-indicator': true,
            'vl-progress-indicator--numeric': this.numeric,
            'vl-progress-indicator--padded': this.showLabels,
        };

        return this.staticSteps
            ? html`
                  <div class=${classMap(progressIndicatorClasses)}>
                      ${this.steps.map((step, index) => this.renderSegment(step, index))}
                  </div>
              `
            : html` <nav class=${classMap(progressIndicatorClasses)}>
                  ${this.steps.map((step, index) => this.renderSegment(step, index))}
              </nav>`;
    }

    private get lastLabelWidth(): number {
        return (
            this.shadowRoot
                ?.querySelector('.vl-progress-indicator__segment:last-child .vl-progress-indicator__label')
                ?.getBoundingClientRect().width || 0
        );
    }

    private renderBullet(step: string, index: number) {
        return html`<span class="vl-progress-indicator__bullet"></span>
            ${this.showLabels
                ? html`<span class="vl-progress-indicator__label" title=${step}>${step}</span>`
                : nothing} `;
    }

    private renderStep(step: string, index: number) {
        return html`${this.staticSteps
            ? html`<div class="vl-progress-indicator__step" tabindex="0" id="step-${index + 1}">
                  ${this.renderBullet(step, index)}
              </div>`
            : html` <button
                  ?disabled=${index > this.activeStep - 1 && !this.enableFutureSteps}
                  @click=${() => this.handleStepClick(step, index + 1)}
                  class="vl-progress-indicator__step"
                  type="button"
                  id="step-${index + 1}"
              >
                  ${this.renderBullet(step, index)}
              </button>`}
        ${this.showLabels
            ? nothing
            : html`
                  <vl-tooltip
                      id="tooltip-step-${index + 1}"
                      for="step-${index + 1}"
                      placement="top"
                      distance="15"
                      type="label"
                  >
                      ${step}
                  </vl-tooltip>
              `}`;
    }

    private renderSegment(step: string, index: number) {
        const segmentClasses = {
            'vl-progress-indicator__segment': true,
            'vl-progress-indicator__segment--active': this.activeStep === index + 1,
        };
        return html`<div class=${classMap(segmentClasses)}>${this.renderStep(step, index)}</div>`;
    }

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
