import { LitElement, PropertyDeclarations } from 'lit';

export class BaseLitElement extends LitElement {
    protected allowCustomCSS = true;
    private customCSS: string | null = null;
    private customCSSPrefix: string | null = null;

    static get properties(): PropertyDeclarations {
        return {
            customCSS: { type: String, attribute: 'custom-css', reflect: true },
            customCSSPrefix: { type: String, attribute: 'data-vl-custom-css', reflect: true },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.addCustomCSS();
    }

    private addCustomCSS(): void {
        this.customCSS = this.customCSSPrefix ? this.customCSSPrefix : this.customCSS;

        if (this.customCSS && !this.allowCustomCSS) {
            console.warn('Custom CSS is niet toegelaten voor dit component.');
            return;
        }

        if (this.customCSS && !this.shadowRoot) {
            console.warn('Dit component heeft geen shadow DOM om custom CSS aan toe te voegen.');
            return;
        }

        if (this.customCSS && this.shadowRoot) {
            const customStyleSheet = new CSSStyleSheet();

            customStyleSheet.replaceSync(this.customCSS);
            this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, customStyleSheet];
        }
    }
}
