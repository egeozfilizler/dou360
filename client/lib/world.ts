import {
  PerspectiveCamera,
  DirectionalLight,
  HemisphereLight,
  Scene,
  WebGLRenderer,
  Camera,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Loop {
  public camera: Camera;
  public scene: Scene;
  public renderer: WebGLRenderer;
  public updatables: any[];

  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    for (const object of this.updatables) {
      if ((object as any).update) (object as any).update();
    }
  }
}

export class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;

  constructor(container: HTMLElement) {
    // Ensure we don't accidentally keep multiple canvases in the same container
    // (can happen in React StrictMode dev double-mount).
    const existingCanvas = container.querySelector("canvas");
    if (existingCanvas) {
      existingCanvas.remove();
    }

    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = createControls(this.camera, this.renderer.domElement);

    container.append(this.renderer.domElement);
    this.loop.updatables.push(this.controls);

    const { ambientLight, mainLight } = createLights();
    this.scene.add(ambientLight, mainLight);

    new Resizer(container, this.camera, this.renderer);
  }

  async init(modelPath: string) {
    const { model } = await loadModel(modelPath);
    this.scene.add(model);

    this.controls.target.copy(model.position);
    this.controls.update();
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
    this.renderer.dispose();
  }
}

const createRenderer = (): WebGLRenderer => {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
};

const createCamera = (): PerspectiveCamera => {
  const camera = new PerspectiveCamera(35, 1, 0.1, 50000);
  camera.position.set(-50, 50, 100);
  return camera;
};

const createScene = (): Scene => {
  const scene = new Scene();
  scene.background = null;
  return scene;
};

const createLights = () => {
  const ambientLight = new HemisphereLight("white", "darkslategrey", 3);
  const mainLight = new DirectionalLight("white", 5);
  mainLight.position.set(100, 100, 100);

  return { ambientLight, mainLight };
};

const createControls = (camera: Camera, canvas: HTMLElement): OrbitControls => {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 10000;
  return controls;
};

const loadModel = async (path: string) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  );
  loader.setDRACOLoader(dracoLoader);

  const modelData = await loader.loadAsync(path);
  const model = modelData.scene;
  model.position.set(0, 20, 0);
  return { model };
};

class Resizer {
  constructor(container: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.setSize(container, camera, renderer);
    window.addEventListener("resize", () => {
      this.setSize(container, camera, renderer);
    });
  }

  private setSize(container: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}


