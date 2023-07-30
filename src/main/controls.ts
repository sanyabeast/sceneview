import { MapControls } from 'three/examples/jsm/controls/MapControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { state } from './main';

export class GameCameraControl extends OrbitControls {
    constructor() {
        super(state.defaultCamera, state.renderer.domElement)

        this.screenSpacePanning = false;
        this.minDistance = 20;
        this.maxDistance = 1000;
        this.maxPolarAngle = (Math.PI / 2.5);
        this.maxPolarAngle = (Math.PI);
        this.enableDamping = true
        this.dampingFactor = 0.005
        this.panSpeed = 1
    }

    override update(): boolean {
        super.update()

        return false
    }
}