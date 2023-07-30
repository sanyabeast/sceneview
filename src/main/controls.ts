import { MapControls } from 'three/examples/jsm/controls/MapControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class GameCameraControl extends OrbitControls {
    constructor(camera, domElement) {
        super(camera, domElement)

        this.screenSpacePanning = false;
        this.minDistance = 20;
        this.maxDistance = 1000;
        this.maxPolarAngle = (Math.PI / 2.5);
        this.maxPolarAngle = (Math.PI);
        this.enableDamping = true
        this.dampingFactor = 0.005
        this.panSpeed = 1
    }
}