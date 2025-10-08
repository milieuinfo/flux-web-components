import { hexToString } from '@domg-wc/common';

const iconDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-atom-icon-style--icon-style-default&viewMode=story';

describe('cypress-e2e - atom components - vl-icon-style - default story', () => {
    it('should render', () => {
        cy.visit(iconDefaultUrl);

        cy.get('.sb-icon')
            .first()
            .find('div')
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('icon - default');
            });

        // het paperplane icon is gespecifieerd als
        // .vl-icon--paperplane::before {
        //     content: '\F231';
        // }
        cy.get('.vl-icon--paperplane').shouldHaveComputedStyle({
            style: 'content',
            value: hexToString('0x22 0xF231 0x22'),
            pseudo: '::before',
        });
    });
});
