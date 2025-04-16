import { buildData, buildDiv, buildLabel } from './html-element.builder';
import { onChildListChange } from './mutation-utils';

describe('onChildListChange tests', () => {
    it('should detect changes in child nodes', async () => {
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
});
