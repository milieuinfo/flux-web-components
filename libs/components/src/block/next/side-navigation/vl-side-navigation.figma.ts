// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=144-13841
// source=libs/components/src/block/next/side-navigation/vl-side-navigation.component.ts
// component=VlSideNavigationComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-set sluit aan bij vl-side-navigation-next (titel als attribuut + default slot met items), niet bij de
// klassieke vl-side-navigation (titel en items als sub-componenten). De as `variant` heeft enkel de waarden
// `deprecated (use default)` en `default`; beide mappen op dezelfde output.
// `closed`, `compact`, `child-spacing`, `multi-active`, `heading-root-selector`, `min-level`, `max-level`,
// `max-depth` en `exclude-selectors` hebben geen Figma-equivalent.
instance.getEnum('variant', {
    'deprecated (use default)': {},
    default: {},
});

// De titel is de eerste tekstlaag en hangt niet aan een component-property. Ze wordt niet op naam gezocht: de
// laagnaam volgt in de library de voorbeeldtekst en verandert mee als die aangepast wordt.
// Het attribuut wordt enkel uitgeschreven als de tekst afwijkt van de code-default "Op deze pagina"
// (hoofdletterongevoelig, omdat de Figma-laag in kleine letters staat en via CSS in kapitalen getoond wordt).
const titleLayer = instance.findLayers((node) => node.type === 'TEXT')[0];
const title = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';
const navigationTitle = title && title.toLowerCase() !== 'op deze pagina' ? title : '';

const slot = instance.getSlot('slot');

export default {
    example: figma.code`<vl-side-navigation-next${
        navigationTitle ? ` navigation-title="${navigationTitle}"` : ''
    }>${slot}</vl-side-navigation-next>`,
    id: 'vl-side-navigation-next',
    metadata: { nestable: true },
};
