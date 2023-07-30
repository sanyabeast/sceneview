
import { ELightType, IConfig } from "./types"

export const config: IConfig = {
    unitScale: 0.1,
    cameraNearClip: 0.1,
    cameraFarClip: 10000,
    cameraDefaultFov: 60,
    logarithmicDepthBuffer: true,
    shadows: {
        enabled: true,
        autoUpdate: true
    },
    // default fogging
    fog: {
        density: 0.1,
        color: 0xeeeeee
    },
    // background
    background: {
        map: 'assets/hdr/atelier.hdr',
        blurriness: 1,
        intensity: 0.25
    },
    // additional lights
    lights: [
        {
            type: ELightType.Directional,
            position: [10, 100, 0],
            intensity: 1,
            color: 0xFFFFFF,
            flare: {
                size: 1,
                distance: 1,
                count: 4
            },
            castShadow: true
        },
        {
            type: ELightType.Point,
            position: [26, 38, 0],
            intensity: 2,
            color: 0xff0000,
            flare: {
                size: 1,
                distance: 1,
                count: 1
            },
            castShadow: true
        }
    ],
    // additional flares
    // flares: [
    //     {
    //         position: [0, 10, 0],
    //         count: 5,
    //         color: 0xFFFFFF,
    //         size: 1,
    //         distance: 1
    //     },
    //     {
    //         position: [1, 1, 1],
    //         count: 1,
    //         color: 0xFFFFFF,
    //         size: 0.2,
    //         distance: 0.2
    //     }
    // ],
    // models to load
    models: [
        {
            src: 'assets/models/littlest_tokyo.glb',
            scale: 1,
            lightScale: 0,
            receiveShadow: true,
            envIntensity: 1,
            emissiveIntensity: 10
        },
        {
            src: 'assets/models/parrot.glb',
            scale: 1,
            lightScale: 0,
            translate: [0, 25, 0],
            castShadow: true,
            envIntensity: 1
        },
        {
            src: 'assets/models/parrot.glb',
            scale: 1,
            lightScale: 0,
            translate: [25, 35, 0],
            castShadow: true,
            envIntensity: 1
        }
    ]
}
