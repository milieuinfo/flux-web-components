import Choices from 'choices.js';
import { SelectSearchStrategy } from './vl-select-rich.model';

export type SelectRichSearchMatcher = (choices: Choices, searchValue: string) => number | null;

const createExactMatcher = (
    matchLogic: (searchWords: string[], searchText: string) => boolean
): SelectRichSearchMatcher => {
    return (choices: Choices, searchValue: string) => {
        const newValue = searchValue.trim().replace(/\s{2,}/g, ' ');

        if (!newValue.length || newValue === (choices as any)._currentValue) {
            return null;
        }

        const searcher = (choices as any)._searcher;
        const store = (choices as any)._store;
        const allChoices = store.choices.filter((choice: any) => !choice.placeholder);

        if (searcher.isEmptyIndex()) {
            searcher.index(allChoices);
        }

        const searchWords = newValue.toLowerCase().split(/\s+/).filter((word: string) => word.length > 0);

        const results = allChoices
            .filter((choice: any) => {
                if (choice.disabled) {
                    return false;
                }

                const label = choice.label?.toLowerCase() || '';
                const choiceValue = choice.value?.toLowerCase() || '';
                const searchText = `${label} ${choiceValue}`;

                return matchLogic(searchWords, searchText);
            })
            .map((choice: any, index: number) => ({
                item: choice,
                score: 0,
                rank: index + 1,
            }));

        (choices as any)._currentValue = newValue;
        (choices as any)._highlightPosition = 0;
        (choices as any)._isSearching = true;

        const notice = (choices as any)._notice;
        const noticeType = notice && notice.type;

        if (noticeType !== 'addChoice') {
            if (!results.length) {
                (choices as any)._displayNotice((choices as any).config.noResultsText, 'no-results');
            } else {
                (choices as any)._clearNotice();
            }
        }

        (choices as any)._store.dispatch({
            type: 'FILTER_CHOICES',
            results: results,
        });

        return results.length;
    };
};

export const exactAndMatcher: SelectRichSearchMatcher = createExactMatcher(
    (searchWords, searchText) => searchWords.every((word) => searchText.includes(word))
);

export const exactOrMatcher: SelectRichSearchMatcher = createExactMatcher(
    (searchWords, searchText) => searchWords.some((word) => searchText.includes(word))
);

const searchMatcherMap: Record<string, SelectRichSearchMatcher> = {
    [SelectSearchStrategy.EXACT_AND]: exactAndMatcher,
    [SelectSearchStrategy.EXACT_OR]: exactOrMatcher,
};

export const getSearchMatcher = (type: SelectSearchStrategy): SelectRichSearchMatcher | null => {
    return type === SelectSearchStrategy.DEFAULT ? null : searchMatcherMap[type] || null;
};
