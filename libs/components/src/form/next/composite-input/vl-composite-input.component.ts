import { webComponent } from '@domg-wc/common';
import { css, CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { FormControl } from '../../form-control';
import {
    CompositeCustomValidator,
    customErrorValidator,
    requiredAllValidator,
    SlottableValueElement,
    slotValues,
    slottedFields,
} from './validators';

type SlottedElement = SlottableValueElement & { validationTarget?: HTMLElement };

const PROPAGATED_ATTRIBUTES = ['disabled', 'success'] as const;

@webComponent('vl-composite-input-next')
export class VlCompositeInputComponent extends FormControl {
    customValidator?: CompositeCustomValidator;

    protected override submitFormOnEnter = false;

    private lastDetailJson: string | undefined;

    static formControlValidators = [requiredAllValidator, customErrorValidator];

    static get properties(): PropertyDeclarations {
        return {
            customValidator: { attribute: false },
        };
    }

    static get styles(): CSSResult[] {
        return [
            css`
                fieldset {
                    border: 0;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .vl-u-visually-hidden {
                    position: absolute !important;
                    height: 1px;
                    width: 1px;
                    overflow: hidden;
                    clip: rect(1px, 1px, 1px, 1px);
                    margin: -1px;
                    padding: 0;
                    border: 0;
                    left: 0;
                    top: 0;
                }
            `,
        ];
    }

    get validationTarget(): HTMLElement | undefined | null {
        const field = slottedFields(this)[0] as SlottedElement | undefined;
        return field?.validationTarget ?? field;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('vl-change', this.onChildEvent);
        this.addEventListener('vl-reset', this.onChildReset);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('vl-change', this.onChildEvent);
        this.removeEventListener('vl-reset', this.onChildReset);
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('customValidator')) {
            this.syncFields();
        }

        PROPAGATED_ATTRIBUTES.forEach((attribute) => {
            if (changedProperties.has(attribute)) {
                this.propagateAttribute(attribute, this[attribute], changedProperties.get(attribute) === true);
            }
        });
    }

    firstUpdated() {
        this.syncFields();
    }

    render(): TemplateResult {
        return html`
            <fieldset part="fieldset">
                <legend class="vl-u-visually-hidden">${this.label || 'Samengesteld invoerveld'}</legend>
                <slot @slotchange=${this.onSlotChange}></slot>
            </fieldset>
        `;
    }

    private onSlotChange = () => {
        this.propagateState();
        this.syncFields();
    };

    private onChildEvent = (event: Event) => {
        if (event.target === this) return;
        this.syncFields();
    };

    private onChildReset = (event: Event) => {
        if (event.target === this) return;
        queueMicrotask(() => {
            if (this.isConnected) this.syncFields();
        });
    };

    private syncFields() {
        const detail = slotValues(this);
        this.setValue(null);

        const detailJson = JSON.stringify(detail);
        if (this.lastDetailJson !== undefined && this.lastDetailJson !== detailJson) {
            this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
            this.dispatchEventIfValid(detail);
        }
        this.lastDetailJson = detailJson;

        this.requestUpdate();
    }

    private propagateState() {
        PROPAGATED_ATTRIBUTES.forEach((attribute) => {
            if (this[attribute]) {
                this.propagateAttribute(attribute, true);
            }
        });
    }

    private propagateAttribute(attribute: string, present: boolean, wasPresent = true) {
        if (!present && !wasPresent) {
            return;
        }
        this.eachChild((el) => (present ? el.setAttribute(attribute, '') : el.removeAttribute(attribute)));
    }

    private eachChild(fn: (el: SlottedElement) => void) {
        (slottedFields(this) as SlottedElement[]).forEach(fn);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-composite-input-next': VlCompositeInputComponent;
    }
}
