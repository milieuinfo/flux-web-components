import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlCheckboxComponent } from '../checkbox/vl-checkbox.component';
import { VlCheckboxGroupComponent } from './vl-checkbox-group.component';

registerWebComponents([VlCheckboxComponent, VlCheckboxGroupComponent]);

const clickCheckboxWithValue = (value: string) => {
    cy.get(`vl-checkbox[value="${value}"]`).shadow().find('input').click({ force: true });
};

describe('vl-checkbox-group - properties & states', () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });

    it('should mount', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);

        cy.get('vl-checkbox-group').shadow();
    });

    it('should be accessible', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-checkbox-group');
    });

    it('should have checked children when checked attribute is set on child', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets" checked>Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus" checked>Bus</vl-checkbox>
            </vl-checkbox-group>
        `);

        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').should('have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="auto"]').should('not.have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="bus"]').should('have.attr', 'checked');
    });

    it('should reflect initial values in the values property', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets" checked>Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus" checked>Bus</vl-checkbox>
            </vl-checkbox-group>
        `);

        cy.get('vl-checkbox-group').runTest((group) => {
            expect((group as VlCheckboxGroupComponent).values).to.deep.equal(['fiets', 'bus']);
        });
    });

    it('should propagate disabled to all checkboxes', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);
        cy.injectAxe();

        cy.get('vl-checkbox-group').invoke('attr', 'disabled', '');
        cy.checkA11y('vl-checkbox-group');

        cy.get('vl-checkbox').each(($cb) => {
            cy.wrap($cb).should('have.attr', 'disabled');
        });
    });

    it('should propagate error to all checkboxes', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);

        cy.get('vl-checkbox-group').invoke('attr', 'error', '');

        cy.get('vl-checkbox').each(($cb) => {
            cy.wrap($cb).should('have.attr', 'error');
        });
    });

    it('should propagate success to all checkboxes', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);
        cy.injectAxe();

        cy.get('vl-checkbox-group').invoke('attr', 'success', '');
        cy.checkA11y('vl-checkbox-group');

        cy.get('vl-checkbox').each(($cb) => {
            cy.wrap($cb).should('have.attr', 'success');
        });
    });

    it('should propagate block to all checkboxes', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);

        cy.get('vl-checkbox-group').invoke('attr', 'block', '');

        cy.get('vl-checkbox').each(($cb) => {
            cy.wrap($cb).shadow().find('.vl-checkbox').should('have.class', 'vl-checkbox--block');
        });
    });

    it('should prevent checking when readonly', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel" readonly>
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);
        cy.injectAxe();

        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').shadow().find('input').click({ force: true });
        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').should('not.have.attr', 'checked');
        cy.checkA11y('vl-checkbox-group');
    });
});

describe('vl-checkbox-group - multi-select interaction', () => {
    it('should allow checking multiple checkboxes', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);

        clickCheckboxWithValue('fiets');
        clickCheckboxWithValue('bus');

        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').should('have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="auto"]').should('not.have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="bus"]').should('have.attr', 'checked');
    });

    it('should update values property when checkboxes are toggled', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
                <vl-checkbox value="bus">Bus</vl-checkbox>
            </vl-checkbox-group>
        `);

        clickCheckboxWithValue('fiets');
        clickCheckboxWithValue('auto');

        cy.get('vl-checkbox-group').runTest((group) => {
            expect((group as VlCheckboxGroupComponent).values).to.include('fiets');
            expect((group as VlCheckboxGroupComponent).values).to.include('auto');
            expect((group as VlCheckboxGroupComponent).values).not.to.include('bus');
        });

        clickCheckboxWithValue('fiets');

        cy.get('vl-checkbox-group').runTest((group) => {
            expect((group as VlCheckboxGroupComponent).values).not.to.include('fiets');
            expect((group as VlCheckboxGroupComponent).values).to.include('auto');
        });
    });

    it('should allow unchecking a checked checkbox', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets" checked>Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
            </vl-checkbox-group>
        `);

        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').should('have.attr', 'checked');

        clickCheckboxWithValue('fiets');

        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').should('not.have.attr', 'checked');
    });
});

describe('vl-checkbox-group - events', () => {
    it('should dispatch vl-change event when a checkbox is toggled', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
            </vl-checkbox-group>
        `);

        cy.createStubForEvent('vl-checkbox-group', 'vl-change');

        clickCheckboxWithValue('fiets');

        cy.get('@vl-change').should('have.been.calledOnce');
        cy.get('@vl-change')
            .its('firstCall.args.0.detail')
            .should('deep.include', { checked: true, value: 'fiets' });
    });

    it('should dispatch vl-input event when a user clicks a checkbox', () => {
        cy.mount(html`
            <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                <vl-checkbox value="fiets">Fiets</vl-checkbox>
                <vl-checkbox value="auto">Auto</vl-checkbox>
            </vl-checkbox-group>
        `);

        cy.createStubForEvent('vl-checkbox-group', 'vl-input');

        clickCheckboxWithValue('auto');

        cy.get('@vl-input').should('have.been.calledOnce');
    });
});

describe('vl-checkbox-group - in form', () => {
    it('should work inside a form', () => {
        cy.mount(html`
            <form>
                <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                    <vl-checkbox value="fiets">Fiets</vl-checkbox>
                    <vl-checkbox value="auto">Auto</vl-checkbox>
                    <vl-checkbox value="bus">Bus</vl-checkbox>
                </vl-checkbox-group>
            </form>
        `);

        clickCheckboxWithValue('fiets');
        clickCheckboxWithValue('bus');

        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').should('have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="auto"]').should('not.have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="bus"]').should('have.attr', 'checked');
    });

    it('should reset to initial checked state when the form is reset', () => {
        cy.mount(html`
            <form>
                <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel">
                    <vl-checkbox value="fiets" checked>Fiets</vl-checkbox>
                    <vl-checkbox value="auto">Auto</vl-checkbox>
                    <vl-checkbox value="bus">Bus</vl-checkbox>
                </vl-checkbox-group>
                <button class="vl-button" type="reset">Reset</button>
            </form>
        `);

        clickCheckboxWithValue('auto');
        clickCheckboxWithValue('fiets');

        cy.get('vl-checkbox-group').find('vl-checkbox[value="auto"]').should('have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').should('not.have.attr', 'checked');

        cy.get('button[type="reset"]').click();

        cy.get('vl-checkbox-group').find('vl-checkbox[value="fiets"]').should('have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="auto"]').should('not.have.attr', 'checked');
        cy.get('vl-checkbox-group').find('vl-checkbox[value="bus"]').should('not.have.attr', 'checked');
    });

    it('should fail required validation when no checkbox is checked', () => {
        cy.mount(html`
            <form>
                <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel" required>
                    <vl-checkbox value="fiets">Fiets</vl-checkbox>
                    <vl-checkbox value="auto">Auto</vl-checkbox>
                </vl-checkbox-group>
                <vl-form-message for="vervoer" state="valueMissing">Selecteer minstens één optie.</vl-form-message>
                <button class="vl-button" type="submit">Verstuur</button>
            </form>
        `);
        cy.injectAxe();

        cy.get('button[type="submit"]').click();

        cy.get('vl-checkbox-group').runTest((group) => {
            expect((group as VlCheckboxGroupComponent).validity.valid).to.be.false;
        });
        cy.checkA11y('vl-checkbox-group');
    });

    it('should pass required validation when at least one checkbox is checked', () => {
        cy.mount(html`
            <form>
                <vl-checkbox-group id="vervoer" name="vervoer" label="Vervoersmiddel" required>
                    <vl-checkbox value="fiets">Fiets</vl-checkbox>
                    <vl-checkbox value="auto">Auto</vl-checkbox>
                </vl-checkbox-group>
                <button class="vl-button" type="submit">Verstuur</button>
            </form>
        `);

        clickCheckboxWithValue('fiets');

        cy.get('vl-checkbox-group').runTest((group) => {
            expect((group as VlCheckboxGroupComponent).validity.valid).to.be.true;
        });
    });
});
