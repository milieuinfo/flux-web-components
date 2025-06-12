const textareaRichDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-textarea-rich--textarea-rich-default&viewMode=story';
const textareaRichToolbarUrl =
    'http://localhost:8080/iframe.html?id=components-form-textarea-rich--textarea-rich-toolbar&viewMode=story';
const textareaRichPluginsUrl =
    'http://localhost:8080/iframe.html?id=components-form-textarea-rich--textarea-rich-plugins&viewMode=story';

describe('story - vl-textarea-rich - default', () => {
    it('should render', () => {
        cy.visit(textareaRichDefaultUrl);

        cy.get('vl-textarea-rich').shadow().find('textarea');
    });
});

describe('story - vl-textarea-rich - custom toolbar', () => {
    it('should render', () => {
        cy.visit(textareaRichToolbarUrl);

        cy.get('vl-textarea-rich').shadow().find('textarea');
    });
});

describe('story - vl-textarea-rich - custom plugins', () => {
    it('should render', () => {
        cy.visit(textareaRichPluginsUrl);

        cy.get('vl-textarea-rich').shadow().find('textarea');
    });
});
