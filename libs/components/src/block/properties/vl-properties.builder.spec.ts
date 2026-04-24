import { buildSpan, buildData, buildDiv, buildLabel } from '@resources/utils-test';
import { buildProperties } from './vl-properties.builder';

describe('jest - components - vl-properties', () => {
    beforeEach(() => {
        // console logging afzetten
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('buildProperties should build empty properties for a null element', () => {
        expect(buildProperties(null, true)).toEqual([]);
    });

    it('buildProperties should build empty properties for empty elements', () => {
        expect(buildProperties([], true)).toEqual([]);
    });

    it('buildProperties should build properties for an array of labels and data', () => {
        const elements: Element[] = [];
        elements.push(buildLabel('Woonplaats'));
        elements.push(buildData('Brussel'));
        elements.push(buildLabel('Postcode'));
        elements.push(buildData('1000'));
        expect(buildProperties(elements, true)).toEqual([
            {
                items: [
                    {
                        labels: [[document.createTextNode('Woonplaats')]],
                        data: [[document.createTextNode('Brussel')]],
                    },
                    {
                        labels: [[document.createTextNode('Postcode')]],
                        data: [[document.createTextNode('1000')]],
                    },
                ],
            },
        ]);
    });

    it('buildProperties should build properties for an array of labels and data that contain html', () => {
        const elements: Element[] = [];
        elements.push(buildLabel('<span style="color: red">Woonplaats</span>'));
        elements.push(buildData('<span style="color: blue">Brussel</span>'));
        const labelElement = buildSpan('Woonplaats');
        labelElement.setAttribute('style', 'color: red');
        const dataElement = buildSpan('Brussel');
        dataElement.setAttribute('style', 'color: blue');
        expect(buildProperties(elements, true)).toEqual([
            {
                items: [
                    {
                        labels: [[labelElement]],
                        data: [[dataElement]],
                    },
                ],
            },
        ]);
    });

    it('buildProperties should not clone when specified', () => {
        const elements: Element[] = [];
        // build and add label
        const labelElement = document.createElement('label');
        const labelChild = buildSpan('Woonplaats');
        labelChild.setAttribute('style', 'color: red');
        labelElement.appendChild(labelChild);
        elements.push(labelElement);
        // build and add data
        const dataElement = document.createElement('data');
        const dataChild = buildSpan('Brussel');
        dataChild.setAttribute('style', 'color: blue');
        dataElement.appendChild(dataChild);
        elements.push(dataElement);
        // the cloned label and data are equal but have a different reference
        // the no-cloned label and data have the same reference
        const clonedProperties = buildProperties(elements, true);
        const noCloneProperties = buildProperties(elements, false);
        expect(clonedProperties[0].items[0].labels[0][0]).not.toBe(labelChild);
        expect(clonedProperties[0].items[0].labels[0][0]).toEqual(labelChild);
        expect(noCloneProperties[0].items[0].labels[0][0]).toBe(labelChild);
        expect(clonedProperties[0].items[0].data[0][0]).not.toBe(dataChild);
        expect(clonedProperties[0].items[0].data[0][0]).toEqual(dataChild);
        expect(noCloneProperties[0].items[0].data[0][0]).toBe(dataChild);
    });

    it('buildProperties should build properties for an array of columns', () => {
        const columns: Element[] = [];
        const column = buildDiv(null, 'column');
        columns.push(column);
        column.appendChild(buildLabel('Woonplaats'));
        column.appendChild(buildData('Brussel'));
        column.appendChild(buildLabel('Postcode'));
        column.appendChild(buildData('1000'));
        expect(buildProperties(columns, true)).toEqual([
            {
                class: 'column',
                items: [
                    {
                        labels: [[document.createTextNode('Woonplaats')]],
                        data: [[document.createTextNode('Brussel')]],
                    },
                    {
                        labels: [[document.createTextNode('Postcode')]],
                        data: [[document.createTextNode('1000')]],
                    },
                ],
            },
        ]);
    });

    it('buildProperties should handle Lit-binding comment markers without serialising them as text', () => {
        const labelElement = document.createElement('label');
        labelElement.appendChild(document.createComment('?lit$34872438$0?'));
        labelElement.appendChild(document.createTextNode('Dynamische waarde'));
        labelElement.appendChild(document.createComment('?'));

        const dataElement = document.createElement('data');
        dataElement.appendChild(document.createComment('?lit$34872438$0?'));
        dataElement.appendChild(document.createTextNode('42'));
        dataElement.appendChild(document.createComment('?'));

        const result = buildProperties([labelElement, dataElement], false);

        expect(result).toHaveLength(1);
        const item = result[0].items[0];
        const labelNodes = item.labels[0] as Node[];
        const dataNodes = item.data[0] as Node[];
        expect(labelNodes).toHaveLength(3);
        expect(labelNodes[0].nodeType).toBe(Node.COMMENT_NODE);
        expect(labelNodes[1].nodeType).toBe(Node.TEXT_NODE);
        expect((labelNodes[1] as Text).textContent).toBe('Dynamische waarde');
        expect(labelNodes[2].nodeType).toBe(Node.COMMENT_NODE);
        expect(dataNodes).toHaveLength(3);
        expect(dataNodes[1].nodeType).toBe(Node.TEXT_NODE);
        expect((dataNodes[1] as Text).textContent).toBe('42');
    });
});
