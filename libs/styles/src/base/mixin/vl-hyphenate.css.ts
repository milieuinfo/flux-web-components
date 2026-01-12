import { css } from 'lit';

export const vlHyphenateMixin = () => css`
    hyphens: auto;
    hyphenate-limit-chars: 6 3 3;
    hyphenate-limit-lines: 2;
    hyphenate-limit-last: always;
    hyphenate-limit-zone: 8%;
`;
