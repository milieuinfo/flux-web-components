import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { infotextDefaults } from '../vl-infotext.defaults';

export type InfotextArgs = typeof defaultArgs & typeof infotextDefaults & { valueSlot: string; textSlot: string };

export const infotextArgs: InfotextArgs = {
    ...defaultArgs,
    ...infotextDefaults,
    valueSlot: '',
    textSlot: '',
};

export const infotextArgTypes: ArgTypes<InfotextArgs> = {
    ...defaultArgTypes(true),
    badge: {
        name: 'badge',
        description: 'Beeldt de infotext af in een badge.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: infotextArgs.badge },
        },
    },
    href: {
        name: 'href',
        description: 'De url waar de infotext naar verwijst.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: infotextArgs.href },
        },
    },
    external: {
        name: 'external',
        description: 'Opent de link in een nieuw tabblad.<br/>Te gebruiken in combinatie met het href attribuut.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: infotextArgs.external },
        },
    },
    valueSlot: {
        name: 'value',
        description:
            'De waarde van de infotext.<br/>De font-size wordt automatisch aangepast naargelang de lengte van de value.<br/>Indien er een nummer meegegeven wordt zal de value automatisch geformatteerd worden.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infotextArgs.valueSlot },
        },
    },
    textSlot: {
        name: 'text',
        description: 'De tekst van de infotext.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: infotextArgs.textSlot },
        },
    },
};
