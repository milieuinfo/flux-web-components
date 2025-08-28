import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { formControlArgs, formControlArgTypes } from '../../form-control/stories/form-control.stories-arg';
import { uploadDefaults } from '../vl-upload.defaults';
import { action } from 'storybook/actions';

type UploadArgs = typeof uploadDefaults &
    typeof formControlArgs & {
        onVlChange: () => void;
        onVlInput: () => void;
        onVlValid: () => void;
        onVlUploadProgress: () => void;
        onVlAddedFile: () => void;
        onVlRemovedFile: () => void;
        onVlSuccess: () => void;
        onVlError: () => void;
        onVlComplete: () => void;
        onVlQueueComplete: () => void;
        onVlInitialised: () => void;
    };

export const uploadArgs: UploadArgs = {
    ...formControlArgs,
    ...uploadDefaults,
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlValid: action('vl-valid'),
    onVlAddedFile: action('vl-addedfile'),
    onVlRemovedFile: action('vl-removedfile'),
    onVlSuccess: action('vl-success'),
    onVlError: action('vl-error'),
    onVlUploadProgress: action('vl-upload-progress'),
    onVlComplete: action('vl-complete'),
    onVlQueueComplete: action('vl-queuecomplete'),
    onVlInitialised: action('vl-initialised'),
};

export const uploadArgTypes: ArgTypes<UploadArgs> = {
    ...formControlArgTypes,
    readonly: {
        name: 'readonly',
        description: 'Duidt aan dat het veld enkel leesbaar is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadArgs.readonly) },
        },
    },
    acceptedFiles: {
        name: 'accepted-files',
        description:
            'Attribuut om te bepalen welke bestanden worden geaccepteerd door de component (extensie en mimetype).<br>Bv. `image/*,application/pdf,.psd`',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadArgs.acceptedFiles },
        },
    },
    autoProcess: {
        name: 'auto-process',
        description:
            'Attribuut om te activeren of deactiveren dat het het gedropte bestand direct moet opgeladen worden.',
        table: {
            type: {
                summary: TYPES.BOOLEAN,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadArgs.autoProcess) },
        },
    },
    disallowDuplicates: {
        name: 'disallow-duplicates',
        description:
            'Bepaalt dat het niet is toegelaten om dezelfde bijlage meerdere keren te uploaden. Niet reactief.',
        table: {
            type: {
                summary: TYPES.BOOLEAN,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadArgs.disallowDuplicates) },
        },
    },
    errorMessageAcceptedFiles: {
        name: 'error-message-accepted-files',
        description:
            'Attribuut om de message te definiëren wanneer er bestanden zijn toegevoegd die niet voldoen aan het' +
            'gevraagde bestandstype.',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadArgs.errorMessageAcceptedFiles },
        },
    },
    errorMessageFilesize: {
        name: 'error-message-filesize',
        description:
            'Attribuut om de message te definiëren wanneer er te grote bestanden zijn toegevoegd. <br> Gebruik' +
            ' {{maxSize}} om de maximum grootte weer te geven in MB.',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadArgs.errorMessageFilesize },
        },
    },
    errorMessageMaxFiles: {
        name: 'error-message-maxfiles',
        description:
            'Attribuut om de boodschap te bepalen wanneer er te veel bestanden zijn toegevoegd. <br> Gebruik' +
            ' {{maxFiles}} om het maximum aantal bestanden weer te geven.',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadArgs.errorMessageMaxFiles },
        },
    },
    maxFiles: {
        name: 'max-files',
        description: 'Bepaalt aantal upload-bestanden',
        table: {
            type: {
                summary: 'number',
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadArgs.maxFiles) },
        },
    },
    maxSize: {
        name: 'max-size',
        description: 'Bepaalt de maximum grootte per upload-bestand in MB.',
        table: {
            type: {
                summary: 'number',
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadArgs.maxSize) },
        },
    },
    subTitle: {
        name: 'sub-title',
        description: 'De annotatietekst voor de upload knop.\nNiet reactief.',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadArgs.subTitle },
        },
    },
    mainTitle: {
        name: 'main-title',
        description: 'De tekst die op de upload knop komt te staan.\nNiet reactief.',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadArgs.mainTitle },
        },
    },
    parallelUploads: {
        name: 'parallel-uploads',
        description: 'Bepaalt het aantal bestanden dat tegelijkertijd ' + 'geüpload kan worden.',
        table: {
            type: {
                summary: 'number',
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadArgs.parallelUploads) },
        },
    },
    url: {
        name: 'url',
        description: 'Bepaalt de upload url.\nNiet reactief.',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: uploadArgs.url },
        },
    },
    chunking: {
        name: 'chunking',
        description:
            'Attribuut om te activeren of deactiveren dat het bestand in stukken wordt geüpload.<br> Dit moet aanstaan om upload progress te verkrijgen.',
        table: {
            type: {
                summary: TYPES.BOOLEAN,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(uploadArgs.chunking) },
        },
    },
    uploadProgressFn: {
        name: 'uploadProgressFn',
        description:
            'Functie die wordt aangeroepen wanneer een bestand wordt geüpload.<br> Deze functie geeft de voortgang van de upload in percentage en de bytes die zijn verzonden.',
        table: {
            type: {
                summary: TYPES.FUNCTION,
            },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(uploadArgs.uploadProgressFn) },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als bestanden worden toegevoegd of verwijderd (zowel programmatorisch als door ' +
            'een gebruiker).<br>Het detail object van het event bevat de ingegeven waarde.<br>Daarnaast geeft het ook aan welke file werd verwijderd of toegevoegd.',
        table: {
            type: {
                summary: '{ value: string, type: string, file: File}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat alleen afgevuurd wordt als bestanden worden toegevoegd of verwijderd door een gebruiker.<br>Het detail object van het event bevat de ingegeven waarde.<br>Daarnaast geeft het ook aan welke file werd verwijderd of toegevoegd.',
        table: {
            type: {
                summary: '{ value: string, type: string, file: File}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description:
            'Event dat afgevuurd wordt als de waarde van het input veld valid is.<br>Het detail object van het event ' +
            'bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlAddedFile: {
        name: 'vl-addedfile',
        description:
            'Event dat afgevuurd wordt als een bestand wordt toegevoegd.<br>Daarnaast geeft het ook de file die werd ' +
            'toegevoegd.',
        table: {
            type: {
                summary: '{ value: string, type: string, file: File}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlRemovedFile: {
        name: 'vl-removedfile',
        description:
            'Event dat afgevuurd wordt als een bestand wordt verwijderd.<br>Daarnaast geeft het ook de file die werd ' +
            'verwijderd.',
        table: {
            type: {
                summary: '{ value: string, type: string, file: File}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlError: {
        name: 'vl-error',
        description:
            'Event dat afgevuurd wordt als een bestand niet voldoet aan de validatie.<br>Het detail object van het' +
            ' event bevat de ingegeven waarde.<br>Daarnaast geeft het ook de file met de fout.',
        table: {
            type: {
                summary: '{ value: string, type: string, file: File, errorMessage: string}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlUploadProgress: {
        name: 'vl-upload-progress',
        description:
            'Event dat afgevuurd wordt als een bestand wordt geüpload.<br>Het detail object van het event bevat de voortgang van de upload in percentage en de bytes die zijn verzonden.<br>Dit werkt alleen als het `chunking` attribuut ingesteld is.',
        table: {
            type: {
                summary: '{ file: File, progress: number, bytesSent: number }',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlSuccess: {
        name: 'vl-success',
        description: 'Event dat afgevuurd wordt als de upload van een bestand succesvol is.',
        table: {
            type: {
                summary: '{ value: string, type: string, file: File, response: object | string}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlComplete: {
        name: 'vl-complete',
        description: 'Event dat afgevuurd wordt als de upload van een bestand compleet is.',
        table: {
            type: {
                summary: '{ value: string, type: string, file: File}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlQueueComplete: {
        name: 'vl-queuecomplete',
        description: 'Event dat afgevuurd wordt als de upload van alle bestanden compleet is.',
        table: {
            type: {
                summary: '{ value: string, type: string, file: File}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInitialised: {
        name: 'vl-initialised',
        description:
            'Event dat afgevuurd wordt als de upload component geïnitialiseerd is. Hierna kunnen bv. events ' +
            'geregistreerd worden.',
        table: {
            type: {
                summary: '{ type: string}',
            },
            category: CATEGORIES.EVENTS,
        },
    },
};
