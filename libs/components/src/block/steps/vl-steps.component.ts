import { BaseLitElement, registerWebComponents } from '@domg-wc/common';
import { vlLegacyStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, PropertyDeclarations, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { VlDurationStepComponent } from './vl-duration-step.component';
import { VlStepComponent } from './vl-step.component';
import { vlStepsStyles } from './vl-steps.flux-css';

@customElement('vl-steps')
export class VlStepsComponent extends BaseLitElement {
    // Attributen
    private line = false;
    private timeline = false;
    private simpleTimeline = false;
    private lastStepNoLine = false;

    // Private properties
    private observer: MutationObserver | null = null;

    static {
        registerWebComponents([VlStepComponent, VlDurationStepComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLegacyStyles, vlStepsStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            line: { type: Boolean, attribute: 'line', reflect: true },
            timeline: { type: Boolean, attribute: 'timeline', reflect: true },
            simpleTimeline: { type: Boolean, attribute: 'simple-timeline', reflect: true },
            lastStepNoLine: { type: Boolean, attribute: 'last-step-no-line', reflect: true },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.observer = new MutationObserver(() => {
            this.setStepStyles();
        });

        this.observer.observe(this, { childList: true });
    }

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        this.setStepStyles();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.observer?.disconnect();
    }

    render(): TemplateResult {
        const classes = {
            'vl-steps': true,
            'vl-steps--has-line': this.line,
            'vl-steps--timeline': this.timeline,
            'vl-steps--timeline-simple': this.simpleTimeline,
            'vl-steps--last-step-no-line': this.lastStepNoLine,
        };

        return html`
            <div class=${classMap(classes)}>
                <ol role="list" class="vl-steps__list">
                    <slot></slot>
                </ol>
            </div>
        `;
    }

    private setStepStyles(): void {
        const steps = [...Array.from(this.children)] as (VlStepComponent | VlDurationStepComponent)[];

        steps.forEach((step, index, array) => {
            if (step instanceof VlStepComponent) {
                const isLastElement = index === array.length - 1;
                step.lastStepNoLine = isLastElement && this.lastStepNoLine;
                step.line = this.line;
                step.timeline = this.timeline;
                step.simpleTimeline = this.simpleTimeline;
            }
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-steps': VlStepsComponent;
    }
}
