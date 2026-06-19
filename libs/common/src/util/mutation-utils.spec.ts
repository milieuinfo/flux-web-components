import { buildData, buildDiv, buildLabel } from '@resources/utils-test';
import { onChildListChange } from './mutation-utils';

describe('jest - common - mutation-utils', () => {
    it('should detect changes in child nodes onChildListChange', async () => {
        const columnElement = buildDiv(null, 'column');
        const changeList = [];
        onChildListChange(columnElement, () => {
            changeList.push('change');
        });
        columnElement.appendChild(buildLabel('Woonplaats'));
        columnElement.appendChild(buildData('Brussel'));
        columnElement.removeChild(columnElement.children[0]);
        // necessary to allow the MutationObserver in onChildListChange to do his job
        await new Promise(process.nextTick);
        expect(changeList.length).toEqual(3);
    });

    it('should detect in-place attribute changes when attributes is enabled', async () => {
        const columnElement = buildDiv(null, 'column');
        const changeList = [];
        onChildListChange(
            columnElement,
            () => {
                changeList.push('change');
            },
            { attributes: true }
        );
        columnElement.setAttribute('style', 'color: red');
        // necessary to allow the MutationObserver in onChildListChange to do his job
        await new Promise(process.nextTick);
        expect(changeList.length).toEqual(1);
    });
});
