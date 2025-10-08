import VectorSource from 'ol/source/Vector';
import { VlSnapInteraction } from './snap-interaction';

describe('jest - map - snap-interaction', () => {
    it('bij het aanmaken van een snap interactie zullen de options correct worden gezet', () => {
        const source = new VectorSource({ features: [] });
        const snapInteraction = new VlSnapInteraction(source);
        expect((snapInteraction as any).source_).toBe(source);
        expect((snapInteraction as any).pixelTolerance_).toBe(7);
    });

    it('pixel tolerance kan ook meegegeven worden', () => {
        const source = new VectorSource({ features: [] });
        const snapInteraction = new VlSnapInteraction(source, { pixelTolerance: 1000 });
        expect((snapInteraction as any).source_).toBe(source);
        expect((snapInteraction as any).pixelTolerance_).toBe(1000);
    });
});
