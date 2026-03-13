import { create } from 'storybook/theming';

export default create({
    base: 'light',
    brandTitle: 'Departement Omgeving - FLUX - Web Componenten',
    brandUrl: 'https://omgeving.vlaanderen.be/',
    brandImage: 'storybook-flux-logo.svg',
    appBg: '#F6F6F3', // achtergrond van de UI (incl. navigatie)
    barBg: '#F6F6F3', // bovenste toolbar achtergrond
    textColor: '#333332', // algemene tekstkleur
    colorPrimary: '#447A6D', // accent kleur (knoppen, highlights)
    colorSecondary: '#447A6D',
    appContentBg: '#FFFFFF',
    appBorderColor: '#447A6D22',
    inputBg: '#FFFFFF',
    inputBorder: '#33333233',
    inputTextColor: '#333332',
    barSelectedColor: '#447A6D',
});
