import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const modalArgs = {
    ...defaultArgs,
    title: 'Modal',
    open: false,
    closable: false,
    notCancellable: false,
    notAutoClosable: false,
    allowOverflow: false,
};

export const modalArgTypes: ArgTypes = {
    ...defaultArgTypes,
    title: {
        name: 'title',
        description:
            'Attribuut gebruikt om een `<h2>` titel toe te voegen. Indien leeg, wordt er geen titel element aangemaakt.',
        table: {
            type: { summary: 'String' },
            defaultValue: { summary: '' },
            category: 'Attributes',
        },
    },
    open: {
        name: 'open',
        description: 'Attribuut om de modal onmiddellijk te openen na de rendering.',
        table: {
            type: { summary: 'Boolean' },
            defaultValue: { summary: 'false' },
            category: 'Attributes',
        },
    },
    closable: {
        name: 'closable',
        description:
            'Attribuut om de modal sluitbaar te maken via het "Sluit"-icoon in de rechterbovenhoek of door de "Escape"-toets te gebruiken.',
        table: {
            type: { summary: 'Boolean' },
            defaultValue: { summary: 'false' },
            category: 'Attributes',
        },
    },
    notCancellable: {
        name: 'not-cancellable',
        description: 'Attribuut gebruikt om de modal niet annuleerbaar te maken.',
        table: {
            type: { summary: 'Boolean' },
            defaultValue: { summary: 'false' },
            category: 'Attributes',
        },
    },
    notAutoClosable: {
        name: 'not-auto-closable',
        description:
            'Attribuut om het afsluiten van de modal uit te schakelen bij het klikken op de actie in het button-slot.',
        table: {
            type: { summary: 'Boolean' },
            defaultValue: { summary: 'false' },
            category: 'Attributes',
        },
    },
    allowOverflow: {
        name: 'allow-overflow',
        description: 'Attribuut om de afgesneden inhoud van de modal zichtbaar te maken.',
        table: {
            type: { summary: 'Boolean' },
            defaultValue: { summary: 'false' },
            category: 'Attributes',
        },
    },
    contentSlot: {
        name: 'content',
        description: 'Dit slot bevat de HTML inhoud van de modal.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
    buttonSlot: {
        name: 'button',
        description: 'Gebruik dit slot om de primaire actie mee te geven.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
