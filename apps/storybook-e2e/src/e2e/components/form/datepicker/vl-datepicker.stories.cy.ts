['default', 'min-date-and-max-date', 'static', 'range', 'time', 'date-time'].forEach((story) => {
    describe(`story - vl-datepicker - ${story}`, () => {
        it('should render', () => {
            cy.visit(
                `http://localhost:8080/iframe.html?args=&id=components-form-datepicker--datepicker-${story}&viewMode=story`
            );

            cy.get('vl-datepicker').shadow();
        });
    });
});
