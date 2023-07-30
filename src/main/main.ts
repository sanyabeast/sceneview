import { PerspectiveCamera, WebGLRenderer, Scene, sRGBEncoding } from 'three';
import { GameCameraControl } from './controls';
import { initDebugGUI } from './debug';
import { config } from '../config'
import { GameEnvironment } from './environment';
import { GameScene } from './scene';
import { isMobileDevice } from './utils';
import { initLoaders } from './loaders';
import { IState } from '../types';

export const state: IState = {
    renderer: null,
    scene: null,
    camera: null,
    defaultCamera: null,
    canvas: null,
    environment: null,
    controls: null,
    sceneIsReady: false,
    envIsReady: false
};

// global access
(window as any).state = state;

export function main() {
    const pixelRatio = window.devicePixelRatio
    const canvas = document.querySelector('#canvas');
    const renderer = state.renderer = new WebGLRenderer({
        canvas,
        antialias: !isMobileDevice(),
        logarithmicDepthBuffer: config.logarithmicDepthBuffer
    });

    renderer.outputEncoding = sRGBEncoding;
    renderer.setPixelRatio(isMobileDevice() ? 1 : pixelRatio);

    // shadows mapping 
    if (config.shadows !== undefined) {
        renderer.shadowMap.enabled = config.shadows.enabled;
        renderer.shadowMap.autoUpdate = config.shadows.autoUpdate
    }

    // loaders
    initLoaders(renderer)

    // default camera
    const camera = state.camera = state.defaultCamera = new PerspectiveCamera(
        config.cameraDefaultFov,
        1, config.cameraNearClip,
        config.cameraFarClip
    );

    const scene = state.scene = new GameScene();
    const environment = state.environment = new GameEnvironment()
    const controls = state.controls = new GameCameraControl()


    let prevFrameTime = +new Date()
    function render() {
        let now = +new Date()
        let frameTimeDelta = now - prevFrameTime
        requestAnimationFrame(render);
        scene.update(frameTimeDelta)
        environment.update(frameTimeDelta)
        controls.update()

        if (state.sceneIsReady && state.envIsReady) {
            renderer.render(scene, state.camera);
        }

        prevFrameTime = now
    }

    function updateRenderSize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", updateRenderSize);

    initDebugGUI({
        scene,
        camera,
        renderer
    })

    updateRenderSize()
    requestAnimationFrame(render);
}

main();