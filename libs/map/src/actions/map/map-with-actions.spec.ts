import DragRotate from 'ol/interaction/DragRotate';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import KeyboardPan from 'ol/interaction/KeyboardPan';
import KeyboardZoom from 'ol/interaction/KeyboardZoom';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import PinchZoom from 'ol/interaction/PinchZoom';
import PinchRotate from 'ol/interaction/PinchRotate';
import DragPan from 'ol/interaction/DragPan';
import DragZoom from 'ol/interaction/DragZoom';
import Collection from 'ol/Collection';
import Interaction from 'ol/interaction/Interaction';
import VectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import { VlMapWithActions } from './map-with-actions';
import { VlBaseMapAction } from '../mapaction';
import { VlDrawLineAction } from '../draw/draw-line-action';
import { VlSelectActions } from '../select/select-actions';
import { VlMapAction } from '../../components/action/vl-map-action';
import { OlVectorLayerType } from '../../vl-map.model';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

// TODO: Review timeout
// Use to wait for map action to be activated because of timeout for activating a mapaction in map-with-actions
function sleep() {
    return new Promise((resolve) => setTimeout(resolve, VlMapWithActions.CLICK_COUNT_TIMEOUT + 10));
}

describe('jest - map - map-with-actions', () => {
    let map;
    let action1;
    let action2;

    class VlTestMapWithActions extends VlMapWithActions {
        getDefaultActiveAction() {
            return undefined;
        }

        getCurrentActiveAction() {
            return undefined;
        }

        activateDefaultAction() {
            return undefined;
        }
    }

    beforeEach(() => {
        action1 = new VlBaseMapAction([new Interaction(), new Interaction()]);
        action2 = new VlBaseMapAction([new Interaction(), new Interaction(), new Interaction()]);
    });

    it('adds the interactions of all actions to the map', () => {
        map = new VlTestMapWithActions({
            actions: [action1, action2],
        });

        expect(map.getInteractions().getLength()).toBe(14); // 9 standaard + 5
    });

    it('can add a new action to the map', async () => {
        map = new VlTestMapWithActions({
            actions: [action1, action2],
        });

        expect(map.actions.length).toBe(2);
        expect(map.getInteractions().getLength()).toBe(14);

        const newAction = new VlBaseMapAction([new Interaction(), new Interaction()]);

        map.addAction(newAction);
        await sleep();

        expect(map.actions.length).toBe(3);
        expect(map.actions[2]).toBe(newAction);
        expect(map.getInteractions().getLength()).toBe(16);
    });

    it('can remove an action from the map', async () => {
        map = new VlTestMapWithActions({
            actions: [action1, action2],
        });

        const newAction = new VlBaseMapAction([new Interaction(), new Interaction()]);
        newAction.element = {
            reset: () => {},
        } as VlMapAction;

        map.addAction(newAction);
        await sleep();

        map.removeAction(newAction);

        expect(map.actions.length).toBe(2);
        expect(map.actions.indexOf(newAction)).toBe(-1);
        expect(map.getInteractions().getLength()).toBe(14);
    });

    it('if the action to be removed is the current action, the default is activated', async () => {
        map = new VlTestMapWithActions({
            actions: [action1, action2],
        });

        const activateDefaultActionSpy = jest.spyOn(map, 'activateDefaultAction').mockClear();
        const newAction = new VlBaseMapAction([new Interaction(), new Interaction()]);
        newAction.element = {
            reset: () => {},
        } as VlMapAction;

        map.addAction(newAction);
        await sleep();

        map.activateAction(newAction);
        await sleep();

        map.removeAction(newAction);

        expect(activateDefaultActionSpy).toHaveBeenCalled();
    });

    it('matcht een single-layer action op zijn layer en niet op een vreemde layer', () => {
        const layer = new OlVectorLayer({ source: new VectorSource() }) as OlVectorLayerType;
        const otherLayer = new OlVectorLayer({ source: new VectorSource() }) as OlVectorLayerType;
        action1.layer = layer;

        map = new VlTestMapWithActions({ actions: [action1] });

        expect(map.getLayerActions(layer)).toContain(action1);
        expect(map.getLayerActions(otherLayer)).not.toContain(action1);
    });

    it('returns a multi-layer action for each of its coupled layers, not just the proxy layer', () => {
        const layer1 = new OlVectorLayer({}) as OlVectorLayerType;
        const layer2 = new OlVectorLayer({}) as OlVectorLayerType;
        const otherLayer = new OlVectorLayer({}) as OlVectorLayerType;
        const selectActions = new VlSelectActions([layer1, layer2]);

        map = new VlTestMapWithActions({
            actions: [selectActions],
        });

        expect(map.getLayerActions(layer1)).toContain(selectActions);
        expect(map.getLayerActions(layer2)).toContain(selectActions);
        expect(map.getLayerActions(otherLayer)).not.toContain(selectActions);
    });

    it('there are 9 predefined interactions', () => {
        const map = new VlTestMapWithActions({
            actions: [],
        });

        expect(map.getInteractions().getLength()).toBe(9); // There are 9 standard interactions
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragRotate).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DoubleClickZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof KeyboardPan).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof KeyboardZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof MouseWheelZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof PinchZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof PinchRotate).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragPan).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragZoom).length
        ).toBe(1);
    });

    it('when creating a map with actions, standard functionality is added to the map that on escape the first map action gets activated when no action is active', () => {
        map = new VlTestMapWithActions({
            actions: [],
        });

        jest.spyOn(map, 'activateDefaultAction');

        const event = new KeyboardEvent('keydown', { keyCode: 27 });
        document.body.dispatchEvent(event);

        expect(map.activateDefaultAction).toHaveBeenCalled();
    });

    it('when creating a map with actions, standard functionality is added to the map that on escape the current active action gets stopped when an action is active', async () => {
        const source = new VectorSource({});

        const layer = {
            getSource: () => source,
        };

        const drawLineAction = new VlDrawLineAction(layer, () => {}, {});

        map = new VlTestMapWithActions({
            actions: [drawLineAction],
        });

        jest.spyOn(drawLineAction, 'stop');

        map.activateAction(drawLineAction);
        await sleep();

        const currentActiveActionStub = jest.spyOn(map, 'getCurrentActiveAction').mockReturnValue(drawLineAction);

        const event = new KeyboardEvent('keydown', { keyCode: 27 });
        document.body.dispatchEvent(event);

        expect(drawLineAction.stop).toHaveBeenCalled();

        currentActiveActionStub.mockReset();
    });

    it('if desired, the standard escape functionality can be disabled when creating a map with actions', () => {
        const map = new VlTestMapWithActions({
            actions: [],
            disableEscapeKey: true,
        });

        const activateDefaultActionStub = jest.spyOn(map, 'activateDefaultAction').mockImplementation();
        expect(map.activateDefaultAction).not.toHaveBeenCalled();

        const event = new KeyboardEvent('keydown', { keyCode: 27 });
        document.body.dispatchEvent(event);

        expect(map.activateDefaultAction).not.toHaveBeenCalled();

        activateDefaultActionStub.mockReset();
    });

    it('if desired, the standard rotation functionality can be disabled when creating a map with actions', () => {
        const map = new VlTestMapWithActions({
            actions: [],
            disableRotation: true,
        });

        expect(map.getInteractions().getLength()).toBe(7); // 9-2=7
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DoubleClickZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof KeyboardPan).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof KeyboardZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof MouseWheelZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof PinchZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragPan).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragRotate).length
        ).toBe(0);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof PinchRotate).length
        ).toBe(0);
    });

    it('if desired, extra interactions can be added when creating a map with actions', () => {
        const map = new VlTestMapWithActions({
            actions: [],
            interactions: new Collection([new PinchZoom(), new PinchRotate()]),
            disableRotation: true,
        });

        expect(map.getInteractions().getLength()).toBe(9); // 9-2+2=9
    });

    it('if desired, zooming with the mouse wheel can be turned off', () => {
        const map = new VlTestMapWithActions({
            actions: [],
            disableMouseWheelZoom: true,
        });

        expect(map.getInteractions().getLength()).toBe(8);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragRotate).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DoubleClickZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof KeyboardPan).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof KeyboardZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof MouseWheelZoom).length
        ).toBe(0);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof PinchZoom).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof PinchRotate).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragPan).length
        ).toBe(1);
        expect(
            map
                .getInteractions()
                .getArray()
                .filter((interaction) => interaction instanceof DragZoom).length
        ).toBe(1);
    });
});
