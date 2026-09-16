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

// De laadtekst zit in de tekstlaag "Pagina is aan het laden" (ontbreekt bij de single-varianten).
// "Pagina is aan het laden" is de code-default van het `text`-attribuut en wordt niet uitgeschreven.
const loaderText = instance.findText('Pagina is aan het laden');
const text = loaderText && loaderText.type === 'TEXT' ? escapeHtml(loaderText.textContent) : '';
const textAttribute = text && text !== 'Pagina is aan het laden' ? ` text="${text}"` : '';

export default {
    example: figma.code`<vl-loader${variant.light ? ' light' : ''}${variant.single ? ' single' : ''}${textAttribute}></vl-loader>`,
    id: 'vl-loader',
    metadata: { nestable: true },
};
