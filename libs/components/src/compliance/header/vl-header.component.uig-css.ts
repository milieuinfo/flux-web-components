import { css } from 'lit';

export const headerContainerStyles = css`
    #header__container {
        min-height: 43px;
    }
`;

export const headerSkeletonStyles = css`
    #header__skeleton {
        content: '';
        height: 43px;
        width: 100%;
        display: block;
        background: #fff;
    }

    #header__container ~ #header__skeleton {
        display: none;
    }
`;
