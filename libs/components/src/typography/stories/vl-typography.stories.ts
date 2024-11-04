import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-typography.component';
import { typographyArgs, typographyArgTypes } from './vl-typography.stories-arg';
import typographyDocs from './vl-typography.stories-doc.mdx';

export default {
    id: 'components-typography',
    title: 'Components/typography',
    tags: ['autodocs'],
    args: typographyArgs,
    argTypes: typographyArgTypes,
    parameters: {
        docs: {
            page: typographyDocs,
        },
        controls: {
            hideNoControlsWarning: true,
        },
    },
} as Meta<typeof typographyArgs>;

export const TypographyDefault = () => html` <vl-typography data-cy="typography">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        <a href="#">tempor incididunt</a> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>Lorem dolor sit amet, consectetur adipisicing elit. Deleniti, in.</p>
</vl-typography>`;
TypographyDefault.storyName = 'vl-typography - default';

export const TypographyTitles = () => html` <vl-typography data-cy="typography">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
</vl-typography>`;
TypographyTitles.storyName = 'vl-typography - titles';

export const TypographyLists = () => html` <vl-typography data-cy="typography">
    <ul>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
        <li>
            Sublist
            <ul>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum.</li>
            </ul>
        </li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, neque.</li>
    </ul>
    <ul>
        <li>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
        </li>
    </ul>

    <ol>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit amet, consectetur.</li>
        <li>
            Sublist
            <ol>
                <li>Lorem dolor sit.</li>
                <li>Lorem ipsum.</li>
            </ol>
        </li>
        <li>Lorem ipsum.</li>
    </ol>

    <ul>
        <li>
            Ordered list inside unordered list
            <ol>
                <li>Lorem dolor sit.</li>
                <li>
                    Ordered list inside ordered list
                    <ol>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ol>
                </li>
            </ol>
        </li>
    </ul>
</vl-typography>`;
TypographyLists.storyName = 'vl-typography - lists';

export const TypographyMarkup = () => html` <vl-typography data-cy="typography">
    <p><strong>strong-tag</strong></p>
    <p><b>b-tag</b></p>
    <p><em>em-tag</em></p>
    <p><i>i-tag</i></p>
    <p><s>s-tag</s></p>
    <p>
        <mark>mark-tag</mark>
    </p>
    <p><code>code-tag</code></p>
    <p></p>
    <pre>pre-tag</pre>
    <p></p>
    <p></p>
    <hr />
    <p></p>
    <p></p>
    <blockquote>Lorem ipsum dolor sit amet.</blockquote>
    <p></p>
</vl-typography>`;
TypographyMarkup.storyName = 'vl-typography - markup';

export const TypographyTable = () => html` <vl-typography data-cy="typography">
    <table>
        <caption>
            table title
        </caption>
        <thead>
            <tr>
                <th>head 1</th>
                <th>head 2</th>
                <th>head 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>item 1</td>
                <td>item 2</td>
                <td>item 3</td>
            </tr>
            <tr>
                <td>item 1</td>
                <td>item 2</td>
                <td>item 3</td>
            </tr>
            <tr>
                <td>item 1</td>
                <td>item 2</td>
                <td>item 3</td>
            </tr>
        </tbody>
    </table>
</vl-typography>`;
TypographyTable.storyName = 'vl-typography - table';

export const TypographyParameters = ({ parameters, key1, key2 }: any) => {
    return html` <vl-typography data-vl-parameters=${parameters} data-cy="typography">
        <p>
            Lorem <b>${key1}</b> dolor sit amet, consectetur adipiscing elit. Duis iaculis molestie feugiat. Lorem
            <b>${key2}</b> eros, consequat et venenatis ac, scelerisque feugiat nunc. Nam molestie tincidunt lectus, nec
            volutpat ante egestas at. Curabitur quis odio metus. Morbi at purus ac purus convallis <b>${key1}</b> at eu
            est. Nunc id ligula quis justo semper ullamcorper. Donec orci nisi, <b>${key1}</b> varius massa ut,
            vulputate imperdiet nibh. Maecenas <b>${key1}</b> lectus quis turpis cursus, ac vehicula ligula fermentum.
        </p>
        <p>
            Praesent consequat diam nec semper congue. <b>${key2}</b> tempor ut erat nec aliquam. Quisque ullamcorper
            sapien magna, sit amet porta <b>${key2}</b> pulvinar aliquam. Sed eleifend fringilla augue in vehicula. Sed
            leo sem, imperdiet non ornare maximus, bibendum facilisis massa. Nunc condimentum leo mi, quis porta ante
            mattis ut. Quisque eu enim vel metus consequat iaculis. Donec malesuada odio quis quam vulputate vestibulum.
        </p>
    </vl-typography>`;
};
TypographyParameters.storyName = 'vl-typography - parameters';
TypographyParameters.args = {
    key1: '${parameter.key1}',
    key2: '${parameter.key1}',
};
TypographyParameters.argTypes = {
    parameters: { control: { disable: false } },
    key1: { name: 'key1 (for demo purposes)' },
    key2: { name: 'key1 (for demo purposes)' },
};
