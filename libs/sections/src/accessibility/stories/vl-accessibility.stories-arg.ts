import { COMPLIANCE_STATUS, EVALUATION_STATUS } from '../vl-accessibility.model';
import { CATEGORIES, CONTROLS, getSelectControlOptions, TYPES } from '@resources/utils-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';

export const accessibilityArgs = {
    application: 'deze applicatie',
    compliance: `${COMPLIANCE_STATUS.PARTIALLY_COMPLIANT}`,
    date: '20 juli 2021',
    dateModified: '20 juli 2021',
    disableBackLink: false,
    hideBackLink: false,
    evaluation: `${EVALUATION_STATUS.NOT_EVALUATED}`,
    version: '1.0.0',
    limitations: null as unknown as object,
    onClickBack: action('vl-click-back'),
    headerSlot: '',
};

export const accessibilityArgTypes: ArgTypes<typeof accessibilityArgs> = {
    application: {
        name: 'data-vl-application',
        description: 'De applicatie waar de verklaring over gaat.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accessibilityArgs.application },
        },
    },
    compliance: {
        name: 'data-vl-compliance',
        description: 'De nalevingsstatus van de verklaring.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(COMPLIANCE_STATUS),
        table: {
            type: getSelectControlOptions(Object.values(COMPLIANCE_STATUS)),
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accessibilityArgs.compliance },
        },
    },
    date: {
        name: 'data-vl-date',
        description: 'De aanmaakdatum van de verklaring.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accessibilityArgs.date },
        },
    },
    dateModified: {
        name: 'data-vl-date-modified',
        description: 'De datum van de laatste wijziging van de verklaring.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accessibilityArgs.dateModified },
        },
    },
    disableBackLink: {
        name: 'data-vl-disable-back-link',
        description: 'Zet de terug-link uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accessibilityArgs.disableBackLink },
        },
    },
    hideBackLink: {
        name: 'data-vl-hide-back-link',
        description: 'Verwijdert de terug-link.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accessibilityArgs.hideBackLink },
        },
    },
    evaluation: {
        name: 'data-vl-evaluation',
        description: 'De evaluatiestatus van de verklaring.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(EVALUATION_STATUS),
        table: {
            type: {
                summary: getSelectControlOptions(Object.values(EVALUATION_STATUS)),
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accessibilityArgs.evaluation },
        },
    },
    version: {
        name: 'data-vl-version',
        description: 'De huidige versie van de verklaring.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: accessibilityArgs.version },
        },
    },
    limitations: {
        name: 'limitations',
        description:
            "Property om limitaties mee te geven aan de verklaring. Het object bevat 3 optionele properties. De `withTiming` limitaties vallen onder 'Niet-naleving van het bestuursdecreet'. Dit zijn tijdelijke limitaties. `withoutTiming` limitaties vallen onder 'Onevenredige last'. Dit zijn permanente limitaties. De `outsideApplicableLaw` limitaties vallen onder 'De inhoud valt buiten de werkingssfeer van de toepasselijke wetgeving'. Dit zijn limitaties die buiten de werkingssfeer van de toepasselijke wetgeving vallen.",
        table: {
            type: { summary: 'object' },
            category: CATEGORIES.PROPERTIES,
        },
    },
    onClickBack: {
        name: 'vl-click-back',
        description: 'Afgevuurd na het klikken op de terug-link.',
        table: {
            type: { summary: '-' },
            category: CATEGORIES.EVENTS,
        },
    },
    headerSlot: {
        name: 'header',
        description: 'Hiermee kan je de standaard functional header vervangen door een header naar keuze.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: accessibilityArgs.headerSlot,
        },
    },
};
