import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { videoPlayerDefaults } from '../vl-video-player.defaults';

export type VideoPlayerArgs = typeof defaultArgs & typeof videoPlayerDefaults;

export const videoPlayerArgs: VideoPlayerArgs = {
    ...defaultArgs,
    ...videoPlayerDefaults,
};

export const videoPlayerArgTypes: ArgTypes<VideoPlayerArgs> = {
    ...defaultArgTypes,
    title: {
        name: 'title',
        description: 'Stelt de titel van de video in.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: videoPlayerArgs.title },
        },
    },
    source: {
        name: 'source',
        description: 'Stelt de bron van de video in.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: videoPlayerArgs.source },
        },
    },
    subtitles: {
        name: 'subtitles',
        description: 'Stelt de bron van de ondertitels in.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: videoPlayerArgs.subtitles },
        },
    },
    poster: {
        name: 'poster',
        description: 'Stelt een afbeelding in die wordt weergegeven totdat de video wordt afgespeeld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: videoPlayerArgs.poster },
        },
    },
    type: {
        name: 'type',
        description:
            'Stelt het mediatype (mimetype) van de bron in, bv. "video/mp4". Nodig wanneer de source-URL geen' +
            ' bestandsextensie bevat; anders wordt het type uit de extensie afgeleid.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: videoPlayerArgs.type },
        },
    },
};
