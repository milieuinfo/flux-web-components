import { FluxConfig, registerWebComponents } from '@domg-wc/common';
import { html, render, TemplateResult } from 'lit';
import { VlButtonComponent } from '../../atom/button';
import { VlAlert } from '../alert/vl-alert.component';
import { VlProzaMessage } from './vl-proza-message.component';
import { vlProza, VlProzaOptions } from './vl-proza.directive';

registerWebComponents([VlAlert, VlButtonComponent]);

describe('cypress-component - block components - vlProza directive', () => {
    const mockDomain = 'test-domain';

    const stubFetch = (responses: Record<string, { code: string; tekst: string }>) => {
        cy.window().then((win) => {
            cy.stub(win, 'fetch').callsFake((uri: string) => {
                const matchingKey = Object.keys(responses).find((key) => uri.includes(key));
                if (matchingKey) {
                    return Promise.resolve(
                        new win.Response(JSON.stringify(responses[matchingKey]), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        })
                    );
                }
                return Promise.resolve(
                    new win.Response(JSON.stringify({ create: false, read: true, update: false, delete: false }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    })
                );
            });
        });
    };

    const stubDeferredFetch = () => {
        const answers: Record<string, { promise: Promise<string>; resolve: (tekst: string) => void }> = {};
        const answerFor = (code: string) => {
            if (!answers[code]) {
                let resolve: (tekst: string) => void = () => undefined;
                const promise = new Promise<string>((resolvePromise) => (resolve = resolvePromise));
                answers[code] = { promise, resolve };
            }
            return answers[code];
        };
        cy.window().then((win) => {
            cy.stub(win, 'fetch').callsFake((uri: string) => {
                const code = uri.split('/').pop() ?? '';
                return answerFor(code).promise.then(
                    (tekst) =>
                        new win.Response(JSON.stringify({ code, tekst }), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        })
                );
            });
        });
        return (code: string, tekst: string) =>
            cy.then(async () => {
                answerFor(code).resolve(tekst);
                await VlProzaMessage.getMessage(mockDomain, code, null);
                // een macrotask later heeft ook de directive, die op dezelfde promise wacht, het antwoord verwerkt
                await new Promise((resolve) => setTimeout(resolve));
            });
    };

    // Eén html-literal per binding: twee aparte literals geven Lit een ander template, dus een nieuwe
    // directive-instantie, en dan test een tweede render() geen re-render van de host.
    const bindings: {
        name: string;
        selector: string;
        code: string;
        tekst: string;
        prefix: string;
        template: (code: string, options?: VlProzaOptions) => TemplateResult;
        read: (element: HTMLElement) => string | null;
    }[] = [
        {
            name: 'an attribute',
            selector: 'vl-alert',
            code: 'alert.titel',
            tekst: 'Opgelet!',
            prefix: '',
            template: (code, options) =>
                html`<vl-alert icon="warning" title-label=${vlProza(code, options)} type="warning"></vl-alert>`,
            read: (element) => element.getAttribute('title-label'),
        },
        {
            name: 'an attribute with static text around the expression',
            selector: 'vl-alert',
            code: 'alert.titel',
            tekst: 'Opgelet!',
            prefix: 'Melding: ',
            template: (code, options) =>
                html`<vl-alert
                    icon="warning"
                    title-label="Melding: ${vlProza(code, options)}"
                    type="warning"
                ></vl-alert>`,
            read: (element) => element.getAttribute('title-label'),
        },
        {
            name: 'the text of an element',
            selector: 'vl-button',
            code: 'actie.bewaren',
            tekst: 'Bewaren',
            prefix: '',
            template: (code, options) => html`<vl-button>${vlProza(code, options)}</vl-button>`,
            read: (element) => element.textContent,
        },
    ];

    // cy.mount rendert in de parent van het element: in die container rendert de host opnieuw
    const rerender = (element: HTMLElement, template: TemplateResult) =>
        render(template, element.parentElement as HTMLElement);

    beforeEach(() => {
        VlProzaMessage.clearCache();
        FluxConfig['preferences'] = { ...FluxConfig.getPreferences(), prozaDomain: mockDomain };
    });

    it('should resolve a proza message in a title attribute', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'Opgelet!' },
        });

        cy.mount(html` <vl-alert data-cy="alert" icon="warning" title=${vlProza('alert.titel')} type="warning">
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Opgelet!');
    });

    it('should show the fallback value while loading', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'Opgelet!' },
        });

        cy.mount(html` <vl-alert
            data-cy="alert"
            icon="warning"
            title=${vlProza('alert.titel', { fallback: 'Laden...' })}
            type="warning"
        >
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Opgelet!');
    });

    it('should strip HTML tags from the message', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: {
                code: 'alert.titel',
                tekst: '<p>Dit is een <b>belangrijke</b> melding.</p>',
            },
        });

        cy.mount(html` <vl-alert data-cy="alert" icon="warning" title=${vlProza('alert.titel')} type="warning">
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Dit is een belangrijke melding.');
    });

    it('should resolve a proza message as the text of a button without nested buttons', () => {
        stubFetch({
            [`${mockDomain}/actie.bewaren`]: { code: 'actie.bewaren', tekst: '<b>Bewaren</b>' },
        });

        cy.mount(html`<vl-button>${vlProza('actie.bewaren')}</vl-button>`);

        cy.get('vl-button').should('have.text', 'Bewaren');
        cy.get('vl-button').children().should('not.exist');
    });

    it('should replace template parameters', () => {
        stubFetch({
            [`${mockDomain}/welkom.titel`]: {
                code: 'welkom.titel',
                tekst: '<p>Welkom, ${parameter.naam}!</p>',
            },
        });

        cy.mount(html` <vl-alert
            data-cy="alert"
            icon="user"
            title=${vlProza('welkom.titel', { parameters: { naam: 'Jan' } })}
            type="success"
        >
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Welkom, Jan!');
    });

    it('should use the domain from options when provided', () => {
        const otherDomain = 'other-domain';

        stubFetch({
            [`${otherDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'Ander domein titel' },
        });

        cy.mount(html` <vl-alert
            data-cy="alert"
            icon="info-circle"
            title=${vlProza('alert.titel', { domain: otherDomain })}
            type="info"
        >
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'Ander domein titel');
    });

    it('should use prozaDomain from FluxConfig as default', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'FluxConfig domein' },
        });

        cy.mount(html` <vl-alert data-cy="alert" icon="warning" title=${vlProza('alert.titel')} type="warning">
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'FluxConfig domein');
    });

    it('should fallback to FluxConfig prozaDomain when options.domain is an empty string', () => {
        stubFetch({
            [`${mockDomain}/alert.titel`]: { code: 'alert.titel', tekst: 'FluxConfig domein (via empty override)' },
        });

        cy.mount(html` <vl-alert
            data-cy="alert"
            icon="warning"
            title=${vlProza('alert.titel', { domain: '' })}
            type="warning"
        >
        </vl-alert>`);

        cy.get('vl-alert').shadow().find('#title').should('contain.text', 'FluxConfig domein (via empty override)');
    });

    it('should throw an error when no domain is configured', () => {
        FluxConfig['preferences'] = { ...FluxConfig.getPreferences(), prozaDomain: undefined };

        Cypress.once('fail', (err) => {
            expect(err.message).to.contain('[vlProza] Geen domein opgegeven');
            return false;
        });

        cy.mount(html` <vl-alert data-cy="alert" icon="warning" title=${vlProza('alert.titel')} type="warning">
        </vl-alert>`);
    });

    bindings.forEach(({ name, selector, code, tekst, prefix, template, read }) => {
        const shouldShow = (expected: string) =>
            cy.get(selector).should(($element) => expect(read($element[0])).to.equal(`${prefix}${expected}`));

        it(`should keep the resolved message in ${name} after a re-render with the same arguments`, () => {
            stubFetch({ [`${mockDomain}/${code}`]: { code, tekst } });
            cy.spy(VlProzaMessage, 'getMessage').as('getMessage');

            cy.mount(template(code));
            shouldShow(tekst);

            cy.get(selector).then(($element) => {
                rerender($element[0], template(code));
                // synchroon na render(): ook een korte flits van de code doet de test falen
                expect(read($element[0])).to.equal(`${prefix}${tekst}`);
            });
            cy.get('@getMessage').should('have.been.calledOnce');
        });

        it(`should keep an empty message in ${name} after a re-render with the same arguments`, () => {
            stubFetch({ [`${mockDomain}/${code}`]: { code, tekst: '' } });

            cy.mount(template(code));
            shouldShow('');

            cy.get(selector).then(($element) => {
                rerender($element[0], template(code));
                expect(read($element[0])).to.equal(prefix);
            });
        });

        it(`should show a changed fallback in ${name} while loading and the message afterwards`, () => {
            const respond = stubDeferredFetch();

            cy.mount(template(code, { fallback: 'Laden...' }));
            cy.get(selector).then(($element) => {
                expect(read($element[0])).to.equal(`${prefix}Laden...`);
                rerender($element[0], template(code, { fallback: 'Even geduld...' }));
                expect(read($element[0])).to.equal(`${prefix}Even geduld...`);
            });

            respond(code, tekst);
            cy.get(selector).then(($element) => {
                expect(read($element[0])).to.equal(`${prefix}${tekst}`);
                rerender($element[0], template(code, { fallback: 'Laden...' }));
                expect(read($element[0])).to.equal(`${prefix}${tekst}`);
            });
        });

        it(`should show the new message in ${name} after a change of the parameters in the same object`, () => {
            stubFetch({ [`${mockDomain}/${code}`]: { code, tekst: 'Welkom, ${parameter.naam}!' } });
            const parameters = { naam: 'Jan' };

            cy.mount(template(code, { parameters }));
            shouldShow('Welkom, Jan!');

            cy.get(selector).then(($element) => {
                parameters.naam = 'An';
                rerender($element[0], template(code, { parameters }));
                expect(read($element[0])).to.equal(`${prefix}${code}`);
            });
            shouldShow('Welkom, An!');
        });

        const otherDomain = 'other-domain';
        const otherBaseUrl = 'https://proza.example/';
        const changes: {
            argument: string;
            responses: Record<string, { code: string; tekst: string }>;
            first: [string, VlProzaOptions?];
            firstMessage: string;
            second: [string, VlProzaOptions?];
            secondFallback: string;
            secondMessage: string;
        }[] = [
            {
                argument: 'code',
                responses: {
                    [`${mockDomain}/${code}`]: { code, tekst },
                    [`${mockDomain}/andere.code`]: { code: 'andere.code', tekst: 'Andere tekst' },
                },
                first: [code],
                firstMessage: tekst,
                second: ['andere.code'],
                secondFallback: 'andere.code',
                secondMessage: 'Andere tekst',
            },
            {
                argument: 'domain',
                responses: {
                    [`${mockDomain}/${code}`]: { code, tekst },
                    [`${otherDomain}/${code}`]: { code, tekst: 'Ander domein' },
                },
                first: [code],
                firstMessage: tekst,
                second: [code, { domain: otherDomain, fallback: 'Laden...' }],
                secondFallback: 'Laden...',
                secondMessage: 'Ander domein',
            },
            {
                argument: 'parameters',
                responses: { [`${mockDomain}/${code}`]: { code, tekst: 'Welkom, ${parameter.naam}!' } },
                first: [code, { parameters: { naam: 'Jan' } }],
                firstMessage: 'Welkom, Jan!',
                second: [code, { parameters: { naam: 'An' } }],
                secondFallback: code,
                secondMessage: 'Welkom, An!',
            },
            {
                // de cache van VlProzaMessage is per domein en code, niet per baseUrl: het bericht van de
                // andere baseUrl wordt niet opgehaald en het eerste bericht komt terug
                argument: 'baseUrl',
                responses: {
                    [otherBaseUrl]: { code, tekst: 'Andere baseUrl' },
                    [`${mockDomain}/${code}`]: { code, tekst },
                },
                first: [code],
                firstMessage: tekst,
                second: [code, { baseUrl: otherBaseUrl }],
                secondFallback: code,
                secondMessage: tekst,
            },
        ];

        changes.forEach(({ argument, responses, first, firstMessage, second, secondFallback, secondMessage }) => {
            it(`should show the fallback and then the new message in ${name} after a change of ${argument}`, () => {
                stubFetch(responses);
                cy.spy(VlProzaMessage, 'getMessage').as('getMessage');

                cy.mount(template(...first));
                shouldShow(firstMessage);

                cy.get(selector).then(($element) => {
                    rerender($element[0], template(...second));
                    expect(read($element[0])).to.equal(`${prefix}${secondFallback}`);
                    // nog een re-render terwijl het nieuwe bericht laadt: niet de tekst van de vorige aanroep
                    rerender($element[0], template(...second));
                    expect(read($element[0])).to.equal(`${prefix}${secondFallback}`);
                });
                shouldShow(secondMessage);

                cy.get(selector).then(($element) => {
                    rerender($element[0], template(...second));
                    expect(read($element[0])).to.equal(`${prefix}${secondMessage}`);
                });
                cy.get('@getMessage').should('have.been.calledTwice');
            });
        });
    });
});
