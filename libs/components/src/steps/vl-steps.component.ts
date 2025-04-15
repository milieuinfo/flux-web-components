import { BaseLitElement, registerWebComponents } from '@domg-wc/common-utilities';
import { resetStyle } from '@domg/govflanders-style/common';
import { vlElementsStyle } from '@domg-wc/elements';
import { CSSResult, PropertyDeclarations, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { stepsStyle } from '@domg/govflanders-style/component';
import { VlStepComponent } from './vl-step.component';
import { VlDurationStepComponent } from './vl-duration-step.component';

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
        return [resetStyle, vlElementsStyle, stepsStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            line: { type: Boolean, attribute: 'data-vl-line', reflect: true },
            timeline: { type: Boolean, attribute: 'data-vl-timeline', reflect: true },
            simpleTimeline: { type: Boolean, attribute: 'data-vl-simple-timeline', reflect: true },
            lastStepNoLine: { type: Boolean, attribute: 'data-vl-last-step-no-line', reflect: true },
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
                <ul role="list" class="vl-steps__list">
                    <slot></slot>
                </ul>
            </div>
        `;
    }

    private setStepStyles(): void {
        const steps = [...Array.from(this.children)] as (VlStepComponent | VlDurationStepComponent)[];

        steps.forEach((step, index, array) => {
            if (step instanceof VlStepComponent) {
                const customStepStyles = this.getStepStyles(index, array);
                step.setCustomStyles(customStepStyles);
            }
        });
    }

    private getStepStyles(index: number, array: (VlStepComponent | VlDurationStepComponent)[]): string {
        const isFirstElement = index === 0;
        const isLastElement = index === array.length - 1;
        const isAfterDurationStep = array[index - 1] instanceof VlDurationStepComponent;
        let styles = '';

        if (!isFirstElement && !isAfterDurationStep) {
            styles += `
                .vl-step {
                    margin-top: 5rem;
                }

                @media screen and (max-width: 767px) {
                    .vl-step {
                        margin-top: 2rem;
                    }
                }
            `;
        }

        if (this.line) {
            styles += `
            .vl-step::before {
                position: absolute;
                display: block;
                background-color: #cbd2da;
                content: '';
                width: 0.3rem;
                top: calc(4.2rem + 0.4rem);
                bottom: calc(-5rem + 0.4rem);
                left: -5rem;
            }

            @media screen and (max-width: 767px) {
                .vl-step::before {
                    top: 3.9rem;
                    bottom: -2rem;
                    left: -3.35rem;
                }
            }
            `;
        }

        if (this.lastStepNoLine && isLastElement) {
            styles += `
                .vl-step::before {
                    display: none !important;
                }
            `;
        }

        if (this.timeline) {
            styles += `
            .vl-step::before {
                position: absolute;
                display: block;
                background-color: #cbd2da;
                content: '';
                width: 0.3rem;
                top: 6rem;
                bottom: -4.6rem;
                left: -5rem;
            }
            @media screen and (max-width: 767px) {
                .vl-step::before {
                    top: 4.4rem;
                    bottom: -1.6rem;
                    left: -3.35rem;
                }
            }
            .vl-step > .vl-step__container > .vl-step__icon {
                font-size: 1.8rem;
                height: auto;
                line-height: 1.5rem;
                border-radius: 0;
                padding: 1.2rem 0;
                top: 0;
            }
            @media screen and (max-width: 767px) {
                .vl-step > .vl-step__container > .vl-step__icon {
                    font-size: 1.5rem;
                    padding: 0.5rem 0;
                }
            }
            .vl-step--success .vl-step__icon {
                background-color: #007a37;
                color: #fff;
            }
            .vl-step--warning .vl-step__icon {
                background-color: #ffa10a;
                color: #333332;
            }
            .vl-step--error .vl-step__icon {
                background-color: #d2373c;
                color: #fff;
            }
            `;
        }

        if (this.simpleTimeline) {
            styles += `
                .vl-step {
                    padding-top: 0;
                }
                .vl-step::before {
                    position: absolute;
                    display: block;
                    background-color: #cbd2da;
                    content: '';
                    width: 0.3rem;
                    top: 2.2rem;
                    bottom: -7.2rem;
                    left: -5rem;
                }
                @media screen and (max-width: 767px) {
                    .vl-step::before {
                        left: -3.35rem;
                    }
                }
                .vl-step > .vl-step__container > .vl-step__icon {
                    background-color: #687483;
                    height: 2.2rem;
                    width: 2.2rem;
                    transform: translateX(-6rem);
                    margin-top: 0.5rem;
                }
                .vl-step
                    > .vl-step__container
                    > .vl-step__icon
                    > .vl-step__icon__text,
                .vl-step
                    > .vl-step__container
                    > .vl-step__icon
                    > .vl-step__icon__sub {
                    display: none;
                }
                @media screen and (max-width: 767px) {
                    .vl-step > .vl-step__container > .vl-step__icon {
                        transform: translateX(-4.3rem);
                    }
                }
                .vl-step__header__titles {
                    margin-top: 0.1rem;
                }
            `;
        }

        if (this.simpleTimeline && isLastElement) {
            styles += `
                .vl-step::before {
                    bottom: 0;
                }
            `;
        }

        return styles;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-steps': VlStepsComponent;
    }
}
