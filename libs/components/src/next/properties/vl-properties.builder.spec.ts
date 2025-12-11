import { buildSpan, buildData, buildDiv, buildLabel } from '@domg-wc/common-utilities/util';
import { buildProperties } from './vl-properties.builder';

describe('buildProperties tests', () => {
    beforeEach(() => {
        // console logging afzetten
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('should build empty properties for a null element', () => {
        expect(buildProperties(null, true)).toEqual([]);
    });

    it('should build empty properties for empty elements', () => {
        expect(buildProperties([], true)).toEqual([]);
    });

    it('should build properties for an array of labels and data', () => {
        const elements: Element[] = [];
        elements.push(buildLabel('Woonplaats'));
        elements.push(buildData('Brussel'));
        elements.push(buildLabel('Postcode'));
        elements.push(buildData('1000'));
        expect(buildProperties(elements, true)).toEqual([
            {
                items: [
                    {
                        labels: ['Woonplaats'],
                        data: ['Brussel'],
                    },
                    {
                        labels: ['Postcode'],
                        data: ['1000'],
                    },
                ],
            },
        ]);
    });

    it('should build properties for an array of labels and data that contain html', () => {
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

    it('should build properties for an array of columns', () => {
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
                        labels: ['Woonplaats'],
                        data: ['Brussel'],
                    },
                    {
                        labels: ['Postcode'],
                        data: ['1000'],
                    },
                ],
            },
        ]);
    });
});
