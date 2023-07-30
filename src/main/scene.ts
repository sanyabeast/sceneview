import { AnimationMixer, BoxGeometry, GridHelper, Material, Mesh, MeshStandardMaterial, Object3D, Scene } from "three";
import { config } from "../config";
import { IModelConfig } from "../types";
import path from "path-browserify";
import { loaders } from "./loaders";
import { isDebug } from "./debug";
import { logd } from "./utils";
import { stat } from "fs";
import { state } from "./main";


export class GameScene extends Scene {
    actions = null
    animationMixers: AnimationMixer[]

    constructor() {
        super()

        this.animationMixers = []

        // main scene setup
        if (isDebug) {
            this.add(new GridHelper(20, 10))
        }

        this._initialize()

    }

    async _initialize() {
        if (config.models) {
            for (let i = 0; i < config.models.length; i++) {
                let modelData = config.models[i]
                await this._loadModel(modelData)
            }
        }

        this._onReady()
    }

    _loadModel(modelData: IModelConfig): Promise<Object3D> {
        logd('GameScene._loadModel', `loading model from ${modelData.src}`)
        return new Promise((resolve) => {
            setTimeout(() => {
                const dirPath = path.dirname(modelData.src);
                const modelName = path.basename(modelData.src);

                loaders.gltfLoader.setPath(dirPath + '/')
                loaders.gltfLoader.load(modelName, (gltf) => {
                    if (gltf.animations) {
                        let animationMixer = new AnimationMixer(gltf.scene);
                        animationMixer.timeScale = 1
                        let actions = []

                        gltf.animations.forEach((animationClip) => {
                            actions.push(animationMixer.clipAction(animationClip))
                        })

                        actions.forEach((action) => {
                            action.enabled = true
                            action.play()
                        })

                        this.animationMixers.push(animationMixer)
                    }

                    if (modelData.lightScale !== undefined) {
                        gltf.scene.traverse((object) => {
                            if (object.isLight) {
                                if (modelData.lightScale > 0) {
                                    object.intensity *= modelData.lightScale;
                                } else {
                                    object.visible = false
                                }
                            }
                        })
                    }

                    gltf.scene.scale.setScalar(config.unitScale)

                    if (modelData.scale !== undefined) {
                        gltf.scene.scale.setScalar(modelData.scale * config.unitScale)
                    }

                    if (modelData.translate !== undefined) {
                        gltf.scene.position.set(modelData.translate[0], modelData.translate[1], modelData.translate[2])
                    }

                    gltf.scene.traverse((object) => {
                        if (object.isMesh) {
                            object.receiveShadow = modelData.receiveShadow === true
                            object.castShadow = modelData.castShadow === true

                            let materials = Array.isArray(object.material) ? object.material : [object.material]
                            materials.forEach((material) => {

                                material.envIntensity = modelData.envIntensity === undefined ? 1 : modelData.envIntensity;
                                material.emissiveIntensity = modelData.emissiveIntensity === undefined ? 1 : modelData.emissiveIntensity;

                                this._patchMaterial(material)
                            })
                        }
                    })

                    this.add(gltf.scene);
                    resolve(gltf.scene);
                })
            })
        })
    }

    _patchMaterial(material: Material) {
        // material.onBeforeCompile(()=>{})
    }

    _onReady() {
        state.sceneIsReady = true

        if ((window as any).onSceneReady !== undefined) {
            (window as any).onSceneReady();
        }

        console.log(`scene is ready`)
    }

    update(frameDelta: number) {
        this.animationMixers.forEach(mixer => mixer.update(frameDelta / 1000))
    }
}