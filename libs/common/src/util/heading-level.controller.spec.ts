import { HeadingLevelController, HeadingLevelHost } from './heading-level.controller';

const createHost = (headingLevel: unknown): HeadingLevelHost => {
    const element = document.createElement('vl-example');
    return Object.assign(element, {
        headingLevel,
        addController: () => undefined,
        removeController: () => undefined,
        requestUpdate: () => undefined,
        updateComplete: Promise.resolve(true),
    });
};

describe('jest - common - heading-level controller', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
        warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
        warn.mockRestore();
    });

    it('should register itself on the host', () => {
        const host = createHost('');
        const addController = jest.spyOn(host, 'addController');
        const controller = new HeadingLevelController(host, '3');

        expect(addController).toHaveBeenCalledWith(controller);
    });

    it('should return the tag of the heading level, or the fallback', () => {
        expect(new HeadingLevelController(createHost('2'), '3').tag).toBe(
            new HeadingLevelController(createHost(''), '2').tag,
        );
        expect(new HeadingLevelController(createHost('7'), '4').tag).toBe(
            new HeadingLevelController(createHost(''), '4').tag,
        );
    });

    it('should return no tag without a valid level and without fallback, and still warn', () => {
        const controller = new HeadingLevelController(createHost('7'), undefined);
        controller.hostUpdate();

        expect(controller.tag).toBeUndefined();
        expect(new HeadingLevelController(createHost(''), undefined).tag).toBeUndefined();
        expect(warn).toHaveBeenCalledTimes(1);
    });

    it('should warn once per invalid value, with the tag name of the host', () => {
        const host = createHost('7');
        const controller = new HeadingLevelController(host, '3');

        controller.hostUpdate();
        controller.hostUpdate();

        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledWith(
            'vl-example: de waarde "7" van het attribuut "heading-level" is ongeldig. Gebruik een waarde tussen 1 en 6.',
        );
    });

    it('should not warn for a valid value or without a value', () => {
        ['1', '6', 2, '', null, undefined].forEach((level) =>
            new HeadingLevelController(createHost(level), '3').hostUpdate(),
        );

        expect(warn).not.toHaveBeenCalled();
    });

    it('should warn again when the host gets another invalid value', () => {
        const host = createHost('7');
        const controller = new HeadingLevelController(host, '3');

        controller.hostUpdate();
        host.headingLevel = 'h2';
        controller.hostUpdate();

        expect(warn).toHaveBeenCalledTimes(2);
    });

    it('should warn for the number 0', () => {
        new HeadingLevelController(createHost(0), '3').hostUpdate();

        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('de waarde "0"'));
    });

    it('should warn again when an invalid value returns after a valid one', () => {
        const host = createHost('7');
        const controller = new HeadingLevelController(host, '3');

        controller.hostUpdate();
        host.headingLevel = '2';
        controller.hostUpdate();
        host.headingLevel = '7';
        controller.hostUpdate();

        expect(warn).toHaveBeenCalledTimes(2);
    });
});
