['default', 'min-date-and-max-date', 'static', 'range', 'time', 'date-time'].forEach((story) => {
    describe(`story - vl-datepicker-next - ${story}`, () => {
        it('should render', () => {
            cy.visit(
                `http://localhost:8080/iframe.html?args=&id=form-next-datepicker--datepicker-${story}&viewMode=story`
            );

            cy.get('vl-datepicker-next').shadow();
        });
    });
});
