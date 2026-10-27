import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { BADGE_BACKGROUND, badgeDefaults } from '../vl-badge.defaults';

export const badgeArgs = {
    ...defaultArgs,
    ...badgeDefaults,
};

export const badgeArgTypes: ArgTypes = {
    ...defaultArgTypes,
    alt: {
        name: 'alt',
        description:
            'Het tekstalternatief van de badge. Met `img` komt het op de afbeelding; met een icoon krijgt de badge `role="img"` en dit `aria-label`.<br>Laat leeg als de badge enkel decoratief is.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: badgeDefaults.alt },
        },
    },
    background: {
        name: 'background',
        description:
            'De achtergrondkleur van de badge.<br>`subtle`: `--vl-color--background-subtle`.<br>`default`: `--vl-color--background-default`, bv. op een `subtle` achtergrond.<br>`primary`: `--vl-theme-primary-color`, of `--vl-color--background-primary` zonder thema.<br>`action`: `--vl-color--action`, de blauwe actiekleur van de huisstijl.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(BADGE_BACKGROUND),
        table: {
            type: { summary: Object.values(BADGE_BACKGROUND).join(' | ') },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: badgeDefaults.background },
        },
    },
    icon: {
        name: 'icon',
        description: 'Het icoon in de badge. Het icoon is decoratief. Wordt enkel getoond als er geen `img` is.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: badgeDefaults.icon },
        },
    },
    img: {
        name: 'img',
        description: 'De url van een afbeelding in de badge, bv. een avatar of een logo. Heeft voorrang op `icon`.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: badgeDefaults.img },
        },
    },
};
