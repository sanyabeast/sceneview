import { debounce } from 'lodash';
import { Pane } from 'tweakpane';

export const isDebug: boolean = true

export const monitoringData: { [x: string]: string } = {}

export function initDebugGUI({ scene, camera, renderer }) {
    const controlPane = new Pane();
    const updateProjectionMatrix = debounce(() => camera.updateProjectionMatrix(), 100)

    controlPane.addInput(camera, 'fov', {
        min: 30,
        max: 179,
    }).on('change', e => updateProjectionMatrix());

    for (let k in monitoringData) {
        controlPane.addMonitor(monitoringData, k);
    }
}