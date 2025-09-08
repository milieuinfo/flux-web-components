import { debounce, webComponent } from '@domg-wc/common';
import { VlSelectRichComponent } from '@domg-wc/components/form';
import { Choice } from 'choices.js';
import LambertCoordinaat from '../../utils/lambert-coordinaat';
import { placeholder, searchPlaceholder } from './vl-select-location.defaults';
import { Coords, isCoord, isLocation, LocationData, SuggestionData } from './vl-select-location.model';

@webComponent('vl-select-location')
export class VlSelectLocationComponent extends VlSelectRichComponent {
    private url = 'https://geo.api.vlaanderen.be/geolocation';
    private searchUrl = `${this.url}/Suggestion?q=`;
    private locationUrl = `${this.url}/Location?q=`;
    private locationXyUrl = `${this.url}/Location?c=5&xy=`;

    constructor() {
        super();

        this.placeholder = placeholder;
        this.search = true;
        this.searchPlaceholder = searchPlaceholder;
    }

    /**
     * Geeft de bounding box op basis van de geselecteerde locatie.
     *
     * @return {Promise}
     */
    public get location(): Promise<number[]> | undefined {
        if (!this.choices) return undefined;

        const value = this.choices.getValue(true);
        if (!value) return undefined;

        if (isLocation(value)) {
            return Promise.resolve(
                this.isLambert2008
                    ? [
                          value.BoundingBox.LowerLeft.X_Lambert2008,
                          value.BoundingBox.LowerLeft.Y_Lambert2008,
                          value.BoundingBox.UpperRight.X_Lambert2008,
                          value.BoundingBox.UpperRight.Y_Lambert2008,
                      ]
                    : [
                          value.BoundingBox.LowerLeft.X_Lambert72,
                          value.BoundingBox.LowerLeft.Y_Lambert72,
                          value.BoundingBox.UpperRight.X_Lambert72,
                          value.BoundingBox.UpperRight.Y_Lambert72,
                      ]
            );
        } else if (isCoord(value) && LambertCoordinaat.isLambertCoordinaat(value)) {
            return Promise.resolve([value.x - 1, value.y - 1, value.x + 1, value.y + 1]);
        } else if (typeof value === 'string') {
            return fetch(this.locationUrl + encodeURIComponent(value))
                .then((response) => response.json() as Promise<LocationData>)
                .then(({ LocationResult }) =>
                    this.isLambert2008
                        ? [
                              LocationResult[0].BoundingBox.LowerLeft.X_Lambert2008,
                              LocationResult[0].BoundingBox.LowerLeft.Y_Lambert2008,
                              LocationResult[0].BoundingBox.UpperRight.X_Lambert2008,
                              LocationResult[0].BoundingBox.UpperRight.Y_Lambert2008,
                          ]
                        : [
                              LocationResult[0].BoundingBox.LowerLeft.X_Lambert72,
                              LocationResult[0].BoundingBox.LowerLeft.Y_Lambert72,
                              LocationResult[0].BoundingBox.UpperRight.X_Lambert72,
                              LocationResult[0].BoundingBox.UpperRight.Y_Lambert72,
                          ]
                );
        }

        return undefined;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener('vl-select-search', this.debouncedOnSearch);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.removeEventListener('vl-select-search', this.debouncedOnSearch);
    }

    private onSearch = (event: CustomEvent<{ value?: string }>[]) => {
        if (event[0]?.detail?.value) {
            const { value } = event[0].detail;
            const lambertCoordinaat = LambertCoordinaat.of(value);

            if (LambertCoordinaat.isLambertCoordinaat(lambertCoordinaat)) {
                this.searchChoicesByLambertCoordinaat(lambertCoordinaat);
            } else {
                this.searchChoicesByValue(value);
            }
        }
    };

    private debouncedOnSearch = debounce(this.onSearch, 300);

    private setChoices = (values: Choice[]) => this.choices?.setChoices(values, 'value', 'label', true);

    private searchChoicesByLambertCoordinaat = (lambertCoordinaat: Coords) =>
        fetch(`${this.locationXyUrl + lambertCoordinaat.x},${lambertCoordinaat.y}`)
            .then((response) => response.json())
            .then((data) =>
                this.setChoices(
                    [this.mapLambertCoordinaatToChoice(lambertCoordinaat)].concat(
                        this.mapLocationResultToChoices(data, lambertCoordinaat)
                    )
                )
            );

    private mapLambertCoordinaatToChoice = (lambertCoordinaat: Coords): Choice => ({
        value: lambertCoordinaat,
        label: `Lambert-coördinaat: ${lambertCoordinaat.toString()}`,
    });

    private mapLocationResultToChoices = (data: LocationData, lambertCoordinaat: Coords) =>
        data?.LocationResult?.map((locationResult) => ({
            value: lambertCoordinaat,
            label: locationResult.FormattedAddress,
        })) || [];

    private searchChoicesByValue = (searchValue: string) =>
        fetch(this.searchUrl + encodeURIComponent(searchValue))
            .then((response) => response.json())
            .then((data) => this.setChoices(this.mapSuggestionResultToChoices(data)));

    private mapSuggestionResultToChoices = (data: SuggestionData): Choice[] =>
        data?.SuggestionResult?.map((result: string) => ({
            value: result,
            label: result,
        })) || [];

    /**
     * Voorlopig is dit een opt-in attribuut. In de toekomst wordt Lambert 2008 de default.
     */
    private get isLambert2008(): boolean {
        return this.hasAttribute('lambert2008');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-select-location': VlSelectLocationComponent;
    }
}
