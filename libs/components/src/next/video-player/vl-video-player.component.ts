import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext } from '@domg-wc/common-utilities/css';
import { CSSResult, html, PropertyDeclarations, PropertyValues } from 'lit';
import { TextTrackInit } from 'vidstack';
import { MediaPlayerElement } from 'vidstack/elements';
import { PlyrLayout, VidstackPlayer } from 'vidstack/global/player';
import videoPlayerStyles from './vl-video-player.css';
import { plyrTranslations } from './vl-video-player.translations';

@globalStylesNext()
@webComponent('vl-video-player-next')
export class VlVideoPlayerComponent extends BaseLitElement {
    private playerInstance: MediaPlayerElement | undefined;
    private poster: string | undefined;
    private source: string | undefined;
    private subtitles: string | undefined;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [...videoPlayerStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            title: { type: String },
            poster: { type: String },
            source: { type: String },
            subtitles: { type: String },
        };
    }

    protected async firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);

        const subtitleTrack: TextTrackInit = {
            src: this.subtitles,
            label: 'Nederlands',
            language: 'nl-BE',
            kind: 'subtitles',
            default: true,
        };
        const video = this.shadowRoot?.querySelector('video');
        if (!video) {
            return;
        }
        this.playerInstance = await VidstackPlayer.create({
            target: video,
            title: this.title,
            src: this.source,
            poster: this.poster,
            layout: new PlyrLayout({ translations: plyrTranslations, clickToPlay: true }),
        });
        this.playerInstance?.textTracks.add(subtitleTrack);
    }

    render() {
        return html`
            <div>
                <video controls crossorigin playsinline></video>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-video-player-next': VlVideoPlayerComponent;
    }
}
