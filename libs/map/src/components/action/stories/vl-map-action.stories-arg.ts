import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const mapActionArgs = {
    ...defaultArgs,
    active: false,
    defaultActive: false,
    layer: '',
};

export const mapActionArgTypes: ArgTypes<typeof mapActionArgs> = {
    ...defaultArgTypes(),
    active: {
        name: 'active',
        description: 'Controleert de actieve status van de actie.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: mapActionArgs.active },
        },
    },
    defaultActive: {
        name: 'data-vl-default-active',
        description: 'Zet de actie default op actief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapActionArgs.active },
        },
    },
    layer: {
        name: 'data-vl-layer',
        description:
            'Linkt de actie aan een kaartlaag.<br>Geef hier het data-vl-name attribuut van de kaartlaag mee.<br>Wordt gebruikt als de actie niet binnen een kaartlaag element staat.',
        control: { disable: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
};
