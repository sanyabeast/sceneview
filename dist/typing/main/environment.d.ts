import { DirectionalLight, Group, FogExp2, AmbientLight } from "three";
import { Lensflare } from "three/examples/jsm/objects/LensFlare";
import { IStandaloneFlareConfig, ILightConfig } from "../types";
export declare class GameEnvironment extends Group {
    sun: DirectionalLight;
    ambient: AmbientLight;
    fog: FogExp2;
    flares: Lensflare[];
    constructor();
    _createLight(lightData: ILightConfig): void;
    _createFlare(flareConfig: IStandaloneFlareConfig): void;
    update(frameDelta: number): void;
}
