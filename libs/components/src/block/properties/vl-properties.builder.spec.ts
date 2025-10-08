import { buildSpan, buildData, buildDiv, buildLabel } from '@resources/utils-test';
import { buildProperties } from './vl-properties.builder';

describe('jest - components - vl-properties', () => {
    beforeEach(() => {
        // console logging afzetten
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('buildProperties should build empty properties for a null element', () => {
        expect(buildProperties(null)).toEqual([]);
    });

    it('buildProperties should build empty properties for empty elements', () => {
        expect(buildProperties([])).toEqual([]);
    });

    it('buildProperties should build properties for an array of labels and data', () => {
        const elements: Element[] = [];
        elements.push(buildLabel('Woonplaats'));
        elements.push(buildData('Brussel'));
        elements.push(buildLabel('Postcode'));
        elements.push(buildData('1000'));
        expect(buildProperties(elements)).toEqual([
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

    it('buildProperties should build properties for an array of labels and data that contain html', () => {
        const elements: Element[] = [];
        elements.push(buildLabel('<span style="color: red">Woonplaats</span>'));
        elements.push(buildData('<span style="color: blue">Brussel</span>'));
        const labelElement = buildSpan('Woonplaats');
        labelElement.setAttribute('style', 'color: red');
        const dataElement = buildSpan('Brussel');
        dataElement.setAttribute('style', 'color: blue');
        expect(buildProperties(elements)).toEqual([
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

    it('buildProperties sshould build properties for an array of columns', () => {
        const columns: Element[] = [];
        const column = buildDiv(null, 'column');
        columns.push(column);
        column.appendChild(buildLabel('Woonplaats'));
        column.appendChild(buildData('Brussel'));
        column.appendChild(buildLabel('Postcode'));
        column.appendChild(buildData('1000'));
        expect(buildProperties(columns)).toEqual([
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
