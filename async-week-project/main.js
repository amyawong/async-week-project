import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // { OrbitControls } is a class from a module
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// need three objects: 1. Scene, 2. Camera, 3. Renderer

const scene = new THREE.Scene(); // scene is like a container that holds all objects, cameras, and lights

const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
// in order to look at things inside the scene, we need a camera (there are many diff types of cameras in three.js)
// PerspectiveCamera mimics what human eyes see
  // first arg is field of view (amount of world visible based off a 360º view)
  // second arg is aspect ratio (based off user's browser window)
  // last two args are view frustrum (to control which objects are visible relative to camera)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
// to render out the actual graphics to the scene; renderer needs to know which DOM element to use (in this case, it'll be canvas)

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight ) // to make it a full screen canvas

camera.position.setZ(30); // move camera along z-axis

renderer.render( scene, camera ); // .render == draw

// "straw" object
class CustomSinCurve extends THREE.Curve {
	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

const path = new CustomSinCurve( 10 );
const geometry = new THREE.TubeGeometry( path, 1, 1, 50, false );
const material = new THREE.MeshStandardMaterial( { color: 0xffccff } );
const mesh = new THREE.Mesh( geometry, material );
geometry.scale(0.5, 1, 1)
scene.add( mesh );

// light source
const pointLight = new THREE.PointLight(0xffffff); // pointLight emits light in all directions, pass in a hexidecimal literal
pointLight.position.set(25, 25, 25); // position it away from the center 
scene.add(pointLight) // add to scene

const lightHelper = new THREE.PointLightHelper(pointLight); // shows position of pointLight
const gridHelper = new THREE.GridHelper(200, 50) // draws a 2D grid along the scene
scene.add(lightHelper, gridHelper)

// ObritControls allows us to move around scene with mouse; listens to dom events on mouse and updates camera position accordingly
const controls = new OrbitControls(camera, renderer.domElement);

// Populate scene with randomly generated stars
function addStar () {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24); // instantiate a SphereGeometry that has a radius of 0.25 
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff }); // create standard material and join them together as a mesh
  const star = new THREE.Mesh( geometry, material )

  // to randomly position stars throughout the scene:
  const [x, y, z] = Array(3).fill().map (()=> THREE.MathUtils.randFloatSpread( 100 )) // generate a random x, y, and z value for each star
  star.position.set(x, y, z); 
  scene.add(star); // add those stars to the scene
}

// to decide how many stars to add to scene; 200 value array, then for each value, call addStar()
Array(500).fill().forEach(addStar)

// -----------------------------------------------------------------------------------------------------------------------------

// add a background with a jpeg
const oceanTexture = new THREE.TextureLoader().load('underwater-background.jpg');
scene.background = oceanTexture;

// -----------------------------------------------------------------------------------------------------------------------------

// const bottleLoader = new GLTFLoader();
// bottleLoader.load('./models/plastic_bottle/scene.gltf', (gltfScene) => {
//   gltfScene.scene.rotation.y = Math.PI / 2;
//   gltfScene.scene.position.y = 3;
//   // gltfScene.scene.scale.set(10, 10, 10);
//   scene.add(gltfScene.scene)
// })

// const lotionLoader = new GLTFLoader();
// lotionLoader.load('./models/lotion_bottle/scene.gltf', (gltfScene) => {
//   gltfScene.scene.position.y = 3;
//   gltfScene.scene.scale.set(50, 50, 50);
//   scene.add(gltfScene.scene)
// })

// const cardLoader = new GLTFLoader();
// cardLoader.load('./models/nubank_credit_card/scene.gltf', (gltfScene) => {
//   gltfScene.scene.position.y = 3;
//   // gltfScene.scene.scale.set(10, 10, 10);
//   scene.add(gltfScene.scene)
// })

// const trashBag1Loader = new GLTFLoader();
// trashBag1Loader.load('./models/trash_bag1/scene.gltf', (gltfScene) => {
//   gltfScene.scene.rotation.y = Math.PI / 8;
//   gltfScene.scene.position.y = 20;
//   gltfScene.scene.scale.set(10, 10, 10);
//   scene.add(gltfScene.scene)
// })

// const forkLoader = new GLTFLoader();
// forkLoader.load('./models/plastic_fork/scene.gltf', (gltfScene) => {
//   gltfScene.scene.rotation.y = Math.PI / 8;
//   gltfScene.scene.position.y = 3;
//   // gltfScene.scene.scale.set(10, 10, 10);
//   scene.add(gltfScene.scene)
// })

// const boxLoader = new GLTFLoader();
// boxLoader.load('./models/plastic_burger_box/scene.gltf', (gltfScene) => {
//   gltfScene.scene.position.y = 3;
//   gltfScene.scene.scale.set(200, 200, 200);
//   scene.add(gltfScene.scene)
// })

let dvd;
const dvdLoader = new GLTFLoader();
dvdLoader.load('./models/dvd/scene.gltf', (gltfScene) => {
  dvd = gltfScene; // has properties: ['scene', 'scenes', 'animations', 'cameras', 'asset', 'parser', 'userData']
  // console.log(Object.getOwnPropertyNames(gltfScene.asset.extras.author));
  // console.log(gltfScene.asset.extras); // for giving credits
  // console.log(gltfScene.scene)
  gltfScene.scene.rotation.x = Math.PI / 2;
  gltfScene.scene.position.y = 3;
  gltfScene.scene.scale.set(5, 5, 5);
  scene.add(gltfScene.scene)
})

// ------------------------------------------------------------------------------------------------------------------------------------------------------

// scroll animation


// ------------------------------------------------------------------------------------------------------------------------------------------------------

// animation function
function animate () {
  // straw
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.005;
  // mesh.rotation.z += 0.01;

  // if (dvd) {
  //     dvd.scene.rotation.x += 0.01;
  //     dvd.scene.rotation.y += 0.05;
  //     dvd.scene.rotation.z += 0.01;
  // }
    
    controls.update(); // to make sure changes from dom mouse events are reflected in the UI
    
    requestAnimationFrame( animate ); // tells browser you want to perform an animation; recursively call function to make an infinite loop
  renderer.render( scene, camera );
}

animate();