import { css, CSSResult, unsafeCSS } from 'lit';
import vlSectionRawCss from '!!raw-loader!./vl-section.raw.css';
import { vlMediaScreenMedium, vlMediaScreenSmall, vlPageMaxWidthWide } from '../../base/var/vl-media-screen.css';

export const vlSectionStyles: CSSResult = css`
    ${unsafeCSS(vlSectionRawCss)}

    .vl-section-next {
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
        &:not(.vl-section-next--alt) + .vl-section-next:not(.vl-section-next--alt) {
            padding-top: 0;
        }

        /* alt-sectie met een achtergrond kleur */
        &.vl-section-next--alt {
            background-color: var(--vl-section--alt-bg);
        }

        /* smalle witruimte boven en onder */
        &.vl-section-next--small {
            padding: var(--vl-spacing--small) 0;

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding: var(--vl-spacing--normal) 0;
            }
        }

        /* medium witruimte boven en onder */
        &.vl-section-next--medium {
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
        &.vl-section-next--bordered + &.vl-section-next--bordered {
            border-top: 1px solid var(--vl-section--border);

            /* opeenvolgende 'alt' sectie's krijgen een witte scheidingslijn */
            &.vl-section-next--alt {
                border-top-color: var(--vl-color--white);
            }
        }

        /*
            een gewone sectie gevolgd door een alt-sectie of een alt-sectie gevolgd door een gewone sectie
             -> krijgt grote top-padding
        */
        &:not(.vl-section-next--alt) + &.vl-section-next--alt,
        &.vl-section-next--alt + &:not(&.vl-section-next--alt) {
            padding-top: var(--vl-spacing--large);

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                padding-top: var(--vl-spacing--medium);
            }
        }

        /*
            een sectie met daarin een kader (vl-layout), de sectie heeft bovenaan
            een witte / transparante kleur en eronder een lichtgrijze kleur
        */
        &.vl-section-next--overlap {
            background: linear-gradient(
                to bottom,
                var(--vl-section--overlap-black-transparent) calc(50% - 30px),
                var(--vl-section--overlap-bg) calc(50% - 30px),
                var(--vl-section--overlap-bg) 100%
            );

            .vl-content-block-next {
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
        &.vl-section-next--overlap + &.vl-section-next--alt {
            padding-top: 0 !important;
        }
    }
`;
