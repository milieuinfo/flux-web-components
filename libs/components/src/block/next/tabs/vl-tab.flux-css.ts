import { vlFocusOutlineMixin, vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlTabFluxStyles = (tabLink: boolean = false): CSSResult => css`
    :host {
        --vl-tab--padding-inline: 1.3rem;
    }

    ${tabLink
        ? css`
            :host > a, 
            :host > a:visited
    `
        : css`
              :host,
              :host(:visited)
    `} {
        color: var(--vl-color--text-action);
        cursor: pointer;
        display: block;
        font-size: var(--vl-font-size--small);
        font-weight: 500;
        padding: 1.1rem var(--vl-tab--padding-inline) 1.2rem;
        position: relative;
        text-decoration: none;

        &::after {
            background-color: transparent;
            bottom: -1px;
            content: '';
            display: block;
            height: 0.3rem;
            left: var(--vl-tab--padding-inline);
            position: absolute;
            width: calc(100% - 2 * var(--vl-tab--padding-inline));
            transition: background-color 0.2s ease-out;
        }
    }

    ${tabLink
        ? css`
        :host([selected]) > a,
        :host(:hover) > a,
        :host(:focus) > a,
        :host(:active) > a
    `
        : css`
        :host([selected]),
        :host(:hover),
        :host(:focus),
        :host(:active)
    `} {
        &::after {
            background-color: var(--vl-color--text-default);
        }
    }

    ${tabLink
        ? css`
        :host([selected]) > a
    `
        : css`
              :host([selected])
          `} {
        color: var(--vl-color--text-default);
    }

    ${tabLink
        ? css`
        :host(:hover) > a
    `
        : css`
            :host(:hover)
    `} {
        color: var(--vl-color--hover-text-action);
    }

    ${tabLink
        ? css`
        :host(:focus) > a
    `
        : css`
              :host(:focus)
    `} {
        ${vlFocusOutlineMixin()};
    }

    ${tabLink
        ? css`
              :host:has(a) {
                  padding: 0;
                  &::after {
                      display: none;
                  }
              }

              :host(:focus):has(a) {
                  outline: none;
              }

              /* Mobile: vl-tabs-next shows the links in a list below a toggle; they look like the options of a
                 dropdown, not like tabs (FLUX-739) */
              @media screen and (max-width: ${vlMediaScreenSmall}px) {
                  :host > a,
                  :host > a:visited {
                      color: var(--vl-color--text-default);
                      font-size: inherit;
                      font-weight: 400;
                      padding: 0.75rem 1rem;

                      &::after {
                          display: none;
                      }
                  }

                  :host([selected]) > a {
                      font-weight: 500;
                  }

                  :host(:hover) > a,
                  :host(:focus) > a {
                      color: var(--vl-color--text-default);
                      text-decoration: underline;
                  }

                  :host(:hover) > a {
                      background-color: var(--vl-color--background-subtle);
                  }

                  :host(:focus) > a {
                      outline-offset: -2px;
                  }
              }
          `
        : css``}
`;
