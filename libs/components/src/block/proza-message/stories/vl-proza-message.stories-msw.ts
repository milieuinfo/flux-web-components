import { http, HttpResponse } from 'msw';

export const prozaMessageMockDomainData = [
    http.get('proza/domein/mockdomain/inline', async () => {
        return HttpResponse.json({
            code: 'inline',
            tekst: 'Inline',
        }); // status=200 is default
    }),
    http.get('proza/domein/mockdomain/action', async () => {
        return HttpResponse.json({
            code: 'action',
            tekst: 'Action',
        }); // status=200 is default
    }),
    http.get('proza/domein/mockdomain/block', async () => {
        return HttpResponse.json({
            code: 'block',
            tekst: `
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. <b>Duis aute irure dolor</b> in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                `,
        }); // status=200 is default
    }),
    http.get('proza/domein/mockdomain/toegelatenoperaties', async () => {
        return HttpResponse.json({
            create: false,
            read: true,
            update: false,
            delete: false,
        }); // status=200 is default
    }),
    http.get('proza/domein/mockdomain', async () => {
        return HttpResponse.json([
            {
                code: 'inline',
                tekst: 'Inline',
            },
            {
                code: 'action',
                tekst: 'Action',
            },
            {
                code: 'block',
                tekst: `
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. <b>Duis aute irure dolor</b> in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                `,
            },
        ]); // status=200 is default
    }),
];

export const prozaDirectiveMockData = [
    http.get('proza/domein/mockdomain/alert.titel', async () => {
        return HttpResponse.json({
            code: 'alert.titel',
            tekst: '<p>Opgelet! Dit is een belangrijk bericht.</p>',
        });
    }),
    http.get('proza/domein/mockdomain/alert.bericht', async () => {
        return HttpResponse.json({
            code: 'alert.bericht',
            tekst: '<p>Controleer de ingevoerde gegevens aub.</p>',
        });
    }),
    http.get('proza/domein/mockdomain/welkom.titel', async () => {
        return HttpResponse.json({
            code: 'welkom.titel',
            tekst: '<p>Welkom, ${parameter.naam}!</p>',
        });
    }),
    http.get('proza/domein/otherdomain/alert.titel', async () => {
        return HttpResponse.json({
            code: 'alert.titel',
            tekst: '<p>Titel uit een ander domein</p>',
        });
    }),
    http.get('proza/domein/otherdomain/toegelatenoperaties', async () => {
        return HttpResponse.json({
            create: false,
            read: true,
            update: false,
            delete: false,
        });
    }),
];

export const prozaMessageMockDomainEditableData = [
    http.get('proza/domein/mockdomaineditable/inline', async () => {
        return HttpResponse.json({
            code: 'inline',
            tekst: 'Inline',
        }); // status=200 is default
    }),
    http.get('proza/domein/mockdomaineditable/action', async () => {
        return HttpResponse.json({
            code: 'action',
            tekst: 'Action',
        }); // status=200 is default
    }),
    http.get('proza/domein/mockdomaineditable/block', async () => {
        return HttpResponse.json({
            code: 'block',
            tekst: `<div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. <b>Duis aute irure dolor</b> in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>`,
        }); // status=200 is default
    }),
    http.get('proza/domein/mockdomaineditable/toegelatenoperaties', async () => {
        return HttpResponse.json({
            create: true,
            read: true,
            update: true,
            delete: true,
        }); // status=200 is default
    }),
];
