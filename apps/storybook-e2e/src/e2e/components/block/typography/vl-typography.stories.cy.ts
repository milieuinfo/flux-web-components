const typographyParagraphUrl =
    'http://localhost:8080/iframe.html?id=components-block-typography--typography-default&viewMode=story';
const typographyHeadingsUrl =
    'http://localhost:8080/iframe.html?id=components-block-typography--typography-titles&viewMode=story';
const typographyMarkupUrl =
    'http://localhost:8080/iframe.html?id=components-block-typography--typography-markup&viewMode=story';
const typographyTableUrl =
    'http://localhost:8080/iframe.html?id=components-block-typography--typography-table&viewMode=story';

describe('story vl-typography', () => {
    it('should contain a styled paragraph', () => {
        cy.visit(`${typographyParagraphUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('p')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '18px')
            .should('have.css', 'font-weight', '400')
            .should('have.css', 'margin-bottom', '18px');
    });

    it('should contain a styled link inside a paragraph', () => {
        cy.visit(`${typographyParagraphUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('p > a')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '18px')
            .should('have.css', 'font-weight', '400')
            .should('have.css', 'color', 'rgb(0, 85, 204)');
    });

    it('should contain a styled h1', () => {
        cy.visit(`${typographyHeadingsUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('h1')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '40px')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'margin-bottom', '45px')
            .contains('Heading 1');
    });

    it('should contain a styled h2', () => {
        cy.visit(`${typographyHeadingsUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('h2')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '32px')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'margin-bottom', '20px')
            .contains('Heading 2');
    });

    it('should contain a styled h3', () => {
        cy.visit(`${typographyHeadingsUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('h3')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '26px')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'margin-bottom', '20px')
            .contains('Heading 3');
    });

    it('should contain a styled h4', () => {
        cy.visit(`${typographyHeadingsUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('h4')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '22px')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'margin-bottom', '18px')
            .contains('Heading 4');
    });

    it('should contain a styled h5', () => {
        cy.visit(`${typographyHeadingsUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('h5')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '20px')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'margin-bottom', '16px')
            .contains('Heading 5');
    });

    it('should contain a styled h6', () => {
        cy.visit(`${typographyHeadingsUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('h6')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '18px')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'margin-bottom', '14px')
            .contains('Heading 6');
    });

    it('should contain a styled strong and bold tag', () => {
        cy.visit(`${typographyMarkupUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('strong')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-weight', '500')
            .contains('strong-tag');

        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('b')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-weight', '500')
            .contains('b-tag');
    });

    it('should contain a styled em and italic tag', () => {
        cy.visit(`${typographyMarkupUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('em')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-style', 'italic')
            .contains('em-tag');

        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('i')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-style', 'italic')
            .contains('i-tag');
    });

    it('should contain a styled line-through (s) tag', () => {
        cy.visit(`${typographyMarkupUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('s')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'text-decoration', 'line-through solid rgb(51, 51, 50)')
            .contains('s-tag');
    });

    it('should contain a styled mark tag', () => {
        cy.visit(`${typographyMarkupUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('mark')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'box-shadow', 'rgba(255, 197, 21, 0.3) 0px -10px 0px 0px inset')
            .contains('mark-tag');
    });

    it('should contain a styled code tag', () => {
        cy.visit(`${typographyMarkupUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('code')
            .should('have.css', 'font-family', 'monospace')
            .should(
                'have.css',
                'background',
                'rgb(232, 235, 238) none repeat scroll 0% 0% / auto padding-box border-box'
            )
            .should('have.css', 'padding', '2px')
            .contains('code-tag');
    });

    it('should contain a styled pre tag', () => {
        cy.visit(`${typographyMarkupUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('pre')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'background', 'rgb(51, 51, 50) none repeat scroll 0% 0% / auto padding-box border-box')
            .should('have.css', 'color', 'rgb(255, 255, 255)')
            .should('have.css', 'white-space', 'pre')
            .should('have.css', 'padding', '15px')
            .contains('pre-tag');
    });

    it('should contain a styled blockquote tag', () => {
        cy.visit(`${typographyMarkupUrl}`);
        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('blockquote')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-size', '34px')
            .should('have.css', 'padding-left', '90px')
            .should('have.css', 'margin-bottom', '20px')
            .contains('Lorem ipsum dolor sit amet.');
    });

    it('should contain a styled table', () => {
        cy.visit(`${typographyTableUrl}`);

        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('table thead tr')
            .should('have.css', 'border-bottom', '3px solid rgb(203, 210, 218)');

        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('table tbody tr')
            .should('have.css', 'border-bottom', '1px solid rgb(203, 210, 218)');

        cy.getDataCy('typography')
            .shadow()
            .find('div.vl-typography')
            .find('table thead tr th')
            .should('have.css', 'font-family', '"Flanders Art Sans", sans-serif')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'font-size', '16px')
            .should('have.css', 'padding', '12px 10px')
            .should('have.css', 'vertical-align', 'top')
            .contains('head 1');
    });
});
