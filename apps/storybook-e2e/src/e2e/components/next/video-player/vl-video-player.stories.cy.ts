const videoPlayerNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-video-player--video-player-default&viewMode=story';

describe('story - vl-video-player - default', () => {
    it('should render', () => {
        cy.visit(videoPlayerNextDefaultUrl);

        cy.get('vl-video-player').shadow();
    });
});
