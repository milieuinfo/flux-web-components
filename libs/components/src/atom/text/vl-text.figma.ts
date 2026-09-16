// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=431-2469
// source=libs/components/src/atom/text/vl-text.component.ts
// component=VlTextComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// In Figma is `variant` één as; in code zijn het losse boolean attributen die combineerbaar zijn.
const variant: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    success?: boolean;
    warning?: boolean;
    error?: boolean;
    annotation?: boolean;
    small?: boolean;
} =
    instance.getEnum('variant', {
        default: {},
        bold: { bold: true },
        italic: { italic: true },
        underline: { underline: true },
        success: { success: true },
        warning: { warning: true },
        error: { error: true },
        annotation: { annotation: true },
        small: { small: true },
    }) ?? {};

// De tekst zit per variant in een anders genaamde tekstlaag ("vl-text - default", "vl-text - bold", ...)
// zonder component-property; neem daarom de eerste tekstlaag.
const textLayer = instance.findLayers((node) => node.type === 'TEXT')[0];
const text = textLayer && textLayer.type === 'TEXT' ? escapeHtml(textLayer.textContent) : '';

export default {
    example: figma.code`<vl-text${variant.bold ? ' bold' : ''}${variant.italic ? ' italic' : ''}${
        variant.underline ? ' underline' : ''
    }${variant.success ? ' success' : ''}${variant.warning ? ' warning' : ''}${variant.error ? ' error' : ''}${
        variant.annotation ? ' annotation' : ''
    }${variant.small ? ' small' : ''}>${text}</vl-text>`,
    id: 'vl-text',
    metadata: { nestable: true },
};
