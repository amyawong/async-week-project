// 3D bottle model loader
// const loader = async () => {
//   const bottle = new GLTFLoader().setPath('./models/plastic_bottle/');
//   const bottlegltf = await bottle.loadAsync( 'scene.gltf' );
//   scene.add( bottlegltf.scene );

//   // // really small
//   const lotion = new GLTFLoader().setPath('./models/lotion_bottle/');
//   const lotiongltf = await lotion.loadAsync( 'scene.gltf' );
//   scene.add( lotiongltf.scene );

//   const card = new GLTFLoader().setPath('./models/nubank_credit_card/');
//   const cardgltf = await card.loadAsync( 'scene.gltf' );
//   scene.add( cardgltf.scene );

//   // REALLY small see-through garbage bag
//   const trashBag1 = new GLTFLoader().setPath('./models/trash_bag1/');
//   const trashBag1gltf = await trashBag1.loadAsync( 'scene.gltf' );
//   scene.add( trashBag1gltf.scene );

//   const fork = new GLTFLoader().setPath('./models/plastic_fork/');
//   const forkgltf = await fork.loadAsync( 'scene.gltf' );
//   scene.add( forkgltf.scene );

//   // REALLY small
//   const box = new GLTFLoader().setPath('./models/plastic_burger_box/');
//   const boxgltf = await box.loadAsync( 'scene.gltf' );
//   scene.add( boxgltf.scene );

//   // small
//   const dvd = new GLTFLoader().setPath('./models/dvd/');
//   const dvdgltf = await dvd.loadAsync( 'scene.gltf' );
//   scene.add( dvdgltf.scene );
// }

// loader();


// Template for sceneloaders
// const Loader = new GLTFLoader();
// Loader.load('./models//scene.gltf', (gltfScene) => {
//   gltfScene.scene.position.y = 3;
//   gltfScene.scene.scale.set(50, 50, 50);
//   scene.add(gltfScene.scene)
// })