import { hexToString } from '@domg-wc/common-utilities';

const iconNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-next-base-intern-icon--icon-default&viewMode=story';

describe('story - icon-next - default', () => {
    it('should render', () => {
        cy.visit(iconNextDefaultUrl);

        cy.get('.sb-icon')
            .first()
            .find('div')
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('icon - default');
            });

        // het bike icon is gespecifieerd als
        // .vl-icon--bike::before {
        //     content: '\F12D';
        // }
        cy.get('.vl-icon--bike').shouldHaveComputedStyle({
            style: 'content',
            value: hexToString('0x22 0xF12D 0x22'),
            pseudo: '::before',
        });
    });
});
