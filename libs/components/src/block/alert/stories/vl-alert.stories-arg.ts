import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    logStorybookEvent,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { ALERT_ICON, ALERT_SIZE, ALERT_TYPE, VlAlertClosedEvent } from '../vl-alert.model';

export const alertArgs = {
    ...defaultArgs,
    closable: false,
    naked: false,
    multiline: false,
    title: '',
    icon: '',
    size: '',
    type: '',
    message: '',
    defaultSlot: '',
    titleSlot: '',
    actionsSlot: '',
    alertClosed: logStorybookEvent(VlAlertClosedEvent.eventType),
};

export const alertArgTypes: ArgTypes<typeof alertArgs> = {
    ...defaultArgTypes,
    closable: {
        name: 'closable',
        description: 'Sluitknop voor de waarschuwing',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(alertArgs.closable) },
        },
    },
    naked: {
        name: 'naked',
        description: 'Naked variant van de waarschuwing.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(alertArgs.naked) },
        },
    },
    multiline: {
        name: 'multiline',
        description: 'Behoudt nieuwe regels in de boodschap van de waarschuwing.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(alertArgs.multiline) },
        },
    },
    title: {
        name: 'title',
        description:
            'Titel van de waarschuwing.<br>Bij de naked variant mag de titel alleen met dit attribuut meegegeven worden.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: alertArgs.title },
        },
    },
    icon: {
        name: 'icon',
        description:
            'Icon van de waarschuwing.<br>Het icoon kan gekozen worden uit de lijst op https://overheid.vlaanderen.be/webuniversum/v3/documentation/atoms/vl-ui-icon.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(ALERT_ICON),
        table: {
            type: { summary: getSelectControlOptions(Object.values(ALERT_ICON)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: alertArgs.icon },
        },
    },
    message: {
        name: 'message',
        description:
            'De message van de waarschuwing.<br>Bij de naked variant mag de message alleen met dit attribuut ' +
            'meegegeven worden.<br>Werkt niet in combinatie met het default slot.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: alertArgs.message },
        },
    },
    size: {
        name: 'size',
        description: 'Kleine variant van de waarschuwing.',
        control: { type: CONTROLS.SELECT },
        options: [ALERT_SIZE.SMALL],
        table: {
            type: { summary: `${ALERT_SIZE.SMALL}` },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: alertArgs.size },
        },
    },
    type: {
        name: 'type',
        description: 'Soort van de waarschuwing, foutmelding, probleemmelding of succesmelding.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(ALERT_TYPE),
        table: {
            type: {
                summary: getSelectControlOptions(Object.values(ALERT_TYPE)),
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: alertArgs.type },
        },
    },
    titleSlot: {
        name: 'title',
        description: 'Element dat als titel van het alert getoond wordt.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: alertArgs.titleSlot },
        },
    },
    actionsSlot: {
        name: 'actions',
        description: 'Slot voor actieknoppen',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: alertArgs.actionsSlot },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'Element dat als message van het alert getoond wordt.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: alertArgs.defaultSlot },
        },
    },
    alertClosed: {
        name: VlAlertClosedEvent.eventType,
        description: 'Afgevuurd wanneer de alert wordt gesloten.',
        table: {
            type: { summary: '-' },
            category: CATEGORIES.EVENTS,
        },
    },
};
