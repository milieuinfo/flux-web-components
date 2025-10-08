const stories = [
    'default',
    'group-by-subtitle',
    'without-suggestions',
    'custom-caption-formatter',
    'input-and-api-call',
    'input-and-mocked-api-call',
    'without-suggestions',
    'in-side-sheet',
];
stories.forEach((storyName) => {
    describe(`cypress-e2e - block components - vl-autocomplete - ${storyName} story`, () => {
        it(`should display story - ${storyName}`, () => {
            const urlForStory = `http://localhost:8080/iframe.html?id=components-block-autocomplete--autocomplete-${storyName}&viewMode=story`;
            cy.visit(urlForStory);

            cy.get('vl-autocomplete').shadow().find('input');
        });
    });
});
