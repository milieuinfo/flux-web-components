import { html } from 'lit';
import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';
import '../bootstrap/vds-scale-compensation.css';
import './flux-pill.component';
import './flux-accordion.component';
import './flux-alert.component';
import './flux-separator.component';
import './flux-tabs.component';
import './flux-table.component';
import './flux-vds-only.component';
import './flux-input.component';
import './flux-button.component';

defineAll('vds');

const inner = (el: Element): Element => el.shadowRoot!.firstElementChild!;

describe('FLUX-704 - nieuwe VDS 0.15-componenten achter de flux-API', () => {
    it('flux-pill delegeert per mode naar de juiste VDS-tag en mapt type op status', () => {
        cy.mount(html`
            <flux-pill type="error">a</flux-pill>
            <flux-pill closable>b</flux-pill>
            <flux-pill checkable>c</flux-pill>
            <flux-pill clickable>d</flux-pill>
        `);
        cy.get('flux-pill').should(($p) => {
            const tags = [...$p].map((p) => p.shadowRoot?.firstElementChild?.localName);
            expect(tags).to.deep.eq(['vds-informative-tag', 'vds-removable-tag', 'vds-selectable-tag', 'vds-clickable-tag']);
            expect(inner($p[0]).getAttribute('status')).to.eq('error');
        });
    });

    it('flux-pill vertaalt de VDS-events naar close en check', () => {
        cy.mount(html`<flux-pill closable>b</flux-pill><flux-pill checkable>c</flux-pill>`);
        const events: string[] = [];
        cy.get('flux-pill[checkable]').should(($p) => expect(inner($p[0]).shadowRoot?.querySelector('[part="base"]')).to.exist);
        cy.get('flux-pill[closable]').should(($p) => expect(inner($p[0]).shadowRoot?.querySelector('button')).to.exist);
        cy.get('flux-pill[closable]').then(($p) => $p[0].addEventListener('close', () => events.push('close')));
        cy.get('flux-pill[checkable]').then(($p) =>
            $p[0].addEventListener('check', (e) => events.push(`check:${(e as CustomEvent).detail.checked}`))
        );
        cy.get('flux-pill[closable]').then(($p) => (inner($p[0]).shadowRoot!.querySelector('button') as HTMLElement).click());
        cy.get('flux-pill[checkable]').then(($p) =>
            (inner($p[0]).shadowRoot!.querySelector('[part="base"]') as HTMLElement).click()
        );
        cy.wrap(events).should('deep.eq', ['close', 'check:true']);
    });

    it('flux-accordion mapt heading-level, toggle-teksten en vuurt vl-on-toggle', () => {
        cy.mount(html`<flux-accordion heading-level="2" open-toggle-text="Toon" close-toggle-text="Verberg"
            >Inhoud</flux-accordion
        >`);
        const events: boolean[] = [];
        cy.get('flux-accordion').should('have.prop', 'level', 'h2');
        cy.get('flux-accordion').then(($a) => {
            const acc = $a[0] as HTMLElement & { level: string; toggle(): void };
            expect(acc.querySelector('[slot="content"]')?.textContent).to.eq('Inhoud');
            acc.addEventListener('vl-on-toggle', (e) => events.push((e as CustomEvent).detail.open));
            acc.toggle();
        });
        cy.get('flux-accordion [data-flux-owned="trigger"]').should('have.text', 'Verberg');
        cy.wrap(events).should('deep.eq', [true]);
    });

    it('flux-alert mapt error op danger en zet title/message in de VDS-slots', () => {
        cy.mount(html`<flux-alert type="error" title="Fout" message="Er ging iets mis."></flux-alert>`);
        cy.get('flux-alert').should('have.prop', 'status', 'danger');
        cy.get('flux-alert [slot="title"]').should('have.text', 'Fout');
        cy.get('flux-alert [slot="body"]').should('have.text', 'Er ging iets mis.');
    });

    it('flux-separator mapt wave en slash op appearance', () => {
        cy.mount(html`<flux-separator wave></flux-separator><flux-separator slash></flux-separator>`);
        cy.get('flux-separator[wave]').should('have.prop', 'appearance', 'wave');
        cy.get('flux-separator[slash]').should('have.prop', 'appearance', 'tilt');
    });

    it('flux-tabs bouwt tab + tabpanel per pane en vuurt change', () => {
        cy.mount(html`<flux-tabs active-tab="a">
            <flux-tabs-pane id="a" title="A">pa</flux-tabs-pane>
            <flux-tabs-pane id="b" title="B">pb</flux-tabs-pane>
        </flux-tabs>`);
        const events: string[] = [];
        cy.get('flux-tabs').should(($t) => expect($t[0].shadowRoot?.firstElementChild?.children.length).to.eq(4));
        cy.get('flux-tabs').then(($t) => {
            $t[0].addEventListener('change', (e) => events.push((e as CustomEvent).detail.activeTab));
            const tabs = inner($t[0]);
            expect([...tabs.children].map((c) => c.localName)).to.deep.eq([
                'vds-tab',
                'vds-tab',
                'vds-tabpanel',
                'vds-tabpanel',
            ]);
            (tabs.querySelector('#b') as HTMLElement).click();
        });
        cy.wrap(events).should('deep.eq', ['b']);
    });

    it('flux-table stylet zijn eigen table en laat geen vl-table-sheet achter in het document', () => {
        cy.mount(html`<flux-table>
            <table>
                <caption>
                    Test
                </caption>
                <thead>
                    <tr>
                        <th scope="col">A</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </flux-table>`);
        cy.get('flux-table td').should(($td) => {
            expect(getComputedStyle($td[0]).paddingTop).to.not.eq('0px');
        });
        cy.document().then((doc) => {
            const leaked = doc.adoptedStyleSheets.filter((sheet) =>
                [...sheet.cssRules].some((r) => /(^|[\s,(])vl-table table\b/.test((r as CSSStyleRule).selectorText ?? ''))
            );
            expect(leaked, 'geen gelekte vl-table-sheet').to.have.length(0);
        });
    });

    it('flux-markdown zet markdown om naar HTML in de flux-typografie', () => {
        cy.mount(html`<flux-markdown content=${'## Titel\n\nTekst met `code`'}></flux-markdown>`);
        cy.get('flux-markdown').should(($m) => {
            const content = $m[0].shadowRoot!.querySelector('[part~="content"]')!;
            const h2 = content.querySelector('h2');
            expect(h2?.textContent).to.eq('Titel');
            expect(content.classList.contains('vl-typography'), 'klasse vl-typography').to.eq(true);
            expect(getComputedStyle(h2!).fontWeight).to.eq('500');
            expect(getComputedStyle(content.querySelector('code')!).color, 'geen VDS-codekleur').to.not.eq('rgb(183, 21, 97)');
        });
    });

    it('flux-markdown in bare toont de rauwe VDS-styling', () => {
        cy.mount(html`<flux-markdown bare content=${'Tekst met `code`'}></flux-markdown>`);
        cy.get('flux-markdown').should(($m) => {
            const content = $m[0].shadowRoot!.querySelector('[part~="content"]')!;
            expect(content.classList.contains('vl-typography')).to.eq(false);
            expect(getComputedStyle(content.querySelector('code')!).color).to.eq('rgb(183, 21, 97)');
        });
    });

    it('flux-input-group: knop na het veld heeft enkel rechts afgeronde hoeken', () => {
        cy.mount(html`<flux-input-group label="Locatie">
            <flux-input></flux-input>
            <flux-button slot="after" secondary>Zoeken</flux-button>
        </flux-input-group>`);
        cy.get('flux-button')
            .shadow()
            .find('[part="button"]')
            .should(($b) => {
                const cs = getComputedStyle($b[0]);
                expect(cs.borderTopLeftRadius).to.eq('0px');
                expect(cs.borderTopRightRadius).to.not.eq('0px');
            });
    });
});
