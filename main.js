// Get canvas
const canvas = document.getElementById("renderCanvas");

// Create engine
const engine = new BABYLON.Engine(canvas, true);

// Create scene
const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // Camera
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3,
        5,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    // Light
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 10, height: 10 },
        scene
    );

    // Load 3D model (GLB/GLTF)
    BABYLON.SceneLoader.Append(
        "./assets/",      // folder path
        "model.glb",      // model filename
        scene,
        (scene) => {
            console.log("Model loaded successfully!");
            const model = scene.meshes[scene.meshes.length - 1];

            // Optional: rotate model slowly
            scene.registerBeforeRender(() => {
                model.rotation.y += 0.01;
            });
        },
        null,
        (scene, message, exception) => {
            console.error("Error loading model:", message, exception);
        }
    );

    return scene;
};

const scene = createScene();

// Render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Resize canvas
window.addEventListener("resize", () => {
    engine.resize();
});
