// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=204-2948
// source=libs/components/src/block/search-filter/vl-search-filter.component.ts
// component=VlSearchFilterComponent
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// De Figma-as `variant` bevat naast `default` en `alt` ook twee "(deprecated)"-varianten met een oudere opbouw
// (vl-form-label + vl-input-field in plaats van de .vl-stacked-slot); die mappen op dezelfde attributen.
// `mobile-modal` en `mobile-modal-title` hebben geen Figma-equivalent.
const variant: { alt?: boolean } =
    instance.getEnum('variant', {
        'default (deprecated)': {},
        'alt (deprecated)': { alt: true },
        default: {},
        alt: { alt: true },
    }) ?? {};

// De intro-tekst is de enige eigen tekstlaag (de andere zitten in geneste instances) en hangt niet aan een
// component-property. Ze wordt niet op naam gezocht: de laagnaam volgt in de library de voorbeeldtekst.
const titleLayer = instance.findLayers((node) => node.type === 'TEXT')[0];
const filterTitle = titleLayer && titleLayer.type === 'TEXT' ? escapeHtml(titleLayer.textContent) : '';

// Het formulier (secties, velden en de knoppen in .vl-group) is default-slot-content.
export default {
    example: figma.code`<vl-search-filter${filterTitle ? ` filter-title="${filterTitle}"` : ''}${variant.alt ? ' alt' : ''}>
    <form>
        <section>...</section>
        <footer>
            <div class="vl-group vl-group--wrap">
                <vl-button type="submit">Zoeken</vl-button>
                <vl-button type="reset" secondary>Reset</vl-button>
            </div>
        </footer>
    </form>
</vl-search-filter>`,
    id: 'vl-search-filter',
    metadata: { nestable: true },
};
