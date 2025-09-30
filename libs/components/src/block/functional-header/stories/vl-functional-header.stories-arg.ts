import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
// de import is bewust op deze manier om voor de web-types.generator 'binnen' de monorepo geen side-effect te geven
import { MARGINS } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';

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
    ...defaultArgTypes,
    back: {
        name: 'back',
        description: 'Tekst van de terug-link.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.back },
        },
    },
    backLink: {
        name: 'back-link',
        description: 'URL van de terug-link.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.backLink },
        },
    },
    disableBackLink: {
        name: 'disable-back-link',
        description: `Schakelt de terug-link uit. Dit zorgt ervoor dat de terug-link gerenderd wordt als button
        in plaats van als link.<br/> 
        **Let op**: indien je dit attribuut gebruikt, moet je zelf het event \`vl-click-back\` afhandelen.
        Het \`back-link\` attribuut wordt genegeerd indien dit attribuut gebruikt wordt.`,
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(functionalHeaderArgs.disableBackLink) },
        },
    },
    fullWidth: {
        name: 'full-width',
        description: 'Gebruik de volledige breedte van het scherm.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(functionalHeaderArgs.fullWidth) },
        },
    },
    hideBackLink: {
        name: 'hide-back-link',
        description: 'Verbergt de terug link.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(functionalHeaderArgs.hideBackLink) },
        },
    },
    hideSubHeader: {
        name: 'hide-sub-header',
        description: 'Verbergt de sub header.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(functionalHeaderArgs.hideSubHeader) },
        },
    },
    link: {
        name: 'link',
        description: 'URL van de titel-link.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.link },
        },
    },
    marginBottom: {
        name: 'margin-bottom',
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
        name: 'sub-title',
        description: 'Tekst van de subtitel.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: functionalHeaderArgs.subTitle },
        },
    },
    title: {
        name: 'title',
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
            'Wordt afgebeeld ipv de tekst van de terug-link.<br>Kan niet in combinatie gebruikt worden met:<br>• back attribuut<br>• back-link slot<br>• sub-header slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    backLinkSlot: {
        name: 'back-link',
        description:
            'Wordt afgebeeld ipv de terug-link.<br>Kan niet in combinatie gebruikt worden met:<br>• back attribuut<br>• back-link attribuut<br>• disable-back-link attribuutt<br>• back slot<br>• sub-header slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    subHeaderSlot: {
        name: 'sub-header',
        description:
            'Wordt afgebeeld onder de horizontale lijn.<br>Kan niet in combinatie gebruikt worden met:<br>• back attribuut<br>• back-link attribuut<br>• disable-back-link attribuut<br>• sub-title attribuut<br>• back slot<br>• back-link slot<br>• sub-title slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    subTitleSlot: {
        name: 'sub-title',
        description:
            'Wordt afgebeeld ipv de tekst van de subtitel.<br>Kan niet in combinatie gebruikt worden met:<br>• sub-title<br>• sub-header slot',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    titleSlot: {
        name: 'title',
        description:
            'Wordt afgebeeld ipv de tekst van de titel.<br>Kan niet in combinatie gebruikt worden met:<br>• title',
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
