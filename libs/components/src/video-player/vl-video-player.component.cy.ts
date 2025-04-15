import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlVideoPlayerComponent } from './vl-video-player.component';

registerWebComponents([VlVideoPlayerComponent]);

const title = 'Sprite Fright';
const source = 'https://files.vidstack.io/sprite-fight/720p.mp4';
const subtitles = 'https://files.vidstack.io/sprite-fight/subs/english.vtt';
const poster = 'https://files.vidstack.io/sprite-fight/poster.webp';

describe('component - vl-video-player', () => {
    it('should mount', () => {
        cy.mount(html`<vl-video-player source=${source}></vl-video-player>`);

        cy.get('vl-video-player').shadow().find('media-player');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-video-player source=${source}></vl-video-player>`);
        cy.injectAxe();

        cy.checkA11y('vl-video-player');
    });

    it('should set source', () => {
        cy.mount(html`<vl-video-player source=${source}></vl-video-player>`);

        cy.get('vl-video-player').shadow().find('media-provider').find('video').should('have.attr', 'src', source);
    });

    it('should set subtitles', () => {
        cy.mount(html`<vl-video-player source=${source} subtitles=${subtitles}></vl-video-player>`);

        cy.get('vl-video-player')
            .shadow()
            .find('media-provider')
            .find('video')
            .find('track')
            .should('have.attr', 'src', subtitles);
    });

    it('should set title', () => {
        cy.mount(html`<vl-video-player source=${source} title=${title}></vl-video-player>`);

        cy.get('vl-video-player')
            .shadow()
            .find('media-player')
            .should('have.attr', 'aria-label', `Video Player - ${title}`);

        cy.get('vl-video-player')
            .shadow()
            .find('media-play-button')
            .should('have.attr', 'aria-label', `Afspelen, ${title}`);
    });

    it('should set poster', () => {
        cy.mount(html`<vl-video-player source=${source} poster=${poster}></vl-video-player>`);

        cy.get('vl-video-player')
            .shadow()
            .find('media-player')
            .find('div.plyr__poster')
            .should('have.attr', 'style', `background-image: url("${poster}");`);
    });
});
