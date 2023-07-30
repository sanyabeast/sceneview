import { TextureLoader, WebGLRenderer } from "three";
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


export const loaders = {
    textureLoader: null,
    rgbeLoader: null,
    dracoLoader: null,
    ktx2Loader: null,
    gltfLoader: null,
}

export function initLoaders(renderer: WebGLRenderer) {
    loaders.textureLoader = new TextureLoader()
    loaders.rgbeLoader = new RGBELoader()
    loaders.ktx2Loader = new KTX2Loader().setTranscoderPath('lib/three/basis/')
    loaders.dracoLoader = new DRACOLoader();
    loaders.dracoLoader.setDecoderPath('lib/three/draco/gltf/');

    loaders.gltfLoader = new GLTFLoader()
        .setDRACOLoader(loaders.dracoLoader)
        .setMeshoptDecoder(MeshoptDecoder)
        .setKTX2Loader(loaders.ktx2Loader)
}