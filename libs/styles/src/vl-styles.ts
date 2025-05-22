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

export const vlLayoutStyles = [
    vlAccessibilityStyles,
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

export const vlStyles = [
    vlGeneralVars,
    vlColorVars,
    vlSpacingVars,
    vlTypographyVars,
    vlZLayerVars,
    vlFontStyles,
    vlBodyStyles,
    ...vlLayoutStyles,
];
