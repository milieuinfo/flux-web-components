['default', 'min-date-and-max-date', 'static', 'range', 'time', 'date-time'].forEach((story) => {
    describe(`cypress-e2e - form components - vl-datepicker - ${story} story`, () => {
        it('should render', () => {
            cy.visit(
                `http://localhost:8080/iframe.html?args=&id=components-form-datepicker--datepicker-${story}&viewMode=story`
            );

            cy.get('vl-datepicker').shadow();
        });
    });
});
