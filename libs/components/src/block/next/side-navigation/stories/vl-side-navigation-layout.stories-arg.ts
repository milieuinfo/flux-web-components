import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { sideNavigationLayoutDefaults } from '../vl-side-navigation-layout.defaults';

export type SideNavigationLayoutArgs = typeof sideNavigationLayoutDefaults &
    typeof defaultArgs & {
        contentSlot: string;
        navigationSlot: string;
    };

export const sideNavigationLayoutArgs: SideNavigationLayoutArgs = {
    ...defaultArgs,
    ...sideNavigationLayoutDefaults,
    contentSlot: '',
    navigationSlot: '',
};

export const sideNavigationLayoutArgTypes: ArgTypes<SideNavigationLayoutArgs> = {
    ...defaultArgTypes,
    compact: {
        name: 'compact',
        description:
            'Forceert de compacte weergave (toggle knop, verborgen navigatie standaard) ongeacht de viewport grootte.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideNavigationLayoutArgs.compact) },
        },
    },
    headingRootSelector: {
        name: 'heading-root-selector',
        description:
            'CSS selector om het root container element te vinden waarbinnen naar headings gezocht wordt. ' +
            'Indien niet opgegeven, wordt het volledige document/shadow root doorzocht. ' +
            'Voorbeeld: "#section-1" om enkel headings binnen die sectie te scannen.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationLayoutArgs.headingRootSelector },
        },
    },
    contentBlock: {
        name: 'content-block',
        description: 'Past de vl-content-block class toe op de layout container voor correcte spacing.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideNavigationLayoutArgs.contentBlock) },
        },
    },
    maxDepth: {
        name: 'max-depth',
        description:
            'Optionele maximum diepte voor shadow DOM traversal (bij scannen van headings én bij zoeken van ' +
            'scroll-target). Biedt fijnmazige controle over performantie vs compatibiliteit. ' +
            '0 = enkel light DOM, 1 = light DOM + eerste niveau shadow DOM, undefined = onbeperkt (standaard).',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: {
                summary:
                    sideNavigationLayoutArgs.maxDepth !== undefined
                        ? String(sideNavigationLayoutArgs.maxDepth)
                        : 'undefined',
            },
        },
    },
    navigationTitle: {
        name: 'navigation-title',
        description:
            'Tekst die getoond wordt als titel boven de inhoudstafel in de side navigation. Wordt doorgegeven aan' +
            ' vl-side-navigation-next.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationLayoutArgs.navigationTitle },
        },
    },
    excludeSelectors: {
        name: 'exclude-selectors',
        description:
            'Comma-separated CSS selectors van elementen om uit te sluiten tijdens het scannen van headings. ' +
            'Wordt doorgegeven aan vl-side-navigation-next. ' +
            'Voorbeeld: "iframe, table.large-data, .skip-headings".',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationLayoutArgs.excludeSelectors },
        },
    },
    childSpacing: {
        name: 'child-spacing',
        description:
            'Bepaalt de verticale ruimte tussen child-links. `medium` geeft extra ruimte (1.3rem marge boven en onder). `small` is de standaard compacte weergave. Wordt doorgegeven aan vl-side-navigation-next.',
        options: ['medium', 'small'],
        control: { type: 'select' },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationLayoutArgs.childSpacing },
        },
    },
    multiActive: {
        name: 'multi-active',
        description:
            'Wanneer aanwezig worden alle items waarvan content zichtbaar is als actief gemarkeerd, in plaats van ' +
            'enkel het bovenste. De actieve items worden aangeduid met een doorlopende lijn uiterst links. Zonder ' +
            'dit attribuut kan het zijn dat de onderste items onderaan nooit aangeduid worden. Wordt doorgegeven aan ' +
            'vl-side-navigation-next.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideNavigationLayoutArgs.multiActive) },
        },
    },
    contentSlot: {
        name: 'content',
        description:
            'De hoofdinhoud van de pagina. Plaats hier het element (bijv. een div) met de secties en headings waarop' +
            ' de inhoudsopgave gebaseerd wordt. Moet een element zijn dat overeenkomt met heading-root-selector of een' +
            ' kind daarvan bevat.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: String(sideNavigationLayoutArgs.contentSlot) },
        },
    },
    navigationSlot: {
        name: 'navigation',
        description:
            'Optioneel. Custom navigatie-component. Dit slot verwacht de ' +
            '[vl-side-navigation-next](/docs/components-next-side-navigation-side-navigation--documentatie). Indien ' +
            'niet gezet, wordt automatisch een `vl-side-navigation-next` gegenereerd op basis van de headings in de' +
            ' content slot.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: String(sideNavigationLayoutArgs.navigationSlot) },
        },
    },
};
