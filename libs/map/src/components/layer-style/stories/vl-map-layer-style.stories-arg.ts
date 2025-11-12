import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';

export const mapLayerStyleArg = {
    ...defaultArgs,
    borderColor: 'rgba(2, 85, 204, 1)',
    borderSize: 1,
    color: 'rgba(2, 85, 204, 0.8)',
    invalid: false,
    name: '',
    textBackgroundColor: 'rgba(0, 0, 0, 0)',
    textBorderColor: 'rgba(255, 255, 255, 0)',
    textBorderSize: 1,
    textColor: '#FFF',
    textFeatureAttributeName: '',
    textOffsetX: 0,
    textOffsetY: 0,
    textSize: '10px',
};

export const mapLayerStyleArgTypes: ArgTypes<typeof mapLayerStyleArg> = {
    ...defaultArgTypes(),
    borderColor: {
        name: 'data-vl-border-color',
        description: 'De kleur van de rand van de kaartlaagstijl.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.borderColor },
        },
    },
    borderSize: {
        name: 'data-vl-border-size',
        description: 'De grootte van de rand van de kaartlaagstijl.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.borderSize },
        },
    },
    color: {
        name: 'data-vl-color',
        description: 'De kleur van de kaartlaagstijl.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.color },
        },
    },
    invalid: {
        name: 'invalid',
        description:
            'Geeft aan of de "invalid" stijl toegepast moet worden. Je kan dit gebruiken om de kaartlaag manueel als "invalid" te renderen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(mapLayerStyleArg.invalid) },
        },
    },
    name: {
        name: 'data-vl-name',
        description:
            'De naam van de stijl, deze naam wordt getoond als tekst in de legende als de map-legend op de kaart is toegevoegd. Een stijl zonder data-vl-name attribuut zal nooit in de legende getoond worden. Tenzij het om een enkele stijl in een features-layer of wfs-layer gaat, in dat geval wordt de data-vl-name van de layer in de legende getoond.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    textBackgroundColor: {
        name: 'data-vl-text-background-color',
        description: 'De kleur van de achtergrond van de tekst.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.textBackgroundColor },
        },
    },
    textBorderColor: {
        name: 'data-vl-text-border-color',
        description: 'De kleur van de rand van de tekst.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.textBorderColor },
        },
    },
    textBorderSize: {
        name: 'data-vl-text-border-size',
        description: 'De grootte van de rand van de tekst.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.textBorderSize },
        },
    },
    textColor: {
        name: 'data-vl-text-color',
        description: 'De kleur van de tekst.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.textColor },
        },
    },
    textFeatureAttributeName: {
        name: 'data-vl-text-feature-attribute-name',
        description: 'De key van de property van de feature die de tekst bepaalt.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    textOffsetX: {
        name: 'data-vl-text-offset-x',
        description: 'De offset op de x-as van de tekst.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.textOffsetX },
        },
    },
    textOffsetY: {
        name: 'data-vl-text-offset-y',
        description: 'De offset op de y-as van de tekst.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.textOffsetY },
        },
    },
    textSize: {
        name: 'data-vl-text-size',
        description:
            'De grootte van de tekst in CSS font-size eenheden (medium|xx-small|x-small|small|large|x-large|xx-large|smaller|larger|length|initial|inherit).',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapLayerStyleArg.textSize },
        },
    },
};
