import Choices from 'choices.js';
import { SelectSearchStrategy } from './vl-select-rich.model';

/**
 * Type definitie voor een search matcher functie.
 */
export type SelectRichSearchMatcher = (choices: Choices, searchValue: string) => number | null;

/**
 * Helper functie voor exacte search matching met configureerbare match logica.
 * @param matchLogic - Functie die bepaalt of een choice matcht op basis van zoekwoorden
 * @returns Een search matcher functie
 */
const createExactMatcher = (
    matchLogic: (searchWords: string[], searchText: string) => boolean
): SelectRichSearchMatcher => {
    return (choices: Choices, searchValue: string) => {
        const newValue = searchValue.trim().replace(/\s{2,}/g, ' ');

        // Als de zoekterm leeg is of gelijk aan de huidige waarde, stop
        if (!newValue.length || newValue === (choices as any)._currentValue) {
            return null;
        }

        const searcher = (choices as any)._searcher;
        const store = (choices as any)._store;

        // Gebruik ALTIJD alle choices (niet alleen searchableChoices die al gefilterd kunnen zijn)
        // Dit zorgt ervoor dat we altijd op de volledige lijst zoeken, niet incrementeel
        const allChoices = store.choices.filter((choice: any) => !choice.placeholder);

        // Herindexeer de searcher met alle choices bij elke zoekopdracht
        if (searcher.isEmptyIndex()) {
            searcher.index(allChoices);
        }

        // Split de zoekterm in woorden
        const searchWords = newValue.toLowerCase().split(/\s+/).filter((word: string) => word.length > 0);

        const results = allChoices
            .filter((choice: any) => {
                // Check alleen disabled, niet active - want we bepalen zelf wat actief is
                // (choice.active kan nog false zijn van een vorige zoekopdracht)
                if (choice.disabled) {
                    return false;
                }

                // Zoek in label en value
                const label = choice.label?.toLowerCase() || '';
                const choiceValue = choice.value?.toLowerCase() || '';
                const searchText = `${label} ${choiceValue}`;

                // Pas de opgegeven match logica toe
                return matchLogic(searchWords, searchText);
            })
            .map((choice: any, index: number) => ({
                item: choice,
                score: 0,
                rank: index + 1,
            }));

        // Update de huidige waarde en state
        (choices as any)._currentValue = newValue;
        (choices as any)._highlightPosition = 0;
        (choices as any)._isSearching = true;

        // Toon "geen resultaten" bericht als er geen matches zijn
        const notice = (choices as any)._notice;
        const noticeType = notice && notice.type;

        if (noticeType !== 'addChoice') {
            if (!results.length) {
                (choices as any)._displayNotice((choices as any).config.noResultsText, 'no-results');
            } else {
                (choices as any)._clearNotice();
            }
        }

        // Dispatch de gefilterde resultaten naar de store
        (choices as any)._store.dispatch({
            type: 'FILTER_CHOICES',
            results: results,
        });

        return results.length;
    };
};

/**
 * Exacte AND-search matcher: alle zoekwoorden moeten exact voorkomen (substring match).
 * Bij meerdere woorden moeten ALLE woorden voorkomen in het label of value (AND-logica).
 * Geen fuzzy matching - alleen exacte substring matches.
 */
export const exactAndMatcher: SelectRichSearchMatcher = createExactMatcher(
    (searchWords, searchText) => searchWords.every((word) => searchText.includes(word))
);

/**
 * Exacte OR-search matcher: minstens één zoekwoord moet exact voorkomen (substring match).
 * Bij meerdere woorden moet MINSTENS ÉÉN woord voorkomen in het label of value (OR-logica).
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
