import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { tabsDefaults } from '../vl-tabs.defaults';

export type TabsArgs = typeof tabsDefaults &
    typeof defaultArgs & {
        onVlTabClick: () => void;
        onVlTabLinkClick: () => void;
    };

export const tabsArgs: TabsArgs = {
    ...defaultArgs,
    ...tabsDefaults,
    onVlTabClick: action('vl-tab-click'),
    onVlTabLinkClick: action('vl-tab-link-click'),
};

export const tabsArgTypes: ArgTypes<TabsArgs> = {
    ...defaultArgTypes,
    defaultSlot: {
        name: 'default slot',
        description: 'Gebruik dit slot voor de tab links.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: String(tabsArgs.defaultSlot) },
        },
    },
    panelSlot: {
        name: 'panel slot',
        description: 'Gebruik dit slot voor de tab panels.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: String(tabsArgs.panelSlot) },
        },
    },
    label: {
        name: 'label',
        description: 'Toegankelijke naam van de tab navigatie of widget.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabsArgs.label) },
        },
    },
    horizontalNavigation: {
        name: 'horizontal-navigation',
        description:
            'Gebruik dit attribuut om enkel een horizontale tabbed-stijl navigatie te renderen.' +
            ' Er zullen geen ARIA tablist attributen toegepast worden.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabsArgs.horizontalNavigation) },
        },
    },
    noBorder: {
        name: 'no-border',
        description: 'Verbergt de onderste rand van de tab navigatie.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(tabsArgs.noBorder) },
        },
    },
    onVlTabClick: {
        name: 'vl-tab-click',
        description: 'Event dat afgevuurd wordt wanneer een tab wordt aangeklikt.',
        table: {
            type: { summary: '{ tab: VlTabComponent }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlTabLinkClick: {
        name: 'vl-tab-link-click',
        description: 'Event dat afgevuurd wordt wanneer een tab link wordt aangeklikt.',
        table: {
            type: { summary: '{ tab: VlTabLinkComponent }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
