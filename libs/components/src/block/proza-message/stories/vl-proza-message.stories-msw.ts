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
