import { action } from '@storybook/addon-actions';
import { StoryContext, StoryFn } from '@storybook/web-components';
import { nothing } from 'lit';
import * as prettierHtml from 'prettier/parser-html';
import * as prettier from 'prettier/standalone';

export const CATEGORIES = {
    ATTRIBUTES: 'Attributes',
    PROPERTIES: 'Properties',
    EVENTS: 'Events',
    SLOTS: 'Slots',
} as const;

export const TYPES = {
    ARRAY: 'array',
    BOOLEAN: 'boolean',
    STRING: 'string',
    MAP: 'map',
    NUMBER: 'number',
    HTML: 'html',
    URL: 'url',
    FUNCTION: 'function',
    XML: 'xml',
    REGEX: 'regex',
} as const;

export const CONTROLS = {
    BOOLEAN: 'boolean',
    DATE: 'date',
    OBJECT: 'object',
    SELECT: 'select',
    INLINE_RADIO: 'inline-radio',
    RANGE: 'range',
    NUMBER: 'number',
};

export const filterOutDataCy = (input: string) => {
    return input?.replace(/ data-cy=".*?"/, '');
};

export const filterOutClasses = (input: string) => {
    return input?.replace(/ class=".*?"/, '');
};

// een upgrade naar Prettier v3 kan niet, v3 geeft een Promise<string> terug bij de format methode en dat wordt niet
// ondersteund door Storybook - er is ook geen manier in Javascript om van een async-call een sync-call te maken
export const formatHTML = (input: string) => {
    // de 'html' parser sluit self-closing tags expliciet - <input> wordt <input />, dit is op zich niet
    // gewenst maar de 'babel' parser geeft een fout - waardoor de ongeformatteerde input terug komt
    try {
        return prettier.format(input, {
            parser: 'html',
            plugins: [prettierHtml],
            semi: false,
            printWidth: 120,
            tabWidth: 4,
        });
    } catch (error) {
        console.log('formatHTML fout', error);
        // geeft de originele input terug als het formatteren mislukt is
        return input;
    }
};

export const getSelectControlOptions = (options: string[]) => {
    return options.reduce((result, key, currentIndex) => {
        return result + `"${key}"${currentIndex === options.length - 1 ? '' : ' | '}`;
    }, '');
};

// Logt het event in zowel in Storybook als in de developer console.
// Logt het event in de developer console omdat in Storybook custom event properties soms niet gelogd worden.
export const logStorybookEvent = <T extends Event>(eventName: string) => {
    return (event: T) => {
        if (!event) return;

        console.log(event);
        action(eventName)(event);
    };
};

export const story = <T extends object>(defaultArgs: T, storyFn: StoryFn<T>): StoryFn<T> => {
    return (args: T, context: StoryContext<T>) => {
        const newArgs = setDefaultArgsToNothing(args, defaultArgs);
        return storyFn(newArgs, context);
    };
};

export const defaultArgs = {
    customCSS: null,
} as const;

export const defaultArgTypes = {
    customCSS: {
        name: 'custom-css',
        description:
            'Custom CSS string.<br>Wordt toegevoegd aan de adoptedStyleSheets in de shadow DOM van de component.',
        control: { type: null },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: null },
        },
    },
};

// Gebruik deze functie om de args van een story die overeen komen met de default args van een component
// om te zetten naar 'nothing' zodat deze args niet getoond worden in de source code op de docs pagina van de story.
const setDefaultArgsToNothing = <T extends object>(args: T, defaultArgs: T): T => {
    return Object.keys(args).reduce((result, key) => {
        const value = (args as any)[key];
        const defaultValue = (defaultArgs as any)[key];

        if (typeof value === 'function') {
            // Bij een event arg is de value van het type 'function', geef hier altijd de value terug.
            (result as any)[key] = value;
        } else {
            // Geef de value terug indien deze verschilt van de defaultValue, anders geef 'nothing' terug.
            (result as any)[key] = value !== defaultValue ? value : nothing;
        }

        return result;
    }, {} as T);
};

// door dit op de parameters van een story te zetten wordt de code as-is getoond (niet verwerkt),
// variabelen blijven variabelen
export const formattedSourceCode = {
    docs: {
        source: {
            format: true,
            type: 'code',
        },
    },
};
