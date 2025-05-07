import { BaseLitElement } from '@domg-wc/common';
import { accessibilityStyle, baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { TYPE } from './vl-pill.model';
import { vlPillFluxStyles } from './vl-pill.flux-css';

@customElement('vl-pill')
export class VlPillComponent extends BaseLitElement {
    private disabled = false;
    private type = '';
    private closable = false;
    private checkable = false;
    private checked: boolean | undefined;
    private checkboxRef: any;
    private isInMap = false;
    private clickable = false;

    constructor() {
        super();
        this.disabled = false;
        this.closable = false;
        this.checkable = false;
        this.clickable = false;
        this.checked = false;
        this.checkboxRef = createRef();
    }

    static get styles() {
        return [resetStyle, vlPillFluxStyles, baseStyle, accessibilityStyle];
    }

    static get properties() {
        return {
            disabled: {
                type: Boolean,
                attribute: 'disabled',
                reflect: true,
            },
            type: {
                type: String,
                attribute: 'type',
                reflect: true,
            },
            closable: {
                type: Boolean,
                attribute: 'closable',
                reflect: true,
            },
            checkable: {
                type: Boolean,
                attribute: 'checkable',
                reflect: true,
            },
            checked: {
                type: Boolean || undefined,
                attribute: 'checked',
                reflect: true,
            },
            clickable: {
                type: Boolean,
                attribute: 'clickable',
                reflect: true,
            },
        };
    }

    private get classes() {
        return {
            'vl-pill': true,
            'vl-pill--disabled': this.disabled,
            'vl-pill--success': this.type === TYPE.SUCCESS,
            'vl-pill--warning': this.type === TYPE.WARNING,
            'vl-pill--error': this.type === TYPE.ERROR,
            'vl-pill--map': this.isInMap,
        };
    }

    updated(changedProperties: any) {
        changedProperties.forEach((oldValue: any, propName: any) => {
            switch (propName) {
                case 'checked':
                    if (this.checkboxRef.value) {
                        this.checkboxRef.value.checked = this.checked;
                    }
                    break;
                default:
                    break;
            }
        });
    }

    render() {
        if (this.closable) {
            return this.renderClosable();
        }

        if (this.checkable) {
            return this.renderCheckable();
        }

        if (this.clickable) {
            return this.renderClickable();
        }

        return this.renderDefault();
    }

    private renderDefault() {
        return html`
            <span class="${classMap(this.classes)}">
                <slot></slot>
            </span>
        `;
    }

    private renderClosable() {
        const closableClasses = {
            ...this.classes,
            'vl-pill--closable': this.closable,
        };

        return html`
            <div class="${classMap(closableClasses)}">
                <slot></slot>
                <button
                    class="vl-pill__close"
                    type="button"
                    @click=${() => this.dispatchEvent(new CustomEvent('close'))}
                >
                    <span class="vl-u-visually-hidden">Optie verwijderen</span>
                </button>
            </div>
            </div>
        `;
    }

    private renderCheckable() {
        const checkableClasses = {
            ...this.classes,
            'vl-pill--checkable': this.checkable,
        };

        return html`
            <label class="${classMap(checkableClasses)}" for="checkbox">
                <input
                    class="vl-pill--checkable__checkbox"
                    type="checkbox"
                    id="checkbox"
                    name="checkbox"
                    ?disabled=${this.disabled}
                    ?checked=${this.checked}
                    ${ref(this.checkboxRef)}
                    value="checked"
                    @input=${(event: any) => {
                        this.checked = event.target.checked;
                        this.dispatchEvent(
                            new CustomEvent('check', {
                                bubbles: true,
                                composed: true,
                                detail: { checked: this.checked },
                            })
                        );
                    }}
                />
                <span></span>
                <slot></slot>
            </label>
        `;
    }

    private renderClickable() {
        const clickableClasses = {
            ...this.classes,
            'vl-pill--clickable': this.clickable,
        };

        return html`
            <button
                class="${classMap(clickableClasses)}"
                type="button"
                ?disabled=${this.disabled}
                @click=${() => this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }))}
            >
                <slot></slot>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-pill': VlPillComponent;
    }
}
