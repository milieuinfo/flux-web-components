import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { uploadProgressDefaults } from '../vl-upload-progress.defaults';

type UploadProgressArgs = typeof defaultArgs &
    typeof uploadProgressDefaults & { onVlUploadProgressRetry: () => void; onVlUploadProgressCancel: () => void };


export const uploadProgressArgs: UploadProgressArgs = {
    ...defaultArgs,
    ...uploadProgressDefaults,
    onVlUploadProgressRetry: action('vl-upload-progress-retry'),
    onVlUploadProgressCancel: action('vl-upload-progress-cancel'),
};

export const uploadProgressArgTypes: ArgTypes<UploadProgressArgs> = {
    ...defaultArgTypes,
    filename: {
        name: 'filename',
        description: 'De naam van het bestand dat wordt geupload.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadProgressDefaults.filename },
        },
    },
    filesize: {
        name: 'filesize',
        description: 'De grootte van het bestand dat wordt geupload, inclusief de eenheid. bv. "1.2 MB".',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadProgressDefaults.filesize },
        },
    },
    label: {
        name: 'label',
        description: 'Voegt een label toe vóór de bestandsnaam.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadProgressDefaults.label },
        },
    },
    progress: {
        name: 'progress',
        description: 'De procentuele voortgang van het uploaden.',
        control: { type: 'range', min: 0, max: 100, step: 1 },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadProgressDefaults.progress) },
        },
    },
    indeterminate: {
        name: 'indeterminate',
        description:
            'Bepaalt of de progress bar een "indeterminate" animatie zal tonen. Gebruik dit indien de voortgang niet exact bepaald kan worden.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadProgressDefaults.indeterminate) },
        },
    },
    cancellable: {
        name: 'cancellable',
        description: 'Bepaalt of de upload geannuleerd kan worden.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadProgressDefaults.cancellable) },
        },
    },
    retryable: {
        name: 'retryable',
        description: 'Bepaalt of de upload opnieuw geprobeerd kan worden.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadProgressDefaults.retryable) },
        },
    },
    error: {
        name: 'error',
        description: 'Past de "error" stijl toe.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadProgressDefaults.error) },
        },
    },
    success: {
        name: 'success',
        description: 'Past de "success" stijl toe.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadProgressDefaults.success) },
        },
    },
    message: {
        name: 'message',
        description: 'Toont een boodschap bij het uploaden.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadProgressDefaults.message },
        },
    },
    hideProgress: {
        name: 'hide-progress',
        description: 'Verberg de progress bar.',
        control: { type: CONTROLS.BOOLEAN },
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadProgressDefaults.hideProgress) },
        },
    },
    onVlUploadProgressRetry: {
        name: 'vl-upload-progress-retry',
        description: 'Event dat afgevuurd wordt bij het klikken op de retry-knop.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
    onVlUploadProgressCancel: {
        name: 'vl-upload-progress-cancel',
        description: 'Event dat afgevuurd wordt bij het klikken op de cancel-knop.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
