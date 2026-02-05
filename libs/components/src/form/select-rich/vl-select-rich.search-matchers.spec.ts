import Choices from 'choices.js';
import { exactOrMatcher, exactAndMatcher } from './vl-select-rich.search-matchers';

describe('jest - components - vl-select-rich - search-matchers', () => {
    let mockChoices: Partial<Choices>;

    beforeEach(() => {
        // Console logging afzetten
        jest.spyOn(console, 'log').mockImplementation(() => {});

        // Mock Choices.js structure
        mockChoices = {
            config: {
                noResultsText: 'Geen resultaten gevonden',
            },
        } as any;

        // Mock internal Choices.js properties
        (mockChoices as any)._currentValue = '';
        (mockChoices as any)._highlightPosition = 0;
        (mockChoices as any)._isSearching = false;
        (mockChoices as any)._notice = null;
        (mockChoices as any)._searcher = {
            isEmptyIndex: jest.fn().mockReturnValue(false),
            index: jest.fn(),
        };
        const testChoices = [
            {
                label: 'De Morgen van gisteren',
                value: 'De Morgen van gisteren',
                active: true,
                disabled: false,
                placeholder: false,
            },
            {
                label: 'De Standaard van gisteren',
                value: 'De Standaard van gisteren',
                active: true,
                disabled: false,
                placeholder: false,
            },
            {
                label: 'De Standaard van morgen',
                value: 'De Standaard van morgen',
                active: true,
                disabled: false,
                placeholder: false,
            },
            {
                label: 'De Standaard van Berchem',
                value: 'De Standaard van Berchem',
                active: true,
                disabled: false,
                placeholder: false,
            },
            {
                label: 'De Standaard van Gent',
                value: 'De Standaard van Gent',
                active: true,
                disabled: false,
                placeholder: false,
            },
            {
                label: 'Brussel Antwerpen Gent',
                value: 'Brussel Antwerpen Gent',
                active: true,
                disabled: false,
                placeholder: false,
            },
        ];

        (mockChoices as any)._store = {
            choices: testChoices,
            searchableChoices: testChoices,
            dispatch: jest.fn(),
        };
        (mockChoices as any)._displayNotice = jest.fn();
        (mockChoices as any)._clearNotice = jest.fn();
    });

    describe('exactOrMatcher', () => {
        it('should return null for empty search value', () => {
            const result = exactOrMatcher(mockChoices as Choices, '');
            expect(result).toBeNull();
        });

        it('should return null for whitespace-only search value', () => {
            const result = exactOrMatcher(mockChoices as Choices, '   ');
            expect(result).toBeNull();
        });

        it('should find all choices containing "morgen" OR "standaard" with OR logic', () => {
            const result = exactOrMatcher(mockChoices as Choices, 'morgen standaard');

            // Verify dispatch was called with filtered results
            expect((mockChoices as any)._store.dispatch).toHaveBeenCalledWith({
                type: 'FILTER_CHOICES',
                results: expect.arrayContaining([
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Morgen van gisteren' }),
                    }),
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van gisteren' }),
                    }),
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van morgen' }),
                    }),
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van Berchem' }),
                    }),
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van Gent' }),
                    }),
                ]),
            });

            // Should return 5 results (all that contain either "morgen" or "standaard")
            expect(result).toBe(5);
        });

        it('should find choices containing "morgen" with single word search', () => {
            const result = exactOrMatcher(mockChoices as Choices, 'morgen');

            expect((mockChoices as any)._store.dispatch).toHaveBeenCalledWith({
                type: 'FILTER_CHOICES',
                results: expect.arrayContaining([
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Morgen van gisteren' }),
                    }),
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van morgen' }),
                    }),
                ]),
            });

            expect(result).toBe(2);
        });

        it('should find choices containing "gent" with single word search', () => {
            const result = exactOrMatcher(mockChoices as Choices, 'gent');

            expect((mockChoices as any)._store.dispatch).toHaveBeenCalledWith({
                type: 'FILTER_CHOICES',
                results: expect.arrayContaining([
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van Gent' }),
                    }),
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'Brussel Antwerpen Gent' }),
                    }),
                ]),
            });

            expect(result).toBe(2);
        });

        it('should find choices containing "brussel" OR "gent" with OR logic', () => {
            const result = exactOrMatcher(mockChoices as Choices, 'brussel gent');

            expect((mockChoices as any)._store.dispatch).toHaveBeenCalledWith({
                type: 'FILTER_CHOICES',
                results: expect.arrayContaining([
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van Gent' }),
                    }),
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'Brussel Antwerpen Gent' }),
                    }),
                ]),
            });

            expect(result).toBe(2);
        });

        it('should return 0 results when no matches found', () => {
            const result = exactOrMatcher(mockChoices as Choices, 'xyz');

            expect((mockChoices as any)._displayNotice).toHaveBeenCalledWith(
                'Geen resultaten gevonden',
                'no-results'
            );
            expect(result).toBe(0);
        });

        it('should skip disabled choices', () => {
            (mockChoices as any)._store.choices[0].disabled = true;

            const result = exactOrMatcher(mockChoices as Choices, 'morgen');

            // Should only find "De Standaard van morgen" (not "De Morgen van gisteren" because it's disabled)
            expect(result).toBe(1);
        });

        it('should NOT skip inactive choices (we determine activity ourselves)', () => {
            (mockChoices as any)._store.choices[0].active = false;

            const result = exactOrMatcher(mockChoices as Choices, 'morgen');

            // Should find both choices with "morgen", even if one is marked inactive by Choices.js
            // We ignore the active flag and determine ourselves what matches
            expect(result).toBe(2);
        });

        it('should be case insensitive', () => {
            const result = exactOrMatcher(mockChoices as Choices, 'MORGEN');

            expect(result).toBe(2);
        });

        it('should handle multiple spaces in search value', () => {
            const result = exactOrMatcher(mockChoices as Choices, 'morgen    standaard');

            expect(result).toBe(5);
        });
    });

    describe('exactAndMatcher', () => {
        it('should find only choices containing BOTH "morgen" AND "standaard"', () => {
            const result = exactAndMatcher(mockChoices as Choices, 'morgen standaard');

            expect((mockChoices as any)._store.dispatch).toHaveBeenCalledWith({
                type: 'FILTER_CHOICES',
                results: expect.arrayContaining([
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van morgen' }),
                    }),
                ]),
            });

            // Should return only 1 result (only "De Standaard van morgen" contains both)
            expect(result).toBe(1);
        });

        it('should find choices containing both "standaard" AND "gent"', () => {
            const result = exactAndMatcher(mockChoices as Choices, 'standaard gent');

            expect((mockChoices as any)._store.dispatch).toHaveBeenCalledWith({
                type: 'FILTER_CHOICES',
                results: expect.arrayContaining([
                    expect.objectContaining({
                        item: expect.objectContaining({ label: 'De Standaard van Gent' }),
                    }),
                ]),
            });

            expect(result).toBe(1);
        });

        it('should return 0 when searching for words that never appear together', () => {
            const result = exactAndMatcher(mockChoices as Choices, 'morgen brussel');

            expect(result).toBe(0);
        });
    });

    describe('exactOrMatcher vs exactAndMatcher', () => {
        it('OR should return more results than AND for multi-word search', () => {
            const orResult = exactOrMatcher(mockChoices as Choices, 'morgen standaard');

            // Reset _currentValue zodat de volgende matcher niet denkt dat het dezelfde zoekterm is
            (mockChoices as any)._currentValue = '';

            const andResult = exactAndMatcher(mockChoices as Choices, 'morgen standaard');

            expect(orResult).not.toBeNull();
            expect(andResult).not.toBeNull();
            expect(orResult!).toBeGreaterThan(andResult!);
            expect(orResult).toBe(5); // OR: all with "morgen" OR "standaard"
            expect(andResult).toBe(1); // AND: only "De Standaard van morgen" has both
        });
    });
});
