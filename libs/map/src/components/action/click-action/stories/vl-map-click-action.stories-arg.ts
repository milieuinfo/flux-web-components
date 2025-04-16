import { CATEGORIES, defaultArgs, defaultArgTypes, logStorybookEvent } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const mapClickActionArg = {
    ...defaultArgs,
    onMapClicked: logStorybookEvent('vl-map-clicked'),
};

export const mapClickActionArgTypes: ArgTypes<typeof mapClickActionArg> = {
    ...defaultArgTypes(),
    onMapClicked: {
        name: 'vl-map-clicked',
        description:
            'Afgevuurd wanneer er op de map geklikt wordt.<br>Het event bevat de locatie informatie, zie de console logs van Storybook voor het volledige event.',
        table: {
            type: { summary: '{ coordinate: Coordinate, resolution: number, projection: ProjectionLike }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
