import { BaseLitElement, registerWebComponents, VL } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { resetStyle } from '@domg/govflanders-style/common';
import { stepsStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { VlAccordionComponent } from '../accordion/vl-accordion.component';
import { vlStepFluxStyles } from './vl-step.flux-css';

declare const vl: VL;

@customElement('vl-step')
export class VlStepComponent extends BaseLitElement {
    // Attributen
    private type: string | null = null;
    private toggleable = false;
    private defaultOpen = false;

    // Properties
    open = false;
    contentRenderer?: (open: boolean) => TemplateResult;

    // Private properties
    private isTitleAnnotationSlotAssigned = true;
    private customCSSStyleSheet = new CSSStyleSheet();

    static {
        registerWebComponents([VlAccordionComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlLegacyStyles, stepsStyle, vlStepFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            type: { type: String, reflect: true },
            toggleable: { type: Boolean, reflect: true },
            defaultOpen: { type: Boolean, attribute: 'default-open', reflect: true },
            open: { type: Boolean, reflect: true, attribute: false },
            contentRenderer: { type: Function, attribute: false },
            isTitleAnnotationSlotAssigned: { attribute: false },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this.customCSSStyleSheet];
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
            'vl-step--accordion js-vl-accordion': this.toggleable,
        };

        const contentTemplate = this.contentRenderer
            ? this.contentRenderer(this.open)
            : html`<slot name="content"></slot>`;

        return html`
            <li role="listitem" class=${classMap(classes)}>
                <div class="vl-step__container">
                    <div class="vl-step__icon">
                        <slot name="icon"></slot>
                        <span class="vl-step__icon__sub">
                            <slot name="sub-icon"></slot>
                        </span>
                    </div>
                    <div class="vl-step__wrapper">
                        ${stepHeaderTemplate}
                        <div class="vl-step__content-wrapper">
                            <div class="vl-step__content">${contentTemplate}</div>
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
            'slot[name="title-annotation"]'
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
            })
        );
    }

    private getStepHeaderTemplate(): TemplateResult {
        const stepHeaderTitleTemplate = this.getStepHeaderTitleTemplate();

        return html` <div class="vl-step__header">${stepHeaderTitleTemplate}</div>`;
    }

    private getAccordionStepHeaderTemplate(): TemplateResult {
        const stepHeaderTitleTemplate = this.getStepHeaderTitleTemplate();

        return html`
            <button class="vl-step__header js-vl-accordion__toggle">
                ${stepHeaderTitleTemplate}
                <div class="vl-step__header__info" aria-hidden="true">
                    <em class="vl-step__accordion-toggle"></em>
                </div>
            </button>
        `;
    }

    private getStepHeaderTitleTemplate(): TemplateResult {
        return html`
            <div class="vl-step__header__titles">
                <h3 class="vl-step__title">
                    <slot name="title"></slot>
                    ${this.isTitleAnnotationSlotAssigned
                        ? html`
                              <span class="vl-step__title__annotation">
                                  <slot name="title-annotation"></slot>
                              </span>
                          `
                        : ''}
                </h3>
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
