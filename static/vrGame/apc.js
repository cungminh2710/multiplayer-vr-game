AFRAME.registerComponent('apc', {
  schema: {
     speed : {default:1}
  },
  init: function () {

var character = this.character;


var loader = new THREE.JSONLoader();


var action = {};

var mixer;

var el = this.el;

console.log(el);






  loader.load('./models/eva5.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    character = new THREE.SkinnedMesh(
      geometry,
      new THREE.MultiMaterial(materials)
    );

    mixer = new THREE.AnimationMixer(character);

    action.hello = mixer.clipAction(geometry.animations[ 0 ]);
    action.idle = mixer.clipAction(geometry.animations[ 1 ]);
   action.run = mixer.clipAction(geometry.animations[ 4]);
    action.walk = mixer.clipAction(geometry.animations[ 5 ]);
    action.move = mixer.clipAction(geometry.animations[ 2 ]);

    action.hello.setEffectiveWeight(1);
    action.idle.setEffectiveWeight(1);
    action.run.setEffectiveWeight(1);
    action.walk.setEffectiveWeight(1);
  action.move.setEffectiveWeight(1);
  
  
    action.hello.setLoop(THREE.LoopOnce, 0);
    action.hello.clampWhenFinished = true;

    action.hello.enabled = true;
    action.idle.enabled = true;
    action.run.enabled = true;
    action.walk.enabled = true;
  action.move.enabled = true;

el.setObject3D('apc', character);
    console.log('Double click to change animation');

    console.log(action.walk);
    action.walk.play();
     action.walk.play();
      action.walk.play();
  });



    },moveLeftOrRight: function () {
     this.action.move.play();
     
    }



  /**
   * Update the mesh in response to property updates.
   */
//   update: function (oldData) {
//     var data = this.data;
//     var el = this.el;
//     // If `oldData` is empty, then this means we're in the initialization process.
//     // No need to update.
//     if (Object.keys(oldData).length === 0) { return; }
//     // Geometry-related properties changed. Update the geometry.
//     if (data.width !== oldData.width ||
//         data.height !== oldData.height ||
//         data.depth !== oldData.depth) {
//       el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height,
//                                                                     data.depth);
//     }
//     // Material-related properties changed. Update the material.
//     // if (data.color !== oldData.color) {
//     //   el.getObject3D('mesh').material.color = data.color;
//     // }
//   },
//     remove: function () {
//         this.el.removeObject3D('mesh');
//     }
});

