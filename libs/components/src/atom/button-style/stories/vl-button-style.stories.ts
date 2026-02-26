import { formattedSourceCode } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { vlButtonStyles } from '../vl-button-style.css';
import { renderAllButtonVariants } from '../vl-button-style.util';
import vlButtonStoriesDoc from './vl-button-style.stories-doc.mdx';

export default {
    id: 'components-atom-button-style',
    title: 'Components - Atom/button-style (intern)',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlButtonStoriesDoc,
        },
    },
} as Meta;

export const ButtonStyleDefault = ({}) => html`
    <style>
        ${vlButtonStyles('button', '.sb-button')}
    </style>
    ${renderAllButtonVariants('button', 'sb-button')}
`;
ButtonStyleDefault.storyName = 'button-style - button element';
ButtonStyleDefault.parameters = formattedSourceCode;

export const ButtonStyleLink = ({}) => html`
    <style>
        ${vlButtonStyles('a', '.sb-button')}
    </style>
    ${renderAllButtonVariants('a', 'sb-button')}
`;
ButtonStyleLink.storyName = 'button-style - link element';
ButtonStyleLink.parameters = formattedSourceCode;
