// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=11-8339
// source=libs/components/src/atom/title/vl-title.component.ts
// component=VlTitleComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-set heeft één as `type` met 30 waarden die vier dimensies coderen:
// het heading-niveau plus de attributen alt, no-space-bottom en underline.
const type: { level?: string; alt?: boolean; noSpaceBottom?: boolean; underline?: boolean } =
    instance.getEnum('type', {
        h1: { level: 'h1' },
        h2: { level: 'h2' },
        h3: { level: 'h3' },
        h4: { level: 'h4' },
        h5: { level: 'h5' },
        h6: { level: 'h6' },

        'h1 - alt': { level: 'h1', alt: true },
        'h2 - alt': { level: 'h2', alt: true },
        'h3 - alt': { level: 'h3', alt: true },
        'h4 - alt': { level: 'h4', alt: true },
        'h5 - alt': { level: 'h5', alt: true },
        'h6 - alt': { level: 'h6', alt: true },

        'h1 - no-space-bottom': { level: 'h1', noSpaceBottom: true },
        'h2 - no-space-bottom': { level: 'h2', noSpaceBottom: true },
        'h3 - no-space-bottom': { level: 'h3', noSpaceBottom: true },
        'h4 - no-space-bottom': { level: 'h4', noSpaceBottom: true },
        'h5 - no-space-bottom': { level: 'h5', noSpaceBottom: true },
        'h6 - no-space-bottom': { level: 'h6', noSpaceBottom: true },

        'h1 - alt - no-space-bottom': { level: 'h1', alt: true, noSpaceBottom: true },
        'h2 - alt - no-space-bottom': { level: 'h2', alt: true, noSpaceBottom: true },
        'h3 - alt - no-space-bottom': { level: 'h3', alt: true, noSpaceBottom: true },
        'h4 - alt - no-space-bottom': { level: 'h4', alt: true, noSpaceBottom: true },
        'h5 - alt - no-space-bottom': { level: 'h5', alt: true, noSpaceBottom: true },
        'h6 - alt - no-space-bottom': { level: 'h6', alt: true, noSpaceBottom: true },

        'h1 - underline': { level: 'h1', underline: true },
        'h2 - underline': { level: 'h2', underline: true },
        'h3 - underline': { level: 'h3', underline: true },
        'h4 - underline': { level: 'h4', underline: true },
        'h5 - underline': { level: 'h5', underline: true },
        'h6 - underline': { level: 'h6', underline: true },
    }) ?? {};

// De titeltekst is de enige tekstlaag en hangt niet aan een component-property. Ze wordt niet op naam gezocht: de
// laagnaam volgt in de library de voorbeeldtekst en verandert mee als die aangepast wordt.
const heading = instance.findLayers((node) => node.type === 'TEXT')[0];
const label = heading && heading.type === 'TEXT' ? escapeHtml(heading.textContent) : '';

export default {
    example: figma.code`<vl-title type="${type.level}"${type.alt ? ' alt' : ''}${
        type.underline ? ' underline' : ''
    }${type.noSpaceBottom ? ' no-space-bottom' : ''}>${label}</vl-title>`,
    id: 'vl-title',
    metadata: { nestable: true },
};
