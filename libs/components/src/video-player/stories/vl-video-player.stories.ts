import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-video-player.component';
import { VideoPlayerArgs, videoPlayerArgs, videoPlayerArgTypes } from './vl-video-player.stories-arg';
import videoPlayerDoc from './vl-video-player.stories-doc.mdx';

export default {
    id: 'components-video-player',
    title: 'Components/video-player',
    tags: ['autodocs'],
    args: videoPlayerArgs,
    argTypes: videoPlayerArgTypes,
    parameters: {
        docs: {
            page: videoPlayerDoc,
        },
    },
} as Meta<VideoPlayerArgs>;

export const VideoPlayerDefault = story<VideoPlayerArgs>(
    videoPlayerArgs,
    ({ source, subtitles, poster, title }) => html`
        <vl-video-player title=${title} source=${source} subtitles=${subtitles} poster=${poster}> </vl-video-player>
    `
);
VideoPlayerDefault.storyName = 'vl-video-player - default';
VideoPlayerDefault.args = {
    title: 'Sprite Fright',
    source: 'https://files.vidstack.io/sprite-fight/720p.mp4',
    subtitles: 'https://files.vidstack.io/sprite-fight/subs/english.vtt',
    poster: 'https://files.vidstack.io/sprite-fight/poster.webp',
};
