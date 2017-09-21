var clock, container, camera, scene, renderer, controls, listener;

var ground, character;
var light;
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.JSONLoader();
var isLoaded = false;
var action = {}, mixer;
// var activeActionName = 'move';

// var arrAnimations = [
//   'idle',
//   'walk',
//   'run',
//   'hello',
//   'move'
// ];
// var actualAnimation = 0;

init();

function init () {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.2, 2.5);
  listener = new THREE.AudioListener();
  camera.add(listener);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0.6, 0);
  // Lights
  light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  textureLoader.load('textures/ground.png', function (texture) {
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    geometry.rotateX(-Math.PI / 2);
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    ground = new THREE.Mesh(geometry, material);
    scene.add(ground);

  });

  loader.load('./models/bot-bunnyBoned3123123.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    character = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    mixer = new THREE.AnimationMixer(character);

  //  action.hello = mixer.clipAction(geometry.animations[ 0 ]);
    action.idle = mixer.clipAction(geometry.animations[ 1 ]);
   action.run = mixer.clipAction(geometry.animations[ 5]);
    action.rocket = mixer.clipAction(geometry.animations[ 0 ]);
    action.move = mixer.clipAction(geometry.animations[ 2 ]);

   // action.hello.setEffectiveWeight(1);
    action.idle.setEffectiveWeight(1);
    action.run.setEffectiveWeight(1);
    action.rocket.setEffectiveWeight(1);
  action.move.setEffectiveWeight(1);
  
  //
  //  action.hello.setLoop(THREE.LoopOnce, 0);
   // action.hello.clampWhenFinished = true;

   // action.hello.enabled = true;
    action.idle.enabled = true;
    action.run.enabled = true;
    action.rocket.enabled = true;
  //action.move.enabled = true;
    scene.add(character);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('keydown', onDoubleClick, false);
    console.log('Double click to change animation');
    animate();

    isLoaded = true;

    //action.run.play();
    action.rocket.play();
  });
}

// function fadeAction (name) {
//   var from = action[ activeActionName ].play();
//   var to = action[ name ].play();

//   from.enabled = true;
//   to.enabled = true;

//   if (to.loop === THREE.LoopOnce) {
//     to.reset();
//   }

//   from.crossFadeTo(to, 0.3);
//   activeActionName = name;

// }

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

var mylatesttap;
function onDoubleClick () {
  action.run.play();
  
  // var now = new Date().getTime();
  // var timesince = now - mylatesttap;
  // if ((timesince < 600) && (timesince > 0)) {
  //   if (actualAnimation == arrAnimations.length - 1) {
  //     actualAnimation = 0;
  //   } else {
  //     actualAnimation++;
  //   }
  //   fadeAction(arrAnimations[actualAnimation]);

  // } else {
  //   // too much time to be a doubletap
  // }

  // mylatesttap = new Date().getTime();

}

function animate () {
  requestAnimationFrame(animate);
  controls.update();
  render();

}

function render () {
  var delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
}
