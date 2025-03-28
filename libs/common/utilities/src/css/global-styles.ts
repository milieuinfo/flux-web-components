import { CSSResult } from 'lit';
import { vlAccessibilityStyles } from './base/accessibility/vl-accessibility.css';
import { vlBodyStyles } from './base/body/vl-body.css';
import { vlFontStyles } from './base/font/vl-font.css';
import { vlColorVars } from './base/var/vl-color.css';
import { vlGeneralVars } from './base/var/vl-general.css';
import { vlSpacingVars } from './base/var/vl-spacing.css';
import { vlTypographyVars } from './base/var/vl-typography.css';
import { vlZLayerVars } from './base/var/vl-z-layer.css';
import { vlContentBlockStyles } from './layout/content-block/vl-content-block.css';
import { vlGridStyles } from './layout/grid/vl-grid.css';
import { vlGroupStyles } from './layout/group/vl-group.css';
import { vlMarginStyles } from './layout/margin/vl-margin.css';
import { vlPaddingStyles } from './layout/padding/vl-padding.css';
import { vlSectionStyles } from './layout/section/vl-section.css';
import { vlSeparatorStyles } from './layout/separator/vl-separator.css';
import { vlSpacerStyles } from './layout/spacer/vl-spacer.css';
import { vlStackedStyles } from './layout/stacked/vl-stacked.css';

export const globalStyles = [
    vlGeneralVars,
    vlColorVars,
    vlSpacingVars,
    vlTypographyVars,
    vlZLayerVars,
    vlAccessibilityStyles,
    vlFontStyles,
    vlBodyStyles,
    vlSectionStyles,
    vlGridStyles,
    vlGroupStyles,
    vlMarginStyles,
    vlPaddingStyles,
    vlSeparatorStyles,
    vlSpacerStyles,
    vlStackedStyles,
    vlContentBlockStyles,
];

export class GlobalStyles {
    private static instance: GlobalStyles | null = null;

    private defaultStyles: CSSResult[] = [];
    private registered = false;
    private customCss: CSSResult[] = [];
    private registeredCustomCss = false;

    private constructor() {}

    static getInstance(defaultStyles: CSSResult[] = globalStyles) {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GlobalStyles();
        this.instance.defaultStyles = defaultStyles;
        return this.instance;
    }

    public register() {
        if (!this.registered) {
            document.adoptedStyleSheets = [
                ...document.adoptedStyleSheets,
                ...(this.defaultStyles.map((style) => style.styleSheet) as CSSStyleSheet[]),
            ];
            this.registered = true;
            console.info('GlobalStyles: global styling toegevoegd aan het document');
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
