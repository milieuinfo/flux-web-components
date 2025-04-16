import { BaseLitElement, registerWebComponents, VL } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { resetStyle } from '@domg/govflanders-style/common';
import { stepsStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { VlAccordionComponent } from '../accordion/vl-accordion.component';
import stepUigStyle from './vl-step.uig-css';

declare const vl: VL;

@customElement('vl-step')
export class VlStepComponent extends BaseLitElement {
    // Attributen
    private type: string | null = null;
    private toggleable = false;

    // Private properties
    private isTitleAnnotationSlotAssigned = true;
    private customCSSStyleSheet = new CSSStyleSheet();

    static {
        registerWebComponents([VlAccordionComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlLegacyStyles, stepsStyle, stepUigStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            type: { type: String, attribute: 'data-vl-type', reflect: true },
            toggleable: { type: Boolean, attribute: 'data-vl-toggleable', reflect: true },
            isTitleAnnotationSlotAssigned: { attribute: false },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this.customCSSStyleSheet];
        }
    }

    protected firstUpdated(changedProperties: Map<PropertyKey, unknown>): void {
        super.firstUpdated(changedProperties);

        if (this.toggleable) {
            const accordion = this.shadowRoot?.querySelector('.js-vl-accordion__toggle');
            const isAccordionDressed = accordion?.hasAttribute('data-vl-accordion-dressed');

            if (!isAccordionDressed) {
                vl.accordion.dress(accordion);
                this.shadowRoot?.querySelector('slot[name="title"]')?.addEventListener('click', (event: Event) => {
                    event.stopPropagation();
                    (this.shadowRoot?.querySelector('button.js-vl-accordion__toggle') as HTMLButtonElement)?.click();
                });
            }
        }

        const titleAnnotationSlot = this.shadowRoot?.querySelector(
            'slot[name="title-annotation"]'
        ) as HTMLSlotElement | null;
        this.isTitleAnnotationSlotAssigned =
            (titleAnnotationSlot && titleAnnotationSlot.assignedNodes().length > 0) || false;
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
                            <div class="vl-step__content">
                                <slot name="content"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `;
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

    setCustomStyles(customCSS: string) {
        this.customCSSStyleSheet.replaceSync(customCSS);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-step': VlStepComponent;
    }
}
