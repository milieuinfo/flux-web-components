import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { VlSearchComponent } from '@domg-wc/components';
import { SELECT_POSITION, vlElementsStyle, VlSelect } from '@domg-wc/elements';
import OlOverlay from 'ol/Overlay';
import { VlSelectLocationComponent } from '../next/select-location/vl-select-location';

@webComponent('vl-map-search')
export class VlMapSearch extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([VlSelect, VlSelectLocationComponent, VlSearchComponent]);
    }

    static get _observedAttributes() {
        return ['placeholder', 'search-placeholder', 'search-empty-text', 'search-no-results-text'];
    }

    static get _observedClassAttributes() {
        return ['with-offset'];
    }

    get _classPrefix() {
        return 'vl-map-search--';
    }

    constructor() {
        super(`
          <style>
            ${vlElementsStyle}
            :host {
              display: block;
            }

            ::part(vl-select-rich__combobox) {
                background-color: white;
            }

            ::part(vl-select-rich__combobox)::before {
                display: none;
            }
                
            vl-search {
                display: block;
                height: 3.5rem;
            }
          </style>
          <vl-search id="search" data-vl-inline>
            <vl-select-location-next slot="input" not-deletable position=${SELECT_POSITION.BOTTOM}></vl-select-location-next>
          </vl-search>
        `);
        this.configure();
    }

    connectedCallback() {
        this.addEventListener('vl-input', this.changeLocation);
        this.addEventListener('keypress', this.stopPropagation);
    }

    get _selectElement() {
        return this._shadow.querySelector('vl-select-location-next') as VlSelectLocationComponent;
    }

    bindMap(map) {
        this._map = map;
    }

    /**
     * Bepaal callback die uitgevoerd wordt bij selectie van een locatie via de map search.
     *
     * @param {Function} callback
     */
    onSelect(callback) {
        this._onSelect = callback;
    }

    private zoomTo(boundingBox) {
        this._map.zoomTo(boundingBox, 14);
    }

    private configure() {
        customElements.whenDefined('vl-map').then(() => {
            if (this.parentNode && this.parentNode.map) {
                this._map = this.parentNode._shadow.host;
                this._map.map.addOverlay(
                    new OlOverlay(<any>{
                        className: 'vl-map-search__overlaycontainer',
                        element: this,
                    })
                );
            }
        });
    }

    private changeLocation = async () => {
        try {
            const location = await this._selectElement.location;
            if (location) {
                if (this._onSelect) {
                    this._onSelect(location);
                } else {
                    this.zoomTo(location);
                }
            }
        } catch (error) {
            console.error('Locatie kan niet opgehaald worden.', error);
        }
    };

    private stopPropagation = (e) => {
        e.stopPropagation();
    };

    _placeholderChangedCallback(oldValue, newValue) {
        this._dispatchSelectAttribute('placeholder', newValue);
    }

    _searchPlaceholderChangedCallback(oldValue, newValue) {
        this._dispatchSelectAttribute('search-placeholder', newValue);
    }

    _searchEmptyTextChangedCallback(oldValue, newValue) {
        this._dispatchSelectAttribute('search-empty-text', newValue);
    }

    _searchNoResultsTextChangedCallback(oldValue, newValue) {
        this._dispatchSelectAttribute('search-no-results-text', newValue);
    }

    _dispatchSelectAttribute(attribute, value) {
        if (value != undefined) {
            this._selectElement.setAttribute(`${VlMapSearch.attributePrefix}${attribute}`, value);
        } else {
            this._selectElement.removeAttribute(`${VlMapSearch.attributePrefix}${attribute}`);
        }
    }

    disconnectedCallback() {
        this.removeEventListener('keypress', this.stopPropagation);
        this._selectElement.removeEventListener('vl-input', this.changeLocation);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-search': VlMapSearch;
    }
}
