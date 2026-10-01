import fs from 'fs-extra';
import path from 'path';

const libsFolder = path.resolve(__dirname, '../../../libs');
const wtConfigFolder = path.resolve(__dirname, '../wt-config-build');

// een argTypes wordt geïdentificeerd met bestand + exportnaam, legacy en next componenten exporteren soms dezelfde naam
// (bvb. tabsArgTypes), een vergelijking op naam alleen ziet dan niet welke van de twee gekoppeld is
const argTypesKey = (file: string, exportName: string): string => `${path.relative(libsFolder, file)}#${exportName}`;

const findStoriesArgFiles = (directory: string): string[] =>
    fs.readdirSync(directory).flatMap((file) => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
            return findStoriesArgFiles(filePath);
        }
        return file.endsWith('.stories-arg.ts') ? [filePath] : [];
    });

// alle argTypes die geëxporteerd worden uit een stories-arg bestand
export const extractStoriesArgTypes = (): string[] =>
    ['components/src', 'map/src', 'structures/src']
        .flatMap((folder) => findStoriesArgFiles(path.join(libsFolder, folder)))
        .flatMap((file) =>
            [
                ...fs
                    .readFileSync(file)
                    .toString()
                    .matchAll(/export const (\w+ArgTypes)\b/g),
            ].map((match) => argTypesKey(file, match[1])),
        );

// alle argTypes die in de wt-config aan een web-type gekoppeld zijn
export const extractWTConfigArgTypes = (): string[] =>
    fs
        .readdirSync(wtConfigFolder)
        .filter((file) => file.endsWith('.wt-config.ts'))
        .flatMap((file) => {
            const source = fs.readFileSync(path.join(wtConfigFolder, file)).toString();
            // lokale naam (eventueel via 'as') -> bestand + exportnaam
            const importedArgTypes = new Map<string, string>();
            [...source.matchAll(/import \{([^}]+)\} from '(\.[^']+)'/g)].forEach(([, names, from]) =>
                names
                    .split(',')
                    .map((name) => name.trim())
                    .filter(Boolean)
                    .forEach((name) => {
                        const [exportName, localName = exportName] = name.split(/\s+as\s+/);
                        importedArgTypes.set(
                            localName,
                            argTypesKey(path.resolve(wtConfigFolder, from + '.ts'), exportName),
                        );
                    }),
            );
            return [...source.matchAll(/buildWTConfig\(\s*'[^']+'\s*,\s*(\w+)\s*,/g)]
                .map((match) => importedArgTypes.get(match[1]))
                .filter(Boolean);
        });
