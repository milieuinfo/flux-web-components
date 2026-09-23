// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=457-4760
// source=libs/components/src/block/loader/vl-loader.component.ts
// component=VlLoaderComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `variant` codeert de attributen `light` en `single`.
const variant: { single?: boolean; light?: boolean } =
    instance.getEnum('variant', {
        default: {},
        single: { single: true },
        light: { light: true },
        'single - light': { single: true, light: true },
    }) ?? {};

// De laadtekst is de enige tekstlaag (verborgen bij de single-varianten). Ze wordt niet op naam gezocht: de laagnaam
// volgt in de library de voorbeeldtekst en verandert mee als die aangepast wordt.
// "Pagina is aan het laden" is de code-default van het `text`-attribuut en wordt niet uitgeschreven.
const loaderText = instance.findLayers((node) => node.type === 'TEXT')[0];
const text = loaderText && loaderText.type === 'TEXT' ? escapeHtml(loaderText.textContent) : '';
const textAttribute = text && text !== 'Pagina is aan het laden' ? ` text="${text}"` : '';

export default {
    example: figma.code`<vl-loader${variant.light ? ' light' : ''}${variant.single ? ' single' : ''}${textAttribute}></vl-loader>`,
    id: 'vl-loader',
    metadata: { nestable: true },
};
