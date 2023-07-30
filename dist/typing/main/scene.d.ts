import { AnimationMixer, Scene } from "three";
import { IModelConfig } from "../types";
export declare class GameScene extends Scene {
    actions: any;
    animationMixers: AnimationMixer[];
    constructor();
    _loadModel(modelData: IModelConfig): void;
    update(frameDelta: number): void;
}
