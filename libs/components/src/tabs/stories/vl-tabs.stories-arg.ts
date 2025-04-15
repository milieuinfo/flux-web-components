import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@domg-wc/common-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { DISPLAY_STYLE } from '../vl-tabs.model';

export const tabsArgs = {
    ...defaultArgs,
    activeTab: '',
    alt: false,
    disableLinks: false,
    responsiveLabel: '',
    displayStyle: 'default',
    onChangeActiveTab: action('change'),
    onClickActiveTab: action('vl-click'),
};

export const tabsArgTypes: ArgTypes<typeof tabsArgs> = {
    ...defaultArgTypes(),
    activeTab: {
        name: 'active-tab',
        description: 'Het id van de actieve tab. De tab in kwestie wordt geselecteerd bij het aanpassen van dit id.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabsArgs.activeTab },
        },
    },
    alt: {
        name: 'alt',
        description:
            'Toont de alt variant van de tabs. Deze variant dient gebruikt te worden als subnavigatie onder de functional header.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabsArgs.alt },
        },
    },
    disableLinks: {
        name: 'disable-links',
        description:
            'Zet de automatische url manipulaties uit.<br>Dit attribuut wordt enkel bij de initiële render van een tab gebruikt en werkt niet dynamisch.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabsArgs.disableLinks },
        },
    },
    responsiveLabel: {
        name: 'responsive-label',
        description:
            'Wordt afgebeeld op mobile wanneer de tabs samengevoegd worden tot een uitklapbaar menu. Wordt enkel afgebeeld wanneer er geen tab geselecteerd is.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabsArgs.responsiveLabel },
        },
    },
    displayStyle: {
        name: 'display-style',
        description:
            'Geeft aan op welke manier de tabs getoond worden.<br>Standaard gedrag (`default`) is responsief; bij een breedte groter dan 768px is stijl de `tabs` stijl, anders is het de `collapsed` stijl.<br>Je kan ook expliciet de `tabs` of `collapsed` stijl kiezen die respectievelijk altijd de tabs of altijd de collapsed stijl toont.',
        control: CONTROLS.SELECT,
        options: Object.values(DISPLAY_STYLE),
        table: {
            type: { summary: getSelectControlOptions(Object.values(DISPLAY_STYLE)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: tabsArgs.displayStyle },
        },
    },
    onChangeActiveTab: {
        name: 'change',
        description: 'Afgevuurd na het klikken op een niet actieve tab. Het event bevat het id van de tab.',
        table: {
            type: { summary: '{ activeTab: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onClickActiveTab: {
        name: 'vl-click',
        description: 'Afgevuurd na het klikken op een tab. Het event bevat het id van de tab.',
        table: {
            type: { summary: '{ activeTab: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
