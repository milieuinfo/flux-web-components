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
    };

    declare type: string;
    declare disabled: boolean;
    declare closable: boolean;
    declare checkable: boolean;
    declare checked: boolean;
    declare clickable: boolean;

    static styles = css`
        :host {
            display: inline-block;
        }
        :host([disabled]) {
            pointer-events: none;
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
