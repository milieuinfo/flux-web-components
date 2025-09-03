import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const sideNavigationArgs = {
    ...defaultArgs,
    hashSync: false,
};

export const sideNavigationArgTypes: ArgTypes<typeof sideNavigationArgs> = {
    ...defaultArgTypes,
    hashSync: {
        name: 'hash-sync',
        description: `Attribute wordt gebruikt om aan te duiden dat de url hash gesynchroniseerd moet worden met de 
        side navigation. Dit gebeurt in twee richtingen: enerzijds, indien er een hash aanwezig in de url die 
        overeenkomt met een item op de pagina dan zal de browser automatisch scrollen naar dat item, en anderzijds, 
        wanneer je klikt op een item in de side navigation, zal de url hash worden bijgewerkt naar het id van dat 
        item.`,
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: sideNavigationArgs.hashSync },
        },
    },
};
