import { vlBodyStyles } from './base/body/vl-body.css';
import { vlFontStyles } from './base/font/vl-font.css';
import { vlColorStyles } from './base/var/vl-color.css';
import { vlGeneralStyles } from './base/var/vl-general.css';
import { vlSpacingStyles } from './base/var/vl-spacing.css';
import { vlTypographyStyles } from './base/var/vl-typography.css';
import { vlGridStyles } from './layout/grid/vl-grid.css';
import { vlGroupStyles } from './layout/group/vl-group.css';
import { vlMarginStyles } from './layout/margin/vl-margin.css';
import { vlPaddingStyles } from './layout/padding/vl-padding.css';
import { vlSectionStyles } from './layout/section/vl-section.css';
import { vlSeparatorStyles } from './layout/separator/vl-separator.css';
import { vlSpacerStyles } from './layout/spacer/vl-spacer.css';
import { vlStackedStyles } from './layout/stacked/vl-stacked.css';

const globalStyles = [
    vlFontStyles,
    vlColorStyles,
    vlGeneralStyles,
    vlSpacingStyles,
    vlTypographyStyles,
    vlBodyStyles,
    vlSectionStyles,
    vlGridStyles,
    vlGroupStyles,
    vlMarginStyles,
    vlPaddingStyles,
    vlSeparatorStyles,
    vlSpacerStyles,
    vlStackedStyles,
];

export class GlobalStyles {
    static registered = false;

    static register() {
        if (!this.registered) {
            document.adoptedStyleSheets = [
                ...document.adoptedStyleSheets,
                ...(globalStyles.map((style) => style.styleSheet) as CSSStyleSheet[]),
            ];
            this.registered = true;
            console.log('GlobalStyles: global styling toegevoegd aan het document');
        }
    }
}
