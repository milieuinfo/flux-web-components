import { BaseLitElement, registerWebComponents, VL } from '@domg-wc/common';
import { VlIconComponent } from '@domg-wc/components/atom';
import { vlLegacyStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { VlAccordionComponent } from '../accordion/vl-accordion.component';
import { vlStepFluxStyles } from './vl-step.flux-css';

declare const vl: VL;

@customElement('vl-step')
export class VlStepComponent extends BaseLitElement {
    // Attributen
    private type: string | null = null;
    private toggleable = false;
    private defaultOpen = false;
    private headingLevel: string = '3';
    private iconAriaLabel: string = '';
    private timelineAriaLabel: string = '';
    public line = false;
    public timeline = false;
    public simpleTimeline = false;
    public lastStepNoLine = false;

    // Properties
    open = false;
    contentRenderer?: (open: boolean) => TemplateResult;

    // Private properties
    private isTitleAnnotationSlotAssigned = true;
    private customCSSStyleSheet = new CSSStyleSheet();

    static {
        registerWebComponents([VlAccordionComponent, VlIconComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLegacyStyles, vlStepFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            type: { type: String, reflect: true },
            toggleable: { type: Boolean, reflect: true },
            defaultOpen: { type: Boolean, attribute: 'default-open', reflect: true },
            headingLevel: { type: String, attribute: 'heading-level', reflect: true },
            iconAriaLabel: { type: String, attribute: 'icon-aria-label', reflect: true },
            timelineAriaLabel: { type: String, attribute: 'timeline-aria-label', reflect: true },
            open: { type: Boolean, reflect: true, attribute: false },
            contentRenderer: { type: Function, attribute: false },
            isTitleAnnotationSlotAssigned: { attribute: false },
            line: { type: Boolean, attribute: 'line', reflect: true },
            timeline: { type: Boolean, attribute: 'timeline', reflect: true },
            simpleTimeline: { type: Boolean, attribute: 'simple-timeline', reflect: true },
            lastStepNoLine: { type: Boolean, attribute: 'last-step-no-line', reflect: true },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this.customCSSStyleSheet];
        }
    }

    updated(): void {
        // if duration slot is empty, remove the ul
        const durationSlot = this.shadowRoot?.querySelector('slot[name="duration"]') as HTMLSlotElement | null;
        if (durationSlot) {
            const assignedNodes = durationSlot.assignedNodes({ flatten: true });
            if (assignedNodes.length === 0) {
                const ulElement = durationSlot.parentElement;
                if (ulElement) {
                    ulElement.remove();
                }
            }
        }
    }

    render(): TemplateResult {
        const stepType = this.type;
        const stepHeaderTemplate = !this.toggleable
            ? this.getStepHeaderTemplate()
            : this.getAccordionStepHeaderTemplate();
        const classes = {
            'vl-step': true,
            [`vl-step--${stepType}`]: !!stepType,
            'vl-step--accordion': this.toggleable,
            'js-vl-accordion': this.toggleable,
            'vl-step--has-line': this.line,
            'vl-step--timeline': this.timeline,
            'vl-step--timeline-simple': this.simpleTimeline,
            'vl-step--last-step-no-line': this.lastStepNoLine,
        };

        const contentTemplate = this.contentRenderer
            ? this.contentRenderer(this.open)
            : html`<slot name="content"></slot>`;

        return html`
            <li role="listitem" class=${classMap(classes)}>
                <div class="vl-step__container">
                    <div
                        class="vl-step__icon"
                        aria-label=${ifDefined(
                            this.iconAriaLabel
                                ? this.iconAriaLabel
                                : this.timelineAriaLabel
                                  ? this.timelineAriaLabel
                                  : undefined,
                        )}
                        role=${ifDefined(this.iconAriaLabel ? 'img' : this.timelineAriaLabel ? 'text' : undefined)}
                    >
                        <slot name="icon" aria-hidden="true"></slot>
                        <span class="vl-step__icon__sub" aria-hidden="true">
                            <slot name="sub-icon"></slot>
                        </span>
                    </div>
                    <div class="vl-step__wrapper">
                        ${stepHeaderTemplate}
                        <div class="vl-step__content-wrapper">
                            <div class="vl-step__content">${contentTemplate}</div>
                            <ul class="vl-step__duration-list">
                                <slot name="duration"></slot>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }

    setCustomStyles(customCSS: string) {
        this.customCSSStyleSheet.replaceSync(customCSS);
    }

    protected firstUpdated(changedProperties: Map<PropertyKey, unknown>): void {
        super.firstUpdated(changedProperties);

        if (this.toggleable) {
            const accordionToggle = this.shadowRoot?.querySelector<HTMLButtonElement>('.js-vl-accordion__toggle');
            const isAccordionDressed = accordionToggle?.hasAttribute('accordion-dressed');

            if (!isAccordionDressed) {
                vl.accordion.dress(accordionToggle);
                this.shadowRoot?.querySelector('slot[name="title"]')?.addEventListener('click', (event: Event) => {
                    event.stopPropagation();
                    (this.shadowRoot?.querySelector('button.js-vl-accordion__toggle') as HTMLButtonElement)?.click();
                });
            }

            accordionToggle?.addEventListener('click', () => this.handleClick());

            if (this.defaultOpen) {
                if (!this.shadowRoot?.querySelector('li.js-vl-accordion--open')) {
                    accordionToggle?.click();
                }
            }
        }

        const titleAnnotationSlot = this.shadowRoot?.querySelector(
            'slot[name="title-annotation"]',
        ) as HTMLSlotElement | null;
        this.isTitleAnnotationSlotAssigned =
            (titleAnnotationSlot && titleAnnotationSlot.assignedNodes().length > 0) || false;
    }

    private handleClick(): void {
        const accordionElement = this.shadowRoot?.querySelector('.js-vl-accordion');
        const isOpen = accordionElement?.classList.contains('js-vl-accordion--open') || false;

        this.open = isOpen;

        this.dispatchEvent(
            new CustomEvent('vl-on-toggle', {
                detail: {
                    open: isOpen,
                },
            }),
        );
    }

    private getStepHeaderTemplate(): TemplateResult {
        const stepHeaderTitleTemplate = this.getStepHeaderTitleTemplate();

        return html` <div class="vl-step__header">${stepHeaderTitleTemplate}</div>`;
    }

    private getAccordionStepHeaderTemplate(): TemplateResult {
        const stepHeaderTitleTemplate = this.getStepHeaderTitleTemplate();

        return html`
            <button class="vl-step__header js-vl-accordion__toggle" aria-expanded="${this.open}">
                ${stepHeaderTitleTemplate}
                <div class="vl-step__header__info" aria-hidden="true">
                    <vl-icon class="vl-step__accordion-toggle" icon="nav-down"></vl-icon>
                </div>
            </button>
        `;
    }

    private getStepHeaderTitleTemplate(): TemplateResult {
        const titleContent = html`
            <slot name="title"></slot>
            ${this.isTitleAnnotationSlotAssigned
                ? html`
                      <span class="vl-step__title__annotation">
                          <slot name="title-annotation"></slot>
                      </span>
                  `
                : ''}
        `;

        let headingTemplate: TemplateResult;
        switch (this.headingLevel) {
            case '1':
                headingTemplate = html`<h1 class="vl-step__title">${titleContent}</h1>`;
                break;
            case '2':
                headingTemplate = html`<h2 class="vl-step__title">${titleContent}</h2>`;
                break;
            case '4':
                headingTemplate = html`<h4 class="vl-step__title">${titleContent}</h4>`;
                break;
            case '5':
                headingTemplate = html`<h5 class="vl-step__title">${titleContent}</h5>`;
                break;
            case '6':
                headingTemplate = html`<h6 class="vl-step__title">${titleContent}</h6>`;
                break;
            case '3':
            default:
                headingTemplate = html`<h3 class="vl-step__title">${titleContent}</h3>`;
                break;
        }

        return html`
            <div class="vl-step__header__titles">
                ${headingTemplate}
                <p class="vl-step__subtitle">
                    <slot name="subtitle"></slot>
                </p>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-step': VlStepComponent;
    }
}
