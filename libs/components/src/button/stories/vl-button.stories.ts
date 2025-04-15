import { story } from '@domg-wc/common-storybook';
import { buttonArgs, buttonArgTypes } from './vl-button.stories-arg';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlButtonComponent } from '../vl-button.component';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import buttonDoc from './vl-button.stories-doc.mdx';

registerWebComponents([VlButtonComponent]);

export default {
    id: 'components-button',
    title: 'Components/button',
    tags: ['autodocs'],
    args: buttonArgs,
    argTypes: buttonArgTypes,
    parameters: {
        docs: {
            page: buttonDoc,
        },
    },
} as Meta<typeof buttonArgs>;

const ButtonTemplate = story(
    buttonArgs,
    ({
        type,
        disabled,
        error,
        block,
        large,
        wide,
        narrow,
        secondary,
        tertiary,
        ghost,
        loading,
        icon,
        ctaLink,
        iconPlacement,
        toggle,
        on,
        controlled,
        external,
        inputGroup,
        label,
        defaultSlot,
        onVlClick,
        onVlToggle,
    }) => html`
        <vl-button
            type=${type}
            ?disabled=${disabled}
            ?error=${error}
            ?block=${block}
            ?large=${large}
            ?wide=${wide}
            ?narrow=${narrow}
            ?secondary=${secondary}
            ?tertiary=${tertiary}
            ?ghost=${ghost}
            ?loading=${loading}
            label=${label}
            icon=${icon}
            cta-link=${ctaLink}
            icon-placement=${iconPlacement}
            ?toggle=${toggle}
            ?on=${on}
            ?controlled=${controlled}
            ?external=${external}
            ?inputGroup=${inputGroup}
            @vl-click=${onVlClick}
            @vl-toggle=${onVlToggle}
        >
            ${unsafeHTML(defaultSlot)}
        </vl-button>
    `
);

export const ButtonPrimary = ButtonTemplate.bind({});
ButtonPrimary.storyName = 'vl-button - primary';
ButtonPrimary.args = {
    defaultSlot: 'Klik op mij',
};

export const ButtonSecondary = ButtonTemplate.bind({});
ButtonSecondary.storyName = 'vl-button - secondary';
ButtonSecondary.args = {
    defaultSlot: 'Klik op mij',
    secondary: true,
};

export const ButtonTertiary = ButtonTemplate.bind({});
ButtonTertiary.storyName = 'vl-button - tertiary';
ButtonTertiary.args = {
    defaultSlot: 'Klik op mij',
    tertiary: true,
};

export const ButtonGhost = ButtonTemplate.bind({});
ButtonGhost.storyName = 'vl-button - ghost';
ButtonGhost.args = {
    defaultSlot: 'Klik op mij',
    ghost: true,
};

export const ButtonDisabled = ButtonTemplate.bind({});
ButtonDisabled.storyName = 'vl-button - disabled';
ButtonDisabled.args = {
    defaultSlot: 'Klik op mij',
    disabled: true,
};

export const ButtonError = ButtonTemplate.bind({});
ButtonError.storyName = 'vl-button - error';
ButtonError.args = {
    defaultSlot: 'Klik op mij',
    error: true,
};

export const ButtonBlock = ButtonTemplate.bind({});
ButtonBlock.storyName = 'vl-button - block';
ButtonBlock.args = {
    defaultSlot: 'Klik op mij',
    block: true,
};

export const ButtonLarge = ButtonTemplate.bind({});
ButtonLarge.storyName = 'vl-button - large';
ButtonLarge.args = {
    defaultSlot: 'Klik op mij',
    large: true,
};

export const ButtonWide = ButtonTemplate.bind({});
ButtonWide.storyName = 'vl-button - wide';
ButtonWide.args = {
    defaultSlot: 'Klik op mij',
    wide: true,
};

export const ButtonNarrow = ButtonTemplate.bind({});
ButtonNarrow.storyName = 'vl-button - narrow';
ButtonNarrow.args = {
    defaultSlot: 'Klik op mij',
    narrow: true,
};

export const ButtonLoading = ButtonTemplate.bind({});
ButtonLoading.storyName = 'vl-button - loading';
ButtonLoading.args = {
    defaultSlot: 'Klik op mij',
    loading: true,
};

export const ButtonIcon = ButtonTemplate.bind({});
ButtonIcon.storyName = 'vl-button - icon';
ButtonIcon.args = {
    defaultSlot: 'Klik op mij',
    icon: 'location',
    iconPlacement: 'before',
};

export const ButtonIconOnly = ButtonTemplate.bind({});
ButtonIconOnly.storyName = 'vl-button - icon only';
ButtonIconOnly.args = {
    icon: 'location',
    label: 'Locatie',
};

export const ButtonIconOnlyGhost = ButtonTemplate.bind({});
ButtonIconOnlyGhost.storyName = 'vl-button - icon only - ghost';
ButtonIconOnlyGhost.args = {
    icon: 'trash',
    label: 'Verwijder',
    ghost: true,
};

export const ButtonToggle = ButtonTemplate.bind({});
ButtonToggle.storyName = 'vl-button - toggle';
ButtonToggle.args = {
    defaultSlot: 'Klik op mij',
    toggle: true,
};

export const ButtonCtaLink = ButtonTemplate.bind({});
ButtonCtaLink.storyName = 'vl-button - cta-link';
ButtonCtaLink.args = {
    icon: 'add',
    defaultSlot: 'Voeg nieuw object toe.',
    ctaLink: 'https://www.vlaanderen.be',
};

export const ButtonInputGroup = ButtonTemplate.bind({});
ButtonInputGroup.storyName = 'vl-button - input-group';
ButtonInputGroup.args = {
    defaultSlot: 'Klik op mij',
    inputGroup: true,
};
