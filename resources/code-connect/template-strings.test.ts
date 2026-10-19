import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readStrings, writes } from './template-strings';

const template = (source: string) => readStrings('fixture.figma.ts', source);

test('should not count a layer name passed to findText as a written attribute', () => {
    const strings = template(`
        const backText = instance.findText('↳ link', { traverseInstances: true });
        export default { example: figma.code\`<vl-functional-header title="..."></vl-functional-header>\` };
    `);
    assert.equal(writes(strings, 'vl-functional-header', 'link'), false);
});

test('should count the values of a getEnum map but not its keys', () => {
    const strings = template(`
        const type = instance.getEnum('type', { 'with border': ' bordered', plain: '' });
        export default { example: figma.code\`<vl-table\${type}></vl-table>\` };
    `);
    assert.equal(writes(strings, 'vl-table', 'bordered'), true);
    assert.equal(writes(strings, 'vl-table', 'border'), false);
});

test('should count an attribute added in an interpolation', () => {
    const strings = template(`
        const open = booleanProperty(instance, 'open', true);
        export default { example: figma.code\`<vl-accordion\${open ? ' default-open' : ''}></vl-accordion>\` };
    `);
    assert.equal(writes(strings, 'vl-accordion', 'default-open'), true);
    assert.equal(writes(strings, 'vl-accordion', 'open'), false);
});

test('should count an attribute only for the tag it is written on', () => {
    const strings = template(`
        export default {
            example: figma.code\`<vl-tabs-next><vl-input-field label="Zoekterm"></vl-input-field></vl-tabs-next>\`,
        };
    `);
    assert.equal(writes(strings, 'vl-input-field', 'label'), true);
    assert.equal(writes(strings, 'vl-tabs-next', 'label'), false);
});
