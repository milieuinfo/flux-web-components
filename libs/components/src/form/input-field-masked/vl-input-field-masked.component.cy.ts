import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlInputFieldMaskedComponent } from './vl-input-field-masked.component';

registerWebComponents([VlInputFieldMaskedComponent]);

describe('component - vl-input-field-masked', () => {
    it('should mount', () => {
        cy.mount(html`<vl-input-field-masked label="test-label"></vl-input-field-masked>`);

        cy.get('vl-input-field-masked').shadow().find('input');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-input-field-masked label="test-label"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.checkA11y('vl-input-field-masked');
    });

    it('should set iban mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="iban"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'iban');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('iban');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('1234567sya8901234');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', 'BE12 3456 7890 1234');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'numeric');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set rrn mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="rrn"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'rrn');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('rrn');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('123456iuh78912');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '12.34.56-789.12');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'numeric');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set uuid mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="uuid"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'uuid');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('uuid');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('1234klop5678aaaabbbbccccddddeeeeffff');
        cy.get('vl-input-field-masked')
            .shadow()
            .find('input')
            .should('have.value', '12345678-aaaa-bbbb-cccc-ddddeeeeffff');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'text');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set date mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="date"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'date');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('date');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('0206aa1991');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '02.06.1991');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'decimal');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set numerical mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="numerical"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'numerical');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('numerical');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('0200fgh99,78');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '20.099,78');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'text');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set price mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="price"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'price');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('price');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('0200sdf99,78');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '€20.099,78');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'text');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set phone mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="phone"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'phone');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('phone');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('11849gtd372');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '+32 11 84 93 72');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'numeric');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set phoneinternational mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="phoneinternational"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'phoneinternational');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('phoneinternational');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('11849372234aa');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '11849372234');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'numeric');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set mobile mask', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="mobile"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'mobile');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            // @ts-ignore: negeer aanspreken van private property
            expect(component.mask).to.equal('mobile');
        });
        cy.get('vl-input-field-masked').shadow().find('input').type('476849fwe372');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '+32 476 84 93 72');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'numeric');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should set mask prefix', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="rrn" mask-prefix="26"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'rrn');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '26.');
        cy.get('vl-input-field-masked').shadow().find('input').type('345678912');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '26.34.56-789.12');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.attr', 'inputmode', 'numeric');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should override mask prefix', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="price" mask-prefix="$"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'price');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '$');
        cy.get('vl-input-field-masked').shadow().find('input').type('9000');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '$9.000');
        cy.checkA11y('vl-input-field-masked');
    });

    it('should get raw value', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="rrn"></vl-input-field-masked>`);
        cy.injectAxe();

        cy.get('vl-input-field-masked').should('have.attr', 'mask', 'rrn');
        cy.get('vl-input-field-masked').shadow().find('input').type('12345678912');
        cy.get('vl-input-field-masked').shadow().find('input').should('have.value', '12.34.56-789.12');
        cy.runTestFor<VlInputFieldMaskedComponent>('vl-input-field-masked', (component) => {
            expect(component.getRawValue()).to.equal('12345678912');
        });
        cy.checkA11y('vl-input-field-masked');
    });

    it('should dispatch vl-input event on input', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="phone"></vl-input-field-masked>`);
        cy.injectAxe();
        cy.createStubForEvent('vl-input-field-masked', 'vl-input');

        cy.get('vl-input-field-masked').shadow().find('input').type('12345678');
        cy.get('@vl-input').its('callCount').should('eq', 8);
        cy.get('@vl-input').its('lastCall.args.0.detail').should('deep.equal', { value: '+32 12 34 56 78' });
        cy.checkA11y('vl-input-field-masked');
    });

    it('should dispatch vl-change & vl-input event on input', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="phone"></vl-input-field-masked>`);
        cy.createStubForEvent('vl-input-field-masked', 'vl-change');
        cy.createStubForEvent('vl-input-field-masked', 'vl-input');

        cy.get('vl-input-field-masked').shadow().find('input').type('12345678');
        cy.get('@vl-change').its('callCount').should('eq', 10);
        cy.get('@vl-change').its('lastCall.args.0.detail').should('deep.equal', { value: '+32 12 34 56 78' });
        // change event wordt ook gedispatched bij focus verandering, daarom 1 extra
        cy.get('@vl-input').its('callCount').should('eq', 8);
        cy.get('@vl-input').its('lastCall.args.0.detail').should('deep.equal', { value: '+32 12 34 56 78' });
    });

    it('should dispatch vl-change but not vl-input event on programmatic value change', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="rrn"></vl-input-field-masked>`);
        cy.createStubForEvent('vl-input-field-masked', 'vl-change');
        cy.createStubForEvent('vl-input-field-masked', 'vl-input');
        const value = '85.01.05-123.45';

        cy.get('vl-input-field-masked').invoke('attr', 'value', value);
        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-change').its('firstCall.args.0.detail').should('deep.equal', { value: value });
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-valid event on valid input', () => {
        cy.mount(html`<vl-input-field-masked label="test-label" mask="phone"></vl-input-field-masked>`);
        cy.injectAxe();
        cy.createStubForEvent('vl-input-field-masked', 'vl-valid');

        cy.get('vl-input-field-masked').shadow().find('input').type('12345678');
        cy.get('@vl-valid').should('have.been.calledOnce');
        cy.get('@vl-valid').its('firstCall.args.0.detail').should('deep.equal', { value: '+32 12 34 56 78' });
        cy.checkA11y('vl-input-field-masked');
    });
});
