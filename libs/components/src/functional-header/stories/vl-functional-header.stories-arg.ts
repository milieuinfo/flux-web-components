import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { MARGINS } from '@domg-wc/common/constants';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';

export const functionalHeaderArgs = {
    ...defaultArgs,
    back: 'Terug',
    backLink: 'document.referrer',
    disableBackLink: false,
    fullWidth: false,
    hideBackLink: false,
    hideSubHeader: false,
    link: '',
    marginBottom: 'large',
    subTitle: '',
    title: '',
    actionsSlot: '',
    backSlot: '',
    backLinkSlot: '',
    subHeaderSlot: '',
    subTitleSlot: '',
    titleSlot: '',
    topLeftSlot: '',
    topRightSlot: '',
    onClickBack: action('vl-click-back'),
};

export const functionalHeaderArgTypes: ArgTypes<typeof functionalHeaderArgs> = {
    ...defaultArgTypes(),
    back: {
        name: 'data-vl-back',
        description: 'Tekst van de terug-link.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.back },
        },
    },
    backLink: {
        name: 'data-vl-back-link',
        description: 'URL van de terug-link.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.backLink },
        },
    },
    disableBackLink: {
        name: 'data-vl-disable-back-link',
        description: 'Zet de terug-link uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.disableBackLink },
        },
    },
    fullWidth: {
        name: 'data-vl-full-width',
        description: 'Gebruik de volledige breedte van het scherm.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.fullWidth },
        },
    },
    hideBackLink: {
        name: 'data-vl-hide-back-link',
        description: 'Verbergt de terug link.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.hideBackLink },
        },
    },
    hideSubHeader: {
        name: 'data-vl-hide-sub-header',
        description: 'Verbergt de sub header.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.hideSubHeader },
        },
    },
    link: {
        name: 'data-vl-link',
        description: 'URL van de titel-link.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.link },
        },
    },
    marginBottom: {
        name: 'data-vl-margin-bottom',
        description: 'De grootte van de margin onder de functional header.',
        control: { type: CONTROLS.SELECT },
        options: [...Object.keys(MARGINS)],
        table: {
            type: { summary: getSelectControlOptions(Object.keys(MARGINS)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.marginBottom },
        },
    },
    subTitle: {
        name: 'data-vl-sub-title',
        description: 'Tekst van de subtitel.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.subTitle },
        },
    },
    title: {
        name: 'data-vl-title',
        description: 'Tekst van de titel.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.title },
        },
    },
    actionsSlot: {
        name: 'actions',
        description: 'Acties die worden afgebeeld in de rechterbovenhoek.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    backSlot: {
        name: 'back',
        description:
            'Wordt afgebeeld ipv de tekst van de terug-link.<br>Kan niet in combinatie gebruikt worden met:<br>• data-vl-back attribuut<br>• back-link slot<br>• sub-header slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    backLinkSlot: {
        name: 'back-link',
        description:
            'Wordt afgebeeld ipv de terug-link.<br>Kan niet in combinatie gebruikt worden met:<br>• data-vl-back attribuut<br>• data-vl-back-link attribuut<br>• data-vl-disable-back-link attribuutt<br>• back slot<br>• sub-header slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    subHeaderSlot: {
        name: 'sub-header',
        description:
            'Wordt afgebeeld onder de horizontale lijn.<br>Kan niet in combinatie gebruikt worden met:<br>• data-vl-back attribuut<br>• data-vl-back-link attribuut<br>• data-vl-disable-back-link attribuut<br>• data-vl-sub-title attribuut<br>• back slot<br>• back-link slot<br>• sub-title slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    subTitleSlot: {
        name: 'sub-title',
        description:
            'Wordt afgebeeld ipv de tekst van de subtitel.<br>Kan niet in combinatie gebruikt worden met:<br>• data-vl-sub-title<br>• sub-header slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    titleSlot: {
        name: 'title',
        description:
            'Wordt afgebeeld ipv de tekst van de titel.<br>Kan niet in combinatie gebruikt worden met:<br>• data-vl-title',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    topLeftSlot: {
        name: 'top-left',
        description:
            'Wordt afgebeeld in de linkerbovenhoek.<br>Kan niet in combinatie gebruikt worden met:<br>• actions slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    topRightSlot: {
        name: 'top-right',
        description:
            'Wordt afgebeeld in de rechterbovenhoek.<br>Kan niet in combinatie gebruikt worden met:<br>• actions slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
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
};
