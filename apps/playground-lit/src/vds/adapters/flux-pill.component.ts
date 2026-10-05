import { css, LitElement, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import {
    VlClickableTag,
    VlInformativeTag,
    VlRemovableTag,
    VlSelectableTag,
} from '@govflanders/vl-ui-design-system-web-components';

const tagOf = (cls: unknown) => unsafeStatic((cls as { elementName: string }).elementName);

const STATUS: Record<string, string> = { success: 'success', warning: 'warning', error: 'error' };

export class FluxPill extends LitElement {
    static properties = {
        type: { type: String, reflect: true },
        disabled: { type: Boolean, reflect: true },
        closable: { type: Boolean, reflect: true },
        checkable: { type: Boolean, reflect: true },
        checked: { type: Boolean, reflect: true },
        clickable: { type: Boolean, reflect: true },
        bare: { type: Boolean, reflect: true },
    };

    declare type: string;
    declare disabled: boolean;
    declare closable: boolean;
    declare checkable: boolean;
    declare checked: boolean;
    declare clickable: boolean;
    declare bare: boolean;

    static styles = css`
        :host {
            display: inline-block;
        }
        :host([disabled]) {
            pointer-events: none;
            cursor: not-allowed;
        }
        :host([bare][disabled]) {
            opacity: 0.5;
        }
        :host(:not([bare])) {
            --flux-pill-bg: #ffffff;
            --flux-pill-border: #8695a8;
            --flux-pill-color: #687483;
        }
        :host(:not([bare])[type='success']) {
            --flux-pill-bg: #ecf6ee;
            --flux-pill-border: #009e47;
            --flux-pill-color: #007a37;
        }
        :host(:not([bare])[type='warning']) {
            --flux-pill-bg: #fff9e8;
            --flux-pill-border: #ffa10a;
            --flux-pill-color: #9f5804;
        }
        :host(:not([bare])[type='error']) {
            --flux-pill-bg: #fbeded;
            --flux-pill-border: #d2373c;
            --flux-pill-color: #bc3136;
        }
        :host(:not([bare])[clickable]:not([type])) {
            --flux-pill-color: #0055cc;
        }
        :host(:not([bare])[disabled]) {
            --flux-pill-bg: #f7f9fc;
            --flux-pill-border: #cfd5dd;
            --flux-pill-color: #8695a8;
        }
        :host(:not([bare])[closable]) *::part(base) {
            padding-right: 0;
        }
        :host(:not([bare])) *::part(close) {
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
            margin: -1px -1px -1px 1.4rem;
            padding: 0;
            border: 1px solid var(--flux-pill-border);
            border-radius: 0 0.3rem 0.3rem 0;
            background: transparent;
            color: var(--flux-pill-color);
            font-size: 1.3rem;
        }
        :host(:not([bare])[checkable]) *::part(base) {
            position: relative;
            padding-left: 3.6rem;
        }
        :host(:not([bare])[checkable]) *::part(base)::before {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            box-sizing: border-box;
            width: 2.4rem;
            height: 2.4rem;
            border: 1px solid var(--flux-pill-border);
            border-radius: 0.3rem 0 0 0.3rem;
            background: #ffffff;
        }
        :host(:not([bare])[checkable][checked]) *::part(base)::before {
            border-color: #0055cc;
            background: #0055cc;
        }
        :host(:not([bare])[checkable]) *::part(checkmark) {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.2rem;
            height: 2.2rem;
            margin: 0;
            color: #ffffff;
            font-size: 0.8rem;
        }
        :host(:not([bare])) *::part(base) {
            box-sizing: border-box;
            height: 2.4rem;
            padding: 0 1.4rem;
            border-radius: 0.3rem;
            border-color: var(--flux-pill-border);
            background: var(--flux-pill-bg);
            color: var(--flux-pill-color);
            line-height: 2.2rem;
        }
    `;

    private get status(): string {
        return STATUS[this.type] ?? 'default';
    }

    private onRemove(): void {
        this.dispatchEvent(new CustomEvent('close'));
    }

    private onChange(e: CustomEvent<{ value: boolean }>): void {
        this.checked = e.detail.value;
        this.dispatchEvent(
            new CustomEvent('check', { bubbles: true, composed: true, detail: { checked: this.checked } })
        );
    }

    protected async updated(): Promise<void> {
        const inner = this.shadowRoot?.firstElementChild as (Element & { updateComplete?: Promise<unknown> }) | null;
        await inner?.updateComplete;
        const root = inner?.shadowRoot;
        root?.querySelector('[part~="close-icon"] > *')?.setAttribute('size', this.bare ? 'small' : 'l');
        const check = root?.querySelector('[part~="checkmark"] > *');
        check?.setAttribute('icon', this.bare ? 'check-filled' : 'check');
        check?.setAttribute('size', this.bare ? 'small' : 's');
    }

    render(): TemplateResult {
        const disabled = ifDefined(this.disabled ? 'true' : undefined);
        if (this.closable) {
            return html`<${tagOf(VlRemovableTag)} status=${this.status} aria-disabled=${disabled} @vl-remove=${this.onRemove}
                ><slot></slot
            ></${tagOf(VlRemovableTag)}>`;
        }
        if (this.checkable) {
            return html`<${tagOf(VlSelectableTag)}
                status=${this.status}
                aria-disabled=${disabled}
                ?selected=${this.checked}
                @vl-change=${this.onChange}
                ><slot></slot
            ></${tagOf(VlSelectableTag)}>`;
        }
        if (this.clickable) {
            return html`<${tagOf(VlClickableTag)} status=${this.status} aria-disabled=${disabled}
                ><slot></slot
            ></${tagOf(VlClickableTag)}>`;
        }
        return html`<${tagOf(VlInformativeTag)} status=${this.status} aria-disabled=${disabled}
            ><slot></slot
        ></${tagOf(VlInformativeTag)}>`;
    }
}

if (!customElements.get('flux-pill')) {
    customElements.define('flux-pill', FluxPill);
}
