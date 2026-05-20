import { TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const vlGroupArgs = {
    group: true,
    column: false,
    stretchChildren: false,
    noGap: false,
    noRowGap: false,
    noColumnGap: false,
    wrap: false,
    spaceBetween: false,
    justifyStart: false,
    justifyCenter: false,
    justifyEnd: false,
    alignStart: false,
    alignCenter: false,
    alignEnd: false,
    baseline: false,
    separatorRow: false,
    separatorRowBefore: false,
    separatorRowAfter: false,
    separatorColumn: false,
    separatorColumnBefore: false,
    separatorColumnAfter: false,
    collapseL: false,
    collapseM: false,
    collapseS: false,
    collapseXS: false,
};

export const vlGroupArgTypes: ArgTypes<typeof vlGroupArgs> = {
    group: {
        name: 'vl-group',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'block style',
            defaultValue: { summary: String(false) },
        },
        description: 'Verplichte root style.',
    },
    column: {
        name: 'vl-group--column',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items uit in een kolom.',
    },
    stretchChildren: {
        name: 'vl-group--stretch-children',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description:
            'Laat de kinderen van de groep de volledige breedte van de groep innemen. Enkel te gebruiken in combinatie met vl-group--column.',
    },
    noGap: {
        name: 'vl-group--no-gap',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Schrapt de verticale en horizontale ruimte tussen items.',
    },
    noRowGap: {
        name: 'vl-group--no-row-gap',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Schrapt de verticale ruimte tussen items.',
    },
    noColumnGap: {
        name: 'vl-group--no-column-gap',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Schrapt de horizontale ruimte tussen items.',
    },
    wrap: {
        name: 'vl-group--wrap',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Laat items overlopen bij gebrek aan ruimte.',
    },
    spaceBetween: {
        name: 'vl-group--space-between',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description:
            'Het eerste item staat in het begin, het laatste op het einde,' +
            'de overige items staan verdeelt met gelijke ruimte ertussen.',
    },
    justifyStart: {
        name: 'vl-group--justify-start',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items uit naar het begin op de hoofdas.',
    },
    justifyCenter: {
        name: 'vl-group--justify-center',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items centraal uit op de hoofdas.',
    },
    justifyEnd: {
        name: 'vl-group--justify-end',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items uit naar het einde op de hoofdas.',
    },
    alignStart: {
        name: 'vl-group--align-start',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items uit naar het begin op de dwarsas.',
    },
    alignCenter: {
        name: 'vl-group--align-center',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items centraal uit op de dwarsas.',
    },
    alignEnd: {
        name: 'vl-group--align-end',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items uit naar het einde op de dwarsas.',
    },
    baseline: {
        name: 'vl-group--baseline',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items gelijk uit op de "baseline" van de dwarsas.',
    },
    separatorRow: {
        name: 'vl-group--separator-row',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Voegt verticale scheidingslijnen toe links en rechts tussen items.',
    },
    separatorRowBefore: {
        name: 'vl-group--separator-row-before',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description:
            'Voegt een verticale scheidingslijn toe uiterst links, vóór het eerste item. Enkel te gebruiken in combinatie met vl-group--separator-row.',
    },
    separatorRowAfter: {
        name: 'vl-group--separator-row-after',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description:
            'Voegt een verticale scheidingslijn toe uiterst rechts, na het laatste item. Enkel te gebruiken in combinatie met vl-group--separator-row.',
    },
    separatorColumn: {
        name: 'vl-group--separator-column',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Voegt horizontale scheidingslijnen toe tussen items.',
    },
    separatorColumnBefore: {
        name: 'vl-group--separator-column-before',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description:
            'Voegt een horizontale scheidingslijn toe boven het eerste item. Enkel te gebruiken in combinatie met vl-group--separator-column.',
    },
    separatorColumnAfter: {
        name: 'vl-group--separator-column-after',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description:
            'Voegt een horizontale scheidingslijn toe onder het laatste item. Enkel te gebruiken in combinatie met vl-group--separator-column.',
    },
    collapseL: {
        name: 'vl-group--collapse-l',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items verticaal uit op een groot scherm (>1023px).',
    },
    collapseM: {
        name: 'vl-group--collapse-m',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items verticaal uit op een gemiddeld scherm (<1023px).',
    },
    collapseS: {
        name: 'vl-group--collapse-s',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items verticaal uit op een klein scherm (<767px).',
    },
    collapseXS: {
        name: 'vl-group--collapse-xs',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: 'modifier style',
            defaultValue: { summary: String(false) },
        },
        description: 'Lijnt de items verticaal uit op een extra klein scherm (<500px).',
    },
};
