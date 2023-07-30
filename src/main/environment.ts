import { DirectionalLight, Group, TextureLoader, EquirectangularReflectionMapping, SRGBColorSpace, HemisphereLight, Fog, FogExp2, Color, Light, Scene, AmbientLight, PointLight, SpotLight, RectAreaLight } from "three";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/LensFlare"
import { config } from "../config";
import { ELightType, IStandaloneFlareConfig, ILightConfig } from "../types";
import { loaders } from "./loaders";
import { state } from "./main";

const flaresTable = [
    {
        texture: 'assets/flares/lensflare0.png',
        size: 700,
        distance: 0
    },
    {
        texture: 'assets/flares/lensflare3.png',
        size: 60,
        distance: 0.6
    },
    {
        texture: 'assets/flares/lensflare3.png',
        size: 70,
        distance: 0.7
    },
    {
        texture: 'assets/flares/lensflare3.png',
        size: 120,
        distance: 0.9
    },
    {
        texture: 'assets/flares/lensflare3.png',
        size: 70,
        distance: 1
    }
]

export class GameEnvironment extends Group {
    sun: DirectionalLight = null
    ambient: AmbientLight = null
    fog: FogExp2 = null
    flares: Lensflare[]
    lights: Light[]

    constructor() {
        super()

        this.flares = []
        this.lights = []

        if (config.fog) {
            this.fog = new FogExp2(config.fog.color, config.fog.density)
        }

        if (config.lights) {
            config.lights.forEach((lightData, index) => {
                this._createLight(lightData)
            })
        }

        if (config.flares) {
            config.flares.forEach((flareData, index) => {
                this._createFlare(flareData)
            })
        }
        // Create the lens flare object

        if (config.background) {
            let envMap = loaders.rgbeLoader.load(config.background.map, () => {
                envMap.mapping = EquirectangularReflectionMapping;
                envMap.colorSpace = SRGBColorSpace;

                state.scene.background = envMap;
                state.scene.environment = envMap;
                state.scene.backgroundIntensity = config.background.intensity
                state.scene.backgroundBlurriness = config.background.blurriness

                state.envIsReady = true
            });
        } else {
            state.envIsReady = true
        }

        state.scene.add(this)
    }

    _createLight(lightData: ILightConfig): void {
        let light: Light = null
        switch (lightData.type) {
            case ELightType.Directional: {
                light = new DirectionalLight(lightData.color, lightData.intensity)
                break;
            }
            case ELightType.Ambient: {
                light = new AmbientLight(lightData.color, lightData.intensity)
                break;
            }
            case ELightType.Point: {
                light = new PointLight(lightData.color, lightData.intensity, lightData.distance, lightData.decay)
                break;
            }
            case ELightType.Spot: {
                light = new SpotLight(lightData.color, lightData.intensity, lightData.distance, lightData.angle, lightData.penumbra, lightData.decay)
                break;
            }
            case ELightType.Rect: {
                light = new RectAreaLight(lightData.color, lightData.intensity, lightData.width, lightData.height)
                break;
            }
        }

        if (lightData.position !== undefined) {
            light.position.set(lightData.position[0], lightData.position[1], lightData.position[2])
        }

        if (lightData.flare !== undefined) {
            this._createFlare({
                ...lightData.flare,
                position: [lightData.position[0], lightData.position[1], lightData.position[2]],
                color: light.color.getHex(),
            })
        }

        light.castShadow = lightData.castShadow === true

        this.add(light)
        this.lights.push(light)
    }

    _createFlare(flareConfig: IStandaloneFlareConfig) {
        const lensflare = new Lensflare();
        flaresTable.forEach((flareData, index) => {
            if (index < flareConfig.count) {
                const lensFlareTexture = loaders.textureLoader.load(flareData.texture);
                lensflare.addElement(new LensflareElement(lensFlareTexture, flareData.size * flareConfig.size, flareData.distance * flareConfig.distance, new Color(flareConfig.color)));
                lensflare.position.set(flareConfig.position[0], flareConfig.position[1], flareConfig.position[2]);
            }
        })

        this.add(lensflare);
    }

    update(frameDelta: number): void {

    }
}