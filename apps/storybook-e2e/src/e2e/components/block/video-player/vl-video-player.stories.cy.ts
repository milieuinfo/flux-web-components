const videoPlayerDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-video-player--video-player-default&viewMode=story';

describe('cypress-e2e - block components - vl-video-player - default story', () => {
    it('should render', () => {
        cy.visit(videoPlayerDefaultUrl);

        cy.get('vl-video-player').shadow();
    });
});
