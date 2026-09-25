import Choices from 'choices.js';
import type { FilterChoicesAction } from 'choices.js/src/scripts/actions/choices';
import type { ChoiceFull } from 'choices.js/src/scripts/interfaces/choice-full';
import { SelectRichOption, SelectSearchStrategy } from './vl-select-rich.model';

/**
 * Type definitie voor een search matcher functie.
 */
export type SelectRichSearchMatcher = (
    choices: Choices,
    searchValue: string,
    getOption?: (value: string) => SelectRichOption | undefined
) => number | null;

export type SelectRichSearchPredicate = (option: SelectRichOption, searchValue: string) => boolean;

export const defaultSearchFields = ['label', 'value'];

export const labelDescriptionSearchFields = [...defaultSearchFields, 'labelDescription'];

const createFilterMatcher = (getPredicate: (choices: Choices) => SelectRichSearchPredicate): SelectRichSearchMatcher => {
    return (choices: Choices, searchValue: string, getOption?: (value: string) => SelectRichOption | undefined) => {
        const newValue = searchValue.trim().replace(/\s{2,}/g, ' ');

        // Als de zoekterm leeg is of gelijk aan de huidige waarde, stop
        if (!newValue.length || newValue === choices._currentValue) {
            return null;
        }

        // Gebruik ALTIJD alle choices (niet alleen searchableChoices die al gefilterd kunnen zijn)
        // Dit zorgt ervoor dat we altijd op de volledige lijst zoeken, niet incrementeel
        const allChoices = choices._store.choices.filter((choice: ChoiceFull) => !choice.placeholder);

        // Herindexeer de searcher met alle choices bij elke zoekopdracht
        if (choices._searcher.isEmptyIndex()) {
            choices._searcher.index(allChoices);
        }

        const normalizedValue = newValue.toLowerCase();
        const matches = getPredicate(choices);

        const results = allChoices
            .filter((choice: ChoiceFull) => {
                // Check alleen disabled, niet active - want we bepalen zelf wat actief is
                // (choice.active kan nog false zijn van een vorige zoekopdracht)
                if (choice.disabled) {
                    return false;
                }

                const original = getOption?.(String(choice.value));
                return matches(original ? { ...original, ...choice } : choice, normalizedValue);
            })
            .map((choice: ChoiceFull, index: number) => ({
                item: choice,
                score: 0,
                rank: index + 1,
            }));

        // Update de huidige waarde en state
        choices._currentValue = newValue;
        choices._highlightPosition = 0;
        choices._isSearching = true;

        // Toon "geen resultaten" bericht als er geen matches zijn
        if (choices._notice?.type !== 'add-choice') {
            if (!results.length) {
                const { noResultsText } = choices.config;
                choices._displayNotice(
                    typeof noResultsText === 'function' ? noResultsText() : noResultsText,
                    'no-results'
                );
            } else {
                choices._clearNotice();
            }
        }

        // Dispatch de gefilterde resultaten naar de store
        const filterAction: FilterChoicesAction = {
            type: 'FILTER_CHOICES',
            results,
        };
        choices._store.dispatch(filterAction);

        return results.length;
    };
};

export const createSearchMatcher = (predicate: SelectRichSearchPredicate): SelectRichSearchMatcher =>
    createFilterMatcher(() => predicate);

const createExactMatcher = (
    matchLogic: (searchWords: string[], searchText: string) => boolean
): SelectRichSearchMatcher =>
    createFilterMatcher((choices) => {
        const searchFields = choices.config?.searchFields ?? defaultSearchFields;
        return (option, searchValue) => {
            const fields: Record<string, unknown> = option;
            const searchText = searchFields.map((field) => String(fields[field] ?? '').toLowerCase()).join(' ');
            return matchLogic(searchValue.split(/\s+/), searchText);
        };
    });

/**
 * Exacte AND-search matcher: alle zoekwoorden moeten exact voorkomen (substring match).
 * Bij meerdere woorden moeten ALLE woorden voorkomen in de doorzochte velden (AND-logica).
 * Geen fuzzy matching - alleen exacte substring matches.
 */
export const exactAndMatcher: SelectRichSearchMatcher = createExactMatcher(
    (searchWords, searchText) => searchWords.every((word) => searchText.includes(word))
);

/**
 * Exacte OR-search matcher: minstens één zoekwoord moet exact voorkomen (substring match).
 * Bij meerdere woorden moet MINSTENS ÉÉN woord voorkomen in de doorzochte velden (OR-logica).
 * Geen fuzzy matching - alleen exacte substring matches.
 */
export const exactOrMatcher: SelectRichSearchMatcher = createExactMatcher(
    (searchWords, searchText) => searchWords.some((word) => searchText.includes(word))
);

/**
 * Map van strategy types naar matcher functies.
 * Voor 'default' wordt geen matcher gebruikt - het native Choices.js gedrag wordt behouden.
 */
const searchMatcherMap: Record<string, SelectRichSearchMatcher> = {
    [SelectSearchStrategy.EXACT_AND]: exactAndMatcher,
    [SelectSearchStrategy.EXACT_OR]: exactOrMatcher,
};

/**
 * Geeft de search matcher functie op basis van het type.
 * Voor 'default' wordt null geretourneerd om het native Choices.js gedrag te gebruiken.
 * @param type - Het type van de search strategy ('default', 'exact-and' of 'exact-or')
 * @returns De bijbehorende search matcher functie, of null voor native gedrag
 */
export const getSearchMatcher = (type: SelectSearchStrategy): SelectRichSearchMatcher | null => {
    return type === SelectSearchStrategy.DEFAULT ? null : (searchMatcherMap[type] || null);
};
