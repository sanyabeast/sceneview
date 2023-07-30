import { debounce } from 'lodash';
import { Pane } from 'tweakpane';
import { state } from './main';

export const isDebug: boolean = true

export const monitoringData: { [x: string]: string } = {}

export function initDebugGUI({ scene, camera, renderer }) {
    const controlPane = new Pane();
    const updateProjectionMatrix = debounce(() => camera.updateProjectionMatrix(), 100)

    controlPane.addInput(camera, 'fov', {
        min: 30,
        max: 179,
    }).on('change', e => updateProjectionMatrix());

    controlPane.addInput({ intensity: 1 }, 'intensity', {
        label: "1St Light Intensity",
        min: 0,
        max: 10,
    }).on('change', ({ value }) => {
        if (state.environment.lights[0] !== undefined){
            state.environment.lights[0].intensity = value
        }
    });

    for (let k in monitoringData) {
        controlPane.addMonitor(monitoringData, k);
    }
}