import { Camera, WebGLRenderer } from "three"
import { GameScene } from "./main/scene"
import { GameEnvironment } from "./main/environment"
import { GameCameraControl as GameCameraControls } from "./main/controls"

export enum ELightType {
    Directional,
    Ambient,
    Point,
    Spot,
    Rect
}

export interface ILightConfig {
    type: ELightType,
    position: number[]
    intensity: number
    color: number
    flare: ILightFlareConfig
    distance?: number
    decay?: number
    angle?: number
    penumbra?: number
    width?: number
    height?: number
}

export interface ILightFlareConfig {
    count: number
    size: number
    distance: number
}
export interface IStandaloneFlareConfig extends ILightFlareConfig {
    position: number[]
    color: number
}


export interface IModelConfig {
    src: string,
    scale: number
    lightScale?: number
    translate?: number[]
}

export interface IGameState {
    renderer: WebGLRenderer,
    scene: GameScene,
    camera: Camera,
    canvas: HTMLCanvasElement,
    environment: GameEnvironment,
    controls: GameCameraControls,
}

export interface IGameConfig {
    unitScale: number
    cameraNearClip: number
    cameraFarClip: number
    cameraDefaultFov: number
    logarithmicDepthBuffer: boolean
    fog?: {
        density: number
        color: number
    }
    background?: {
        map: string,
        blurriness: number,
        intensity: number
    },
    lights?: ILightConfig[]
    flares?: IStandaloneFlareConfig[]
    models?: IModelConfig[]
}