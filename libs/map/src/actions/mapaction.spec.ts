import { VlBaseMapAction } from './mapaction';
import Interaction from 'ol/interaction/Interaction';

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
});
