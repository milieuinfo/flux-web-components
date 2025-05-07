import { vlGlobalStyles, vlLegacyStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult } from 'lit';
import { FluxConfig } from '../config/flux-config';

export class GlobalStyles {
    private static instance: GlobalStyles | null = null;

    private defaultStyles: CSSResult[] = [];
    private registered = false;
    private customCss: CSSResult[] = [];
    private registeredCustomCss = false;

    private constructor() {}

    static getInstance(defaultStyles: CSSResult[] = [vlResetStyles, ...vlLegacyStyles, ...vlGlobalStyles]) {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GlobalStyles();
        this.instance.defaultStyles = defaultStyles;
        return this.instance;
    }

    public register() {
        if (!this.registered) {
            if (FluxConfig.getPreferences().autoRegisterStyles) {
                document.adoptedStyleSheets = [
                    ...document.adoptedStyleSheets,
                    ...(this.defaultStyles.map((style) => style.styleSheet) as CSSStyleSheet[]),
                ];
                console.info('GlobalStyles: global styling toegevoegd aan het document');
            } else {
                console.info(
                    'GlobalStyles: geen global styling toegevoegd aan het document - autoRegisterStyles is uitgeschakeld'
                );
            }
            this.registered = true;
            this.registerCustomCSS();
        }
    }

    public addCustomCss(customCSS: CSSResult[]) {
        this.customCss = [...this.customCss, ...customCSS];
        this.registeredCustomCss = false;
        this.registerCustomCSS();
    }

    private registerCustomCSS() {
        if (!this.registered) return;
        if (this.customCss.length > 0 && !this.registeredCustomCss) {
            document.adoptedStyleSheets = [
                ...document.adoptedStyleSheets,
                ...(this.customCss.map((style) => style.styleSheet) as CSSStyleSheet[]),
            ];
            this.customCss = [];
            this.registeredCustomCss = true;
            console.info('GlobalStyles: custom global styling toegevoegd aan het document');
        }
    }
}
