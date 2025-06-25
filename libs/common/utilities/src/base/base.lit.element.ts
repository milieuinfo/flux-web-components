import { LitElement, PropertyDeclarations } from 'lit';
import { GlobalStyles } from '../css';

export class BaseLitElement extends LitElement {
    protected allowCustomCSS = true;
    private customCSS: string | null = null;
    private customCSSPrefix: string | null = null;

    constructor() {
        super();

        GlobalStyles.getInstance().register();
    }

    static get properties(): PropertyDeclarations {
        return {
            customCSS: { type: String, attribute: 'custom-css', reflect: true },
            customCSSPrefix: { type: String, attribute: 'data-vl-custom-css', reflect: true },
        };
    }

    // We fixen hier de `getRootNode()` return type, omdat `getRootNode()` standaard `Node` retourneert 
    // en om te vermijden dat we overal het type moeten casten naar `Element` of `ShadowRoot`.
    getRootNode(options?: GetRootNodeOptions): Element | ShadowRoot {
        return super.getRootNode(options) as Element | ShadowRoot;
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
