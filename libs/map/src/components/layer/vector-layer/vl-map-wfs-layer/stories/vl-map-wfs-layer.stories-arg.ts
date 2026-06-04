import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { mapLayerArgs, mapLayerArgTypes } from '../../../stories/vl-map-layer.stories-arg';
import { ArgTypes } from '@storybook/web-components-vite';

export const mapWfsLayerArgs = {
    ...mapLayerArgs,
    cqlFilter: '',
    geometryName: '',
    layers: '',
    projectionCode: '',
    url: '',
};

export const mapWfsLayerArgTypes: ArgTypes<typeof mapWfsLayerArgs> = {
    ...mapLayerArgTypes,
    cqlFilter: {
        name: 'cql-filter',
        description:
            'Een CQL-expressie waarmee de features van de WFS-laag server-side gefilterd worden. De waarde wordt als' +
            ' <code>cql_filter</code> query parameter naar de server gestuurd, gecombineerd met een' +
            ' <code>BBOX</code>-clausule op de geometry-property:' +
            ' <code>cql_filter=BBOX(geometry,extent) AND (filter)</code> in plaats van een <code>bbox</code> parameter.' +
            ' <br><strong>Let op:</strong> <code>cql_filter</code> is een GeoServer-specifieke extensie en wordt niet' +
            ' door elke WFS-implementatie ondersteund.<br>Dit attribuut is reactief.',
        type: { name: TYPES.STRING, required: false },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWfsLayerArgs.cqlFilter },
        },
    },
    geometryName: {
        name: 'geometry-name',
        description:
            'De naam van de geometry-property die in de CQL <code>BBOX(...)</code>-clausule gebruikt wordt. Enkel' +
            ' relevant samen met <code>cql-filter</code>. Indien niet meegegeven wordt de geometry-property' +
            ' best-effort gedetecteerd via een <code>DescribeFeatureType</code> call; geef dit attribuut expliciet mee' +
            ' wanneer die auto-detectie faalt.<br>Dit attribuut is niet reactief.',
        type: { name: TYPES.STRING, required: false },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWfsLayerArgs.geometryName },
        },
    },
    layers: {
        name: 'layers',
        description: 'De layers van de WFS.<br>Dit attribuut is niet reactief.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWfsLayerArgs.layers },
        },
    },
    projectionCode: {
        name: 'projection-code',
        description: 'Indien je Lambert 72 coördinaten gebruikt op een Lambert 2008 kaart, moet je de projectie' +
            ' code EPSG:31370 meegeven als projection-code. Geef je dit niet mee, dan zal de kaartlaag de projectie' +
            ' code van de kaart overnemen.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWfsLayerArgs.projectionCode },
        },
    },
    url: {
        name: 'url',
        description: 'De WFS url.<br>Dit attribuut is niet reactief.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapWfsLayerArgs.url },
        },
    },
};
