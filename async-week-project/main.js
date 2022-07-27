import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // { OrbitControls } is a class from a module
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// need three objects: 1. Scene, 2. Camera, 3. Renderer

const scene = new THREE.Scene(); // scene is like a container that holds all objects, cameras, and lights

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
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
const geometry = new THREE.TubeGeometry( path, 1, 1, 20, false );
const material = new THREE.MeshStandardMaterial( { color: 0xffccff } );
const mesh = new THREE.Mesh( geometry, material );
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

// const ocean = new THREE.TextureLoader().load('./models/ocean_wave_-__wmaya/textures');
// scene.background = ocean;

// -----------------------------------------------------------------------------------------------------------------------------
// 3D bottle model loader


const loader = async () => {
  const bottle = new GLTFLoader().setPath('./models/plastic_bottle/');
  const bottlegltf = await bottle.loadAsync( 'scene.gltf' )
  // const sodacan2 = new GLTFLoader().setPath('./models/soda_can_art/');
  // const sodacan2gltf = await sodacan2.loadAsync( 'scene.gltf')
	scene.add( bottlegltf.scene );
  // scene.add( sodacan2gltf.scene )
}

loader();
// 3D cigarette model loader
// const cigarette = new GLTFLoader().setPath('./models/cigarette/');
// cigarette.load( 'scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
//   // renderer.render();
// }, 
// function ( error ) {
// 	console.error( error );
// } );

// 3D fork model loader
// const fork = new GLTFLoader().setPath('./models/plastic_fork/');
// fork.load( 'scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
// }, 
// function ( error ) {
// 	console.log( error );
// } );

// const sodacan = new GLTFLoader().setPath('./models/soda_can/');
// sodacan.load( 'scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
// }, 
// function ( error ) {
// 	console.log( error );
// } );

// also doesnt work
// const sodacan2 = new GLTFLoader().setPath('./models/soda_can_art/');
// sodacan2.load( 'scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
// }, 
// function ( error ) {
// 	console.log( error );
// } );

// 3D box model loader
// const box = new GLTFLoader().setPath('./models/plastic_burger_box/');
// box.load( 'scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
// }, 
// function ( error ) {
// 	console.log( error );
// } );

// kinda works but not really - 3D trash bag blue loader
// const trashBagBlue = new GLTFLoader().setPath('./models/trash_bag_blue/');
// trashBagBlue.load( 'scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
//   // renderer.render();
// }, 
// function ( error ) {
// 	console.error( error );
// } );

// doesn't work: 3D trash bag 1 loader
// const trashBag1 = new GLTFLoader().setPath('./models/trash_bag1');
// trashBag1.load( 'scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
//   // renderer.render();
// }, 
// function ( error ) {
// 	console.error( error );
// } );

// // doesn't work: 3D trash bag 2 loader
// const trashBag2 = new GLTFLoader().setPath('./models/trash_bag_2/');
// trashBag2.load( 'scene.gltf', function ( gltf ) {
// 	scene.add( gltf.scene );
//   renderer.render();
// }, 
// function ( error ) {
// 	console.error( error );
// } );


// ------------------------------------------------------------------------------------------------------------------------------------------------------
// scroll animation

// ------------------------------------------------------------------------------------------------------------------------------------------------------
// animation function
function animate () {
  requestAnimationFrame( animate ); // tells browser you want to perform an animation; recursively call function to make an infinite loop
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.005;
  mesh.rotation.z += 0.01;

  controls.update(); // to make sure changes from dom mouse events are reflected in the UI

  renderer.render( scene, camera );
}

animate();