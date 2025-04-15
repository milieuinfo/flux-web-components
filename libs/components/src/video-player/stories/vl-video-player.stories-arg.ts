import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { videoPlayerDefaults } from '../vl-video-player.defaults';

export type VideoPlayerArgs = typeof defaultArgs & typeof videoPlayerDefaults;

export const videoPlayerArgs: VideoPlayerArgs = {
    ...defaultArgs,
    ...videoPlayerDefaults,
};

export const videoPlayerArgTypes: ArgTypes<VideoPlayerArgs> = {
    ...defaultArgTypes(true),
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
};
