import fs from 'fs-extra';
import path from 'path';

const validFileName = (file: string, matchPatterns: string[]): boolean => {
    let match = false;
    if (matchPatterns && matchPatterns.length > 0) {
        matchPatterns.forEach((matchPattern) => {
            if (file.includes(matchPattern)) {
                match = true;
            }
        });
    } else {
        match = true;
    }
    return match;
};

const validFileSuffix = (file: string, ignoreSuffixes: string[]): boolean => {
    let validSuffix = true;
    ignoreSuffixes?.forEach((ignoreSuffix) => {
        if (file.endsWith(ignoreSuffix)) {
            validSuffix = false;
        }
    });
    return validSuffix;
};

const extractFileWCNames = (
    file: string,
    filePath: string,
    matchSuffixes: string[],
    matchPatterns: string[],
    ignoreSuffixes: string[]
): string[] => {
    let wcNames: string[] = [];
    if (validFileSuffix(file, ignoreSuffixes) && validFileName(file, matchPatterns)) {
        matchSuffixes.forEach((matchSuffix) => {
            if (file.endsWith(matchSuffix)) {
                let wcName = file.substring(0, file.length - matchSuffix.length);
                // web-components die zich in een 'next' folder bevinden worden geregistreerd met een '-next' suffix
                wcName = filePath.includes('next') ? wcName + '-next' : wcName;
                wcNames = [...wcNames, wcName];
            }
        });
    }
    return wcNames;
};

const extractWCNames = (
    directoryToSearch: string,
    matchSuffixes: string[],
    matchPatterns: string[],
    ignoreSuffixes: string[]
): string[] => {
    let wcNames: string[] = [];
    fs.readdirSync(directoryToSearch).forEach((file) => {
        const filePath = directoryToSearch + '/' + file;
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            wcNames = [...wcNames, ...extractWCNames(filePath, matchSuffixes, matchPatterns, ignoreSuffixes)];
        }
        if (stat.isFile()) {
            wcNames = [...wcNames, ...extractFileWCNames(file, filePath, matchSuffixes, matchPatterns, ignoreSuffixes)];
        }
    });
    return wcNames;
};

export const extractComponentWCNames = () =>
    extractWCNames(path.resolve('../../../libs/components/src'), ['.component.ts', '.element.ts'], null, null);

export const extractElementWCNames = () =>
    extractWCNames(path.resolve('../../../libs/elements/src'), ['.element.ts'], null, null);

export const extractFormWCNames = () => {
    return extractWCNames(path.resolve('../../../libs/form/src'), ['.component.ts'], null, null);
};

export const extractMapWCNames = () =>
    extractWCNames(
        path.resolve('../../../libs/map/src'),
        ['.ts'],
        ['vl-map', 'vl-select-'],
        [
            '.stories.ts',
            '.stories-arg.ts',
            '.stories-clustering.ts',
            '.stories-custom-style.ts',
            '.stories-default.ts',
            '.stories-util.ts',
            '.stories-utils.ts',
            '.stories-templates.ts',
            '.cy.ts',
            '.defaults.ts',
            '.mixin.ts',
            '.model.ts',
            '.sub-story.ts',
            '.uig-css.ts',
        ]
    );

export const extractSectionWCNames = () =>
    extractWCNames(path.resolve('../../../libs/sections/src'), ['.section.ts'], ['vl-'], null);

// console.log('ComponentWCNames', extractComponentWCNames());
