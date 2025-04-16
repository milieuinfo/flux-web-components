import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { mapActionArgs, mapActionArgTypes } from '../../stories/vl-map-action.stories-arg';
import { ArgTypes } from '@storybook/web-components';

export const mapDrawActionArgs = {
    ...mapActionArgs,
    snapping: false,
    snappingPixelTolerance: 10,
};

export const mapDrawActionArgTypes: ArgTypes<typeof mapDrawActionArgs> = {
    ...mapActionArgTypes,
    snapping: {
        name: 'data-vl-snapping',
        description:
            'Geeft aan dat er bij het tekenen snapping mag gebeuren, hetzij op de laag waarop getekend wordt (indien geen vl-map-wfs-layer(s) als child elementen), hetzij op de meegegeven vl-map-wfs-layers.<br>Dit attribuut is niet reactief.',
        control: false,
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionArgs.snapping },
        },
    },
    snappingPixelTolerance: {
        name: 'data-vl-snapping-pixel-tolerance',
        description:
            'Binnen de hoeveel pixel van een feature er gesnapt mag worden.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapDrawActionArgs.snappingPixelTolerance },
        },
    },
};
