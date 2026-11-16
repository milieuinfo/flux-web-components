import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { SIZE } from '../vl-spotlight.model';

export const spotlightArgs = {
    ...defaultArgs,
    link: '',
    linkLabel: '',
    external: false,
    alt: false,
    noBorder: false,
    size: SIZE.S,
    imgSrc: '',
    imgAlt: '',
    title: '',
    subtitle: '',
    text: '',
    content: '',
};

export const spotlightArgTypes: ArgTypes<typeof spotlightArgs> = {
    ...defaultArgTypes,
    link: {
        name: 'link',
        description:
            'De titel wordt een link naar de url in dit attribuut, en de hele spotlight blijft klikbaar. De titel is de naam van de link: geef een spotlight met `link` dus altijd een titel. Ontbreken zowel de titel als `link-label`, dan geeft de component een waarschuwing in de console. Subtitel, tekst en content worden los van de link voorgelezen.<br/>Zet een link of knop in de spotlight enkel in het slot `content`. In de slots `subtitle` en `text` ligt die onder het klikvlak van de spotlight en is ze niet bereikbaar met de muis; dat wordt niet ondersteund.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: spotlightArgs.link },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    linkLabel: {
        name: 'link-label',
        description:
            'Vult het aria-label attribuut van de link op de titel in en vervangt zo de titel als voorgelezen linktekst. Gebruik het enkel als de titel niet volstaat, bv. om bij `external` te melden dat de link in een nieuw venster opent.<br/>Het label moet de zichtbare titel bevatten, bij voorkeur vooraan (WCAG 2.5.3 Label in Name), bv. "Premies voor renovatie - opent in nieuw venster".',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: spotlightArgs.linkLabel },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    external: {
        name: 'external',
        description:
            'Opent de link in een nieuw tabblad. Dit attribuut wordt enkel gebruikt als het attribuut `link` gezet is.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.external) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    alt: {
        name: 'alt',
        description:
            'Geeft de component een alternatieve stijl. De achtergrond wordt grijs. Dit is geen alternatieve tekst voor de afbeelding: gebruik daarvoor `img-alt`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(spotlightArgs.alt) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    noBorder: {
        name: 'no-border',
        description: 'Geeft de component weer zonder border.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(spotlightArgs.noBorder) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    size: {
        name: 'size',
        description: 'Dit attribuut bepaalt de grootte van de component.',
        type: { name: TYPES.STRING, required: false },
        control: { type: CONTROLS.SELECT },
        options: Object.values(SIZE),
        table: {
            type: { summary: getSelectControlOptions(Object.values(SIZE)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(spotlightArgs.size) },
        },
    },
    imgSrc: {
        name: 'img-src',
        description:
            'Het pad van de afbeelding die getoond wordt in de spotlight. Zet er altijd het attribuut `img-alt` bij.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.imgSrc) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    imgAlt: {
        name: 'img-alt',
        description:
            'De alternatieve tekst van de afbeelding. Beschrijf wat er te zien is als de afbeelding informatie toevoegt, bv. "Oud pannendak met verweerde dakpannen". Is de afbeelding louter decoratief, zet dan een leeg `img-alt=""` zodat schermlezers ze overslaan. Ontbreekt het attribuut bij een `img-src`, dan geeft de component een waarschuwing in de console. Let op: het attribuut `alt` is de grijze stijlvariant en geen alternatieve tekst.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.imgAlt) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    title: {
        name: 'title',
        description: 'Titel van de spotlight. Met het attribuut `link` is de titel de link.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.title) },
            category: CATEGORIES.SLOTS,
        },
    },
    subtitle: {
        name: 'subtitle',
        description: 'Subtitel van de spotlight. Zet hier geen link of knop in als het attribuut `link` gezet is.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.subtitle) },
            category: CATEGORIES.SLOTS,
        },
    },
    text: {
        name: 'text',
        description: 'Tekst van de spotlight. Zet hier geen link of knop in als het attribuut `link` gezet is.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.text) },
            category: CATEGORIES.SLOTS,
        },
    },
    content: {
        name: 'content',
        description:
            'Content van de spotlight. Een link of knop in dit slot, bv. een `vl-document`, blijft apart bereikbaar naast de link op de titel. Een klik op de content volgt de link van de spotlight niet.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: String(spotlightArgs.content) },
            category: CATEGORIES.SLOTS,
        },
    },
};
