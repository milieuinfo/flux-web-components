import { css, CSSResult, unsafeCSS } from 'lit';
import vlSectionRawCss from '!!raw-loader!./vl-section.raw.css';
import { vlMediaScreenMedium, vlMediaScreenSmall, vlPageMaxWidthWide } from '../../base/var/vl-media-screen.css';

export const vlSectionStyles: CSSResult = css`
    ${unsafeCSS(vlSectionRawCss)}

    .vl-section {
        margin: 0 auto;
        padding: var(--vl-spacing--medium) 0 var(--vl-spacing--large);

        /* de eerste sectie krijgt bovenaan meer witruimte */
        &:first-child {
            padding-top: var(--vl-spacing--large);

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding-top: var(--vl-spacing--normal);
            }
        }

        /* opeenvolgende sectie's die geen alt-secties zijn krijgen geen top-padding */
        &:not(.vl-section--alt) + .vl-section:not(.vl-section--alt) {
            padding-top: 0;
        }

        /* alt-sectie met een achtergrond kleur */
        &.vl-section--alt {
            background-color: var(--vl-section--alt-bg);
        }

        /* smalle witruimte boven en onder */
        &.vl-section--small {
            padding: var(--vl-spacing--small) 0;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: var(--vl-spacing--normal) 0;
            }
        }

        /* medium witruimte boven en onder */
        &.vl-section--medium {
            padding: var(--vl-spacing--medium) 0;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: var(--vl-spacing--normal) 0;
            }
        }

        /*
            scheidingslijnen tussen opeenvolgende sectie's via een border bovenaan
             -> de eerste sectie heeft bovenaan geen lijn
             -> de laatste sectie heeft onderdaan geen lijn
        */
        &.vl-section--bordered + &.vl-section--bordered {
            border-top: 1px solid var(--vl-section--border);

            /* opeenvolgende 'alt' sectie's krijgen een witte scheidingslijn */
            &.vl-section--alt {
                border-top-color: var(--vl-color--white);
            }
        }

        /*
            een gewone sectie gevolgd door een alt-sectie of een alt-sectie gevolgd door een gewone sectie
             -> krijgt grote top-padding
        */
        &:not(.vl-section--alt) + &.vl-section--alt,
        &.vl-section--alt + &:not(&.vl-section--alt) {
            padding-top: var(--vl-spacing--large);

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding-top: var(--vl-spacing--medium);
            }
        }

        /*
            een sectie met daarin een kader (vl-layout), de sectie heeft bovenaan
            een witte / transparante kleur en eronder een lichtgrijze kleur
        */
        &.vl-section--overlap {
            background: linear-gradient(
                to bottom,
                var(--vl-section--overlap-black-transparent) calc(50% - 30px),
                var(--vl-section--overlap-bg) calc(50% - 30px),
                var(--vl-section--overlap-bg) 100%
            );

            .vl-content-block {
                border: 1px var(--vl-color--border) solid;
                padding-top: 50px;
                padding-bottom: 50px;
                background: var(--vl-color--white);

                @media only screen and (max-width: calc(${vlPageMaxWidthWide}px + 15px)) {
                    margin: 15px;
                }

                @media screen and (max-width: ${vlMediaScreenMedium}px) {
                    padding-top: 20px;
                    padding-bottom: 20px;
                }
            }
        }

        /* een alt-sectie na een overlap sectie heeft geen top-padding */
        &.vl-section--overlap + &.vl-section--alt {
            padding-top: 0 !important;
        }
    }
`;
