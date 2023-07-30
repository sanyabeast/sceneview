import { PerspectiveCamera, WebGLRenderer, Scene, sRGBEncoding } from 'three';
import { GameCameraControl } from './main/controls';
import { initDebugGUI } from './main/debug';
import { gameCongig, gameState } from './data'
import { GameEnvironment } from './main/environment';
import { GameScene } from './main/scene';
import { isMobileDevice } from './main/utils';
import { initLoaders } from './main/loaders';

function main() {
    const pixelRatio = window.devicePixelRatio
    const canvas = document.querySelector('#canvas');
    const renderer = gameState.renderer = new WebGLRenderer({
        canvas,
        antialias: !isMobileDevice(),
        logarithmicDepthBuffer: gameCongig.logarithmicDepthBuffer
    });

    renderer.outputEncoding = sRGBEncoding;

    const camera = gameState.camera = new PerspectiveCamera(
        gameCongig.cameraDefaultFov,
        1, gameCongig.cameraNearClip,
        gameCongig.cameraFarClip
    );

    initLoaders(renderer)

    const scene = gameState.scene = new GameScene();
    const environment = gameState.environment = new GameEnvironment()
    const controls = gameState.controls = new GameCameraControl(camera, renderer.domElement)
    renderer.setPixelRatio(isMobileDevice() ? 1 : pixelRatio);

    scene.add(environment)

    let prevFrameTime = +new Date()
    function render() {
        let now = +new Date()
        let frameTimeDelta = now - prevFrameTime
        requestAnimationFrame(render);

        scene.update(frameTimeDelta)
        environment.update(frameTimeDelta)
        controls.update()
        renderer.render(scene, gameState.camera || camera);
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

    (window as any).state = gameState
}

main();