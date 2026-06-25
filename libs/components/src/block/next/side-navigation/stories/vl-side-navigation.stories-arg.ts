import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { sideNavigationDefaults } from '../vl-side-navigation.defaults';

export type SideNavigationArgs = typeof sideNavigationDefaults &
    typeof defaultArgs & {
        defaultSlot: string;
    };

export const sideNavigationArgs: SideNavigationArgs = {
    ...defaultArgs,
    ...sideNavigationDefaults,
    defaultSlot: '',
};

export const sideNavigationArgTypes: ArgTypes<SideNavigationArgs> = {
    ...defaultArgTypes,
    closed: {
        name: 'closed',
        description:
            'Wanneer aanwezig wordt de inhoudstafel standaard verborgen. Heeft enkel effect wanneer het attribuut `compact` is gezet of bij mobiele weergave (viewport < 768px). Op desktop zonder compact wordt de navigatie altijd getoond.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideNavigationArgs.closed) },
        },
    },
    compact: {
        name: 'compact',
        description:
            'Forceert de compacte weergave (toggle knop, verborgen navigatie standaard) ongeacht de viewport grootte.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideNavigationArgs.compact) },
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
            defaultValue: { summary: sideNavigationArgs.headingRootSelector },
        },
    },
    maxDepth: {
        name: 'max-depth',
        description:
            'Optionele maximum diepte voor shadow DOM traversal (bij scannen van headings én bij zoeken ' +
            'van scroll-target). Biedt fijnmazige controle over performantie vs compatibiliteit. ' +
            '0 = enkel light DOM, 1 = light DOM + eerste niveau shadow DOM, undefined = onbeperkt (standaard).',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: {
                summary: sideNavigationArgs.maxDepth !== undefined ? String(sideNavigationArgs.maxDepth) : 'undefined',
            },
        },
    },
    navigationTitle: {
        name: 'navigation-title',
        description: 'Tekst die getoond wordt als titel boven de inhoudstafel.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationArgs.navigationTitle },
        },
    },
    defaultSlot: {
        name: '[default]',
        description:
            'Custom inhoudsopgave. Wanneer je hier content plaatst (bijv. een ul/li-structuur met vl-link elementen met href="#..."), wordt die gebruikt in plaats van de automatisch gegenereerde inhoudsopgave. De links moeten verwijzen naar heading-ids in de content.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: String(sideNavigationArgs.defaultSlot) },
        },
    },
    childSpacing: {
        name: 'child-spacing',
        description:
            'Bepaalt de verticale ruimte tussen child-links. `medium` geeft extra ruimte (1.3rem marge boven en onder), vergelijkbaar met de stijl van de klassieke vl-side-navigation. `small` is de standaard compacte weergave.',
        options: ['medium', 'small'],
        control: { type: 'select' },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationArgs.childSpacing },
        },
    },
    multiActive: {
        name: 'multi-active',
        description:
            'Wanneer aanwezig worden alle items waarvan content zichtbaar is als actief gemarkeerd, in plaats van ' +
            'enkel het bovenste. De actieve items worden aangeduid met een doorlopende lijn uiterst links. Zonder ' +
            'dit attribuut kan het zijn dat de onderste items onderaan nooit aangeduid worden.<br>Dit attribuut is ' +
            'niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(sideNavigationArgs.multiActive) },
        },
    },
};
