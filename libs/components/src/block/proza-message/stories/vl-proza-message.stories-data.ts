export const prozaMessageMockDomainData = [
    {
        url: '/proza/domein/mockdomain/inline',
        method: 'GET',
        status: 200,
        response: {
            code: 'inline',
            tekst: 'Inline',
        },
    },
    {
        url: '/proza/domein/mockdomain/action',
        method: 'GET',
        status: 200,
        response: {
            code: 'action',
            tekst: 'Action',
        },
    },
    {
        url: '/proza/domein/mockdomain/block',
        method: 'GET',
        status: 200,
        response: {
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
    },
    {
        url: '/proza/domein/mockdomain/toegelatenoperaties',
        method: 'GET',
        status: 200,
        response: {
            create: false,
            read: true,
            update: false,
            delete: false,
        },
    },
    {
        url: '/proza/domein/mockdomain',
        method: 'GET',
        status: 200,
        response: [
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
        ],
    },
];

export const prozaMessageMockDomainEditableData = [
    {
        url: '/proza/domein/mockdomaineditable/inline',
        method: 'GET',
        status: 200,
        response: {
            code: 'inline',
            tekst: 'Inline',
        },
    },
    {
        url: '/proza/domein/mockdomaineditable/action',
        method: 'GET',
        status: 200,
        response: {
            code: 'action',
            tekst: 'Action',
        },
    },
    {
        url: '/proza/domein/mockdomaineditable/block',
        method: 'GET',
        status: 200,
        response: {
            code: 'block',
            tekst: `<div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. <b>Duis aute irure dolor</b> in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>`,
        },
    },
    {
        url: '/proza/domein/mockdomaineditable/toegelatenoperaties',
        method: 'GET',
        status: 200,
        response: {
            create: true,
            read: true,
            update: true,
            delete: true,
        },
    },
];
