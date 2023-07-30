import { AnimationMixer, BoxGeometry, GridHelper, Mesh, MeshStandardMaterial, Scene } from "three";
import { gameCongig } from "../data";
import { IModelConfig } from "../types";
import path from "path-browserify";
import { loaders } from "./loaders";
import { isDebug } from "./debug";


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

        if (gameCongig.models) {
            gameCongig.models.forEach((modelData, index) => {
                this._loadModel(modelData)
            })
        }

    }
    _loadModel(modelData: IModelConfig) {
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

            gltf.scene.scale.setScalar(gameCongig.unitScale)

            if (modelData.scale !== undefined) {
                gltf.scene.scale.setScalar(modelData.scale * gameCongig.unitScale)
            }

            if (modelData.translate !== undefined) {
                gltf.scene.position.set(modelData.translate[0], modelData.translate[1], modelData.translate[2])
            }

            this.add(gltf.scene)
        })
    }
    update(frameDelta: number) {
        this.animationMixers.forEach(mixer => mixer.update(frameDelta / 1000))
    }
}