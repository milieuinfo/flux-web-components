import { VlBaseMapAction } from './mapaction';
import Interaction from 'ol/interaction/Interaction';
import OlVectorLayer from 'ol/layer/Vector';
import OlVectorSource from 'ol/source/Vector';
import { OlVectorLayerType } from '../vl-map.model';

describe('jest - map - mapaction', () => {
    it('kan een interactie toevoegen die niet actief staat', () => {
        const VlmapAction = new VlBaseMapAction([new Interaction(), new Interaction()]);
        const extraInteractie = new Interaction();
        VlmapAction.addInteraction(extraInteractie);
        expect(VlmapAction.interactions.length).toBe(3);
        expect(extraInteractie.getActive()).toBe(false);
    });

    it('zet alle interacties default op inactief', () => {
        const VlmapAction = new VlBaseMapAction([new Interaction(), new Interaction()]);
        VlmapAction.interactions.forEach((interaction) => expect(interaction.getActive()).toBe(false));
    });

    it('kan de interacties actief zetten', () => {
        const VlmapAction = new VlBaseMapAction([new Interaction(), new Interaction()]);
        VlmapAction.activate();
        VlmapAction.interactions.forEach((interaction) => expect(interaction.getActive()).toBe(true));
    });

    it('kan de interacties terug deactief zetten', () => {
        const VlmapAction = new VlBaseMapAction([new Interaction(), new Interaction()]);
        VlmapAction.deactivate();
        VlmapAction.interactions.forEach((interaction) => expect(interaction.getActive()).toBe(false));
    });

    it('is enkel van toepassing op zijn eigen layer', () => {
        const layer = new OlVectorLayer({ source: new OlVectorSource() }) as OlVectorLayerType;
        const otherLayer = new OlVectorLayer({ source: new OlVectorSource() }) as OlVectorLayerType;
        const VlmapAction = new VlBaseMapAction([new Interaction()]);
        VlmapAction.layer = layer;
        expect(VlmapAction.appliesToLayer(layer)).toBe(true);
        expect(VlmapAction.appliesToLayer(otherLayer)).toBe(false);
    });

    it('heeft een zichtbare layer enkel wanneer zijn eigen layer zichtbaar is', () => {
        const layer = new OlVectorLayer({ source: new OlVectorSource() }) as OlVectorLayerType;
        const VlmapAction = new VlBaseMapAction([new Interaction()]);
        VlmapAction.layer = layer;
        layer.setVisible(true);
        expect(VlmapAction.hasVisibleLayer()).toBe(true);
        layer.setVisible(false);
        expect(VlmapAction.hasVisibleLayer()).toBe(false);
    });
});
