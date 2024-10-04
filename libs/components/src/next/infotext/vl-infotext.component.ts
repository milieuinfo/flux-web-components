import { BaseLitElement, throttle, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext } from '@domg-wc/common-utilities/css';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import infotextStyle from './vl-infotext.css';
import { infotextDefaults } from './vl-infotext.defaults';

@globalStylesNext()
@webComponent('vl-infotext-next')
export class VlInfotextComponent extends BaseLitElement {
    // Attribute(s)
    private badge = infotextDefaults.badge;
    private href = infotextDefaults.href;
    private external = infotextDefaults.external;

    // State
    value = '';

    // Variable(s)
    private customStyleSheet: CSSStyleSheet = new CSSStyleSheet();
    private valueObserver: MutationObserver | null = null;
    private throttledAdjustValue = throttle(() => this.adjustValue(), 100);

    static get styles(): CSSResult[] {
        return [infotextStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            badge: { type: Boolean },
            href: { type: String },
            external: { type: Boolean },
            value: { type: String, state: true },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.adjustValue();
        this.valueObserver = new MutationObserver(() => this.adjustValue());
        this.getValueSlot() && this.valueObserver.observe(this.getValueSlot()!, { subtree: true, childList: true });
        window.addEventListener('resize', this.throttledAdjustValue);
        this.shadowRoot!.adoptedStyleSheets = [...this.shadowRoot!.adoptedStyleSheets, this.customStyleSheet];
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.valueObserver?.disconnect();
        window.removeEventListener('resize', this.throttledAdjustValue);
    }

    render(): TemplateResult {
        const classes = {
            'vl-infotext': true,
            'vl-infotext--badge': this.badge,
        };

        if (this.href) {
            const target = this.external ? '_blank' : nothing;
            return html`<a class=${classMap(classes)} href=${this.href} target=${target}>${this.renderContent()}</a>`;
        }

        return html` <div class=${classMap(classes)}>${this.renderContent()}</div>`;
    }

    renderContent(): TemplateResult {
        return html`
            <div class="vl-infotext__value">${this.value}</div>
            <div class="vl-infotext__text">
                <slot name="text"></slot>
            </div>
            <slot name="value" hidden></slot>
        `;
    }

    private getValueSlot(): HTMLSlotElement | null {
        return this.querySelector('[slot="value"]') as HTMLSlotElement | null;
    }

    private adjustValue() {
        const valueSlot = this.getValueSlot();
        const formattedValue = this.getFormattedValue(valueSlot?.textContent);
        const customFontSize = this.getCustomFontSize(formattedValue.length);

        this.value = formattedValue;
        this.customStyleSheet.replaceSync(`.vl-infotext__value { font-size: ${customFontSize}; }`);
    }

    private getFormattedValue(value: string | null | undefined): string {
        if (!value || isNaN(Number(value))) {
            return value || '';
        }

        return Intl.NumberFormat('nl-BE').format(Number(value));
    }

    private getCustomFontSize = (textLength = 0): string => {
        const shouldUseSmallerFontSize = !this.badge && window.innerWidth <= 767;
        const normalFontSize = shouldUseSmallerFontSize ? 2.4 : 4.8;
        const minimumFontSize = 1.6;
        const customFontSize = normalFontSize - textLength / 4;

        if (!textLength || textLength <= 4) {
            return `${normalFontSize}rem`;
        }

        if (customFontSize < minimumFontSize) {
            return `${minimumFontSize}rem`;
        }

        return `${customFontSize}rem`;
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-infotext-next': VlInfotextComponent;
    }
}
