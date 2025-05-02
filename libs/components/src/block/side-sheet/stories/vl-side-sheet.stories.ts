import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-side-sheet.component';
import { sideSheetArgs, sideSheetArgTypes } from './vl-side-sheet.stories-arg';
import sideSheetDoc from './vl-side-sheet.stories-doc.mdx';
import sideSheetToggleImplementation from './vl-side-sheet.stories-utils';

export default {
    id: 'components-block-side-sheet',
    title: 'Components - Block/side-sheet',
    tags: ['autodocs'],
    args: sideSheetArgs,
    argTypes: sideSheetArgTypes,
    parameters: {
        docs: {
            page: sideSheetDoc,
        },
    },
    decorators: [(story: () => unknown) => html` <div style="height: 150px;">${story()}</div>`],
} as Meta<typeof sideSheetArgs>;

export const SideSheetDefault = story(
    sideSheetArgs,
    ({
        enableSwipe,
        absolute,
        left,
        toggleText,
        tooltipText,
        right,
        customIcon,
        hideToggleButton,
        iconPlacement,
        open,
    }) => html`
        <vl-side-sheet
            ?enable-swipe=${enableSwipe}
            ?absolute=${absolute}
            ?left=${left}
            ?right=${right}
            toggle-text=${toggleText}
            tooltip-text=${tooltipText}
            custom-icon=${customIcon}
            icon-placement=${iconPlacement}
            ?hide-toggle-button=${hideToggleButton}
            ?open=${open}
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum urna ante. Integer eu sem
                mollis, ornare libero nec, pulvinar augue. Nunc ac rhoncus ipsum. Mauris vitae elementum erat. Donec
                gravida hendrerit magna, quis feugiat felis sodales quis. Sed tempor ornare elit, non aliquam urna
                maximus imperdiet. Suspendisse finibus ullamcorper dictum. Sed vehicula tortor quis dignissim tincidunt.
                Maecenas turpis ante, blandit sed efficitur eu, varius vitae nibh. Vivamus porttitor mi in massa
                elementum sollicitudin. Cras id porta nisi, vel pulvinar neque. Mauris sodales mi sem, sit amet
                fringilla tellus ultrices et. Quisque sed interdum mauris. Suspendisse rutrum maximus ornare. Morbi sed
                vestibulum magna, a tincidunt mi. Aliquam in imperdiet diam.
            </p>
            <p>
                Nulla mattis eget mi at mattis. Donec ut nisi ipsum. Sed placerat, augue vel dapibus blandit, nulla
                purus hendrerit orci, ut maximus ligula quam at sapien. Nunc efficitur augue est, ac laoreet libero
                blandit in. Aliquam non sagittis libero. Fusce posuere magna venenatis, facilisis magna quis, dictum
                risus. In nulla augue, efficitur congue porta sit amet, convallis eu justo. Etiam facilisis maximus
                dolor, a scelerisque sapien fringilla non. Quisque vestibulum mauris erat, vel ultrices massa dictum sit
                amet. Integer nec bibendum arcu, sit amet pretium turpis.
            </p>
            <p>
                Vivamus ligula diam, lobortis eget ultricies vitae, varius id arcu. Sed id mauris sed augue ultricies
                luctus. Donec pulvinar a sapien quis posuere. Suspendisse non varius dui. Nullam eu posuere neque.
                Vivamus eget felis turpis. Curabitur tortor ante, vulputate vel quam ut, posuere mattis ipsum. Maecenas
                vel metus tortor. Quisque id turpis est. Donec est eros, laoreet vel metus id, tempor pulvinar eros. Nam
                sed semper eros. Aenean placerat tellus ex, ac ultricies dui ornare ac. Suspendisse eget semper risus.
                Nullam eleifend leo justo, eu rhoncus erat lacinia quis. Nam finibus nunc sit amet justo interdum
                dignissim.
            </p>
            <p>
                Donec iaculis purus leo. Aliquam pulvinar magna vitae dolor varius auctor. Sed dapibus convallis est,
                non pharetra felis eleifend nec. Donec erat ex, tempus in sem quis, imperdiet gravida justo. Morbi sem
                purus, efficitur eget massa ut, molestie placerat orci. Phasellus sollicitudin convallis augue, ut
                tincidunt nulla faucibus ut. Praesent ullamcorper erat sit amet nisi venenatis eleifend. Vestibulum
                vehicula tristique ipsum, vel placerat tortor maximus eu. Phasellus mauris purus, semper vulputate
                maximus sit amet, faucibus eget risus. Sed in imperdiet dui, vel suscipit nibh. Nunc ac lectus tempus,
                venenatis mauris non, ornare nunc. Cras at nibh nec sem vestibulum facilisis. Curabitur et elit
                hendrerit, ullamcorper nibh vitae, eleifend augue. Aliquam imperdiet eros quis pulvinar suscipit.
            </p>
            <p>
                In dapibus, est eu eleifend vehicula, purus arcu consequat nulla, accumsan viverra mi massa vel metus.
                Vestibulum ut nunc viverra, pellentesque urna et, consectetur metus. Quisque bibendum diam non eros
                porta, non volutpat leo commodo. Morbi odio nulla, tempus non lobortis ac, imperdiet vitae sem. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ac sodales
                eros. In hac habitasse platea dictumst.
            </p>
        </vl-side-sheet>
    `
);
SideSheetDefault.storyName = 'vl-side-sheet - default';

export const SideSheetToggle = story(
    sideSheetArgs,
    ({
        enableSwipe,
        absolute,
        left,
        toggleText,
        tooltipText,
        right,
        customIcon,
        hideToggleButton,
        iconPlacement,
        open,
    }) => {
        const { toggleSideSheet, openSideSheet, closeSideSheet } = sideSheetToggleImplementation();
        return html`
            <style>
                :root {
                    --vl-side-sheet-width-mobile: 100%;
                    --vl-side-sheet-width: 480px;
                }

                #vl-side-sheet-close-button {
                    position: fixed;
                    top: 1rem;
                    right: 3rem;
                }
            </style>
            <button
                is="vl-button"
                type="button"
                @click=${() => {
                    toggleSideSheet();
                }}
            >
                toggle()
            </button>
            <button
                is="vl-button"
                type="button"
                @click=${() => {
                    openSideSheet();
                }}
            >
                open()
            </button>
            <button
                is="vl-button"
                type="button"
                @click=${() => {
                    closeSideSheet();
                }}
            >
                close()
            </button>
            <vl-side-sheet
                id="side-sheet-toggle"
                ?enable-swipe=${enableSwipe}
                ?absolute=${absolute}
                ?left=${left}
                ?right=${right}
                toggle-text=${toggleText}
                tooltip-text=${tooltipText}
                custom-icon=${customIcon}
                icon-placement=${iconPlacement}
                ?hide-toggle-button=${hideToggleButton}
                ?open=${open}
            >
                <button
                    is="vl-button"
                    id="vl-side-sheet-close-button"
                    type="button"
                    tertiary
                    @click=${() => {
                        closeSideSheet();
                    }}
                >
                    <span
                        is="vl-icon"
                        icon="cross"
                        class="vl-vi-cross vl-icon vl-vi vl-button__icon"
                        aria-hidden="true"
                    ></span>
                </button>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum urna ante. Integer eu sem
                    mollis, ornare libero nec, pulvinar augue. Nunc ac rhoncus ipsum. Mauris vitae elementum erat. Donec
                    gravida hendrerit magna, quis feugiat felis sodales quis. Sed tempor ornare elit, non aliquam urna
                    maximus imperdiet. Suspendisse finibus ullamcorper dictum. Sed vehicula tortor quis dignissim
                    tincidunt. Maecenas turpis ante, blandit sed efficitur eu, varius vitae nibh. Vivamus porttitor mi
                    in massa elementum sollicitudin. Cras id porta nisi, vel pulvinar neque. Mauris sodales mi sem, sit
                    amet fringilla tellus ultrices et. Quisque sed interdum mauris. Suspendisse rutrum maximus ornare.
                    Morbi sed vestibulum magna, a tincidunt mi. Aliquam in imperdiet diam.
                </p>
                <p>
                    Nulla mattis eget mi at mattis. Donec ut nisi ipsum. Sed placerat, augue vel dapibus blandit, nulla
                    purus hendrerit orci, ut maximus ligula quam at sapien. Nunc efficitur augue est, ac laoreet libero
                    blandit in. Aliquam non sagittis libero. Fusce posuere magna venenatis, facilisis magna quis, dictum
                    risus. In nulla augue, efficitur congue porta sit amet, convallis eu justo. Etiam facilisis maximus
                    dolor, a scelerisque sapien fringilla non. Quisque vestibulum mauris erat, vel ultrices massa dictum
                    sit amet. Integer nec bibendum arcu, sit amet pretium turpis.
                </p>
                <p>
                    Vivamus ligula diam, lobortis eget ultricies vitae, varius id arcu. Sed id mauris sed augue
                    ultricies luctus. Donec pulvinar a sapien quis posuere. Suspendisse non varius dui. Nullam eu
                    posuere neque. Vivamus eget felis turpis. Curabitur tortor ante, vulputate vel quam ut, posuere
                    mattis ipsum. Maecenas vel metus tortor. Quisque id turpis est. Donec est eros, laoreet vel metus
                    id, tempor pulvinar eros. Nam sed semper eros. Aenean placerat tellus ex, ac ultricies dui ornare
                    ac. Suspendisse eget semper risus. Nullam eleifend leo justo, eu rhoncus erat lacinia quis. Nam
                    finibus nunc sit amet justo interdum dignissim.
                </p>
                <p>
                    Donec iaculis purus leo. Aliquam pulvinar magna vitae dolor varius auctor. Sed dapibus convallis
                    est, non pharetra felis eleifend nec. Donec erat ex, tempus in sem quis, imperdiet gravida justo.
                    Morbi sem purus, efficitur eget massa ut, molestie placerat orci. Phasellus sollicitudin convallis
                    augue, ut tincidunt nulla faucibus ut. Praesent ullamcorper erat sit amet nisi venenatis eleifend.
                    Vestibulum vehicula tristique ipsum, vel placerat tortor maximus eu. Phasellus mauris purus, semper
                    vulputate maximus sit amet, faucibus eget risus. Sed in imperdiet dui, vel suscipit nibh. Nunc ac
                    lectus tempus, venenatis mauris non, ornare nunc. Cras at nibh nec sem vestibulum facilisis.
                    Curabitur et elit hendrerit, ullamcorper nibh vitae, eleifend augue. Aliquam imperdiet eros quis
                    pulvinar suscipit.
                </p>
                <p>
                    In dapibus, est eu eleifend vehicula, purus arcu consequat nulla, accumsan viverra mi massa vel
                    metus. Vestibulum ut nunc viverra, pellentesque urna et, consectetur metus. Quisque bibendum diam
                    non eros porta, non volutpat leo commodo. Morbi odio nulla, tempus non lobortis ac, imperdiet vitae
                    sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    Fusce ac sodales eros. In hac habitasse platea dictumst.
                </p>
            </vl-side-sheet>
        `;
    }
);
SideSheetToggle.storyName = 'vl-side-sheet - toggle';
