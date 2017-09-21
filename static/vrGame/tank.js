AFRAME.registerComponent('tank', {
  schema: {
     speed : {default:1}
  },
  init: function () {
   var legMovement = this.legMovement = true;
   this.i = 0;
    var faceTexture = new THREE.TextureLoader().load('tank-face.png');
    var bodyTexture = new THREE.TextureLoader().load('tankBody.jpg');
    
    var headMaterials = [
        new THREE.MeshStandardMaterial( { color: 0xD7D7D7,roughness: 1, metalness: 0.5 } ), // right
        new THREE.MeshStandardMaterial( { color: 0xD7D7D7,roughness: 1, metalness: 0.5} ), // left
        new THREE.MeshStandardMaterial( { color: 0xD7D7D7,roughness: 1, metalness: 0.5} ), // top
        new THREE.MeshStandardMaterial( { color: 0xD7D7D7,roughness: 1, metalness: 0.5 } ), // bottom
        new THREE.MeshStandardMaterial( { map:faceTexture,roughness: 1, metalness: 0.5 } ), // back
        new THREE.MeshStandardMaterial( { color:0xD7D7D7 ,roughness: 1, metalness: 0.5} )  // front
    ];
    /**
     * 0.3+0.5+1+0.6 = 2.4
     **/
    var bodyMaterial = new THREE.MeshStandardMaterial( { map:bodyTexture,roughness: 1, metalness: 0.5 } )
    var greyMaterial = new THREE.MeshStandardMaterial( { color:0x696969,roughness: 1, metalness: 0.5 } )

    this.tank = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.8, 0.4, 1), bodyMaterial ); 
    
    
    var head = new THREE.Mesh( new THREE.BoxBufferGeometry(0.6, 0.5, 0.5), new THREE.MultiMaterial(headMaterials)); 
    head.position.y = 0.7;
    this.tank.add(head);
    var hair = new THREE.Mesh(new THREE.SphereBufferGeometry(radius=0.3, widthSegments=8 ,thetaLength=Math.PI/2),bodyMaterial);
    hair.position.y = 0.4;
    head.add(hair);
    
    var leftArm = new THREE.Mesh(new THREE.SphereBufferGeometry(radius=0.5),greyMaterial);
    leftArm.position.x = -1.15;
    leftArm.position.y = 0.6;
    leftArm.rotation.z = -Math.PI/9;
    var leftUpperArm = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.2, 0.2, 0.6), bodyMaterial ); 
    leftUpperArm.position.y = -0.6
    leftArm.add(leftUpperArm)
    var leftLowerArm = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.2, 0.2, 0.8), bodyMaterial ); 
    leftLowerArm.rotation.x = Math.PI/2;
    leftLowerArm.position.y = -0.3;
    leftLowerArm.position.z = 0.1;
    leftUpperArm.add(leftLowerArm)
    var leftHand = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.5, 0.3, 0.5), greyMaterial ); 
    leftHand.position.y = 0.6;
    leftLowerArm.add(leftHand);
    this.tank.add(leftArm);
    
    
    var rightArm = new THREE.Mesh(new THREE.SphereBufferGeometry(radius=0.5),greyMaterial);
    rightArm.position.x = 1.15;
    rightArm.position.y = 0.6;
    rightArm.rotation.z = Math.PI/9;
    var rightUpperArm = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.2, 0.2, 0.6), bodyMaterial ); 
    rightUpperArm.position.y = -0.6
    rightArm.add(rightUpperArm)
    var rightLowerArm = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.2, 0.2, 0.8), bodyMaterial ); 
    rightLowerArm.rotation.x = Math.PI/2;
    rightLowerArm.position.y = -0.3;
    rightLowerArm.position.z = 0.1;
    rightUpperArm.add(rightLowerArm)
    var rightHand = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.5, 0.3, 0.5), greyMaterial ); 
    rightHand.position.y = 0.6;
    rightLowerArm.add(rightHand);
    this.tank.add(rightArm);

    var leftLeg=this.leftLeg = new THREE.Mesh(new THREE.SphereBufferGeometry(radius=0.25),greyMaterial);
    leftLeg.position.x = -0.4;
    leftLeg.position.y = -0.6;
    leftLeg.position.z = 0.1;
    var leftLowerLeg = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.2, 0.2, 0.4), bodyMaterial ); 
    leftLowerLeg.position.y = -0.35;
    leftLeg.add(leftLowerLeg);
    var leftFeet = new THREE.Mesh( new THREE.BoxBufferGeometry(0.6, 0.4, 0.6), greyMaterial); 
    leftFeet.position.y = -0.4;
    leftFeet.position.z = 0.05;
    leftLowerLeg.add(leftFeet);
    var leftFeetFinger = new THREE.Mesh( new THREE.BoxBufferGeometry(0.6, 0.2, 0.2), greyMaterial); 
    leftFeetFinger.position.y = -0.1;
    leftFeetFinger.position.z = 0.4;
    leftFeet.add(leftFeetFinger);
    this.tank.add(leftLeg);
    
    var rightLeg = this.rightLeg = new THREE.Mesh(new THREE.SphereBufferGeometry(radius=0.25),greyMaterial);
    rightLeg.position.x = 0.4;
    rightLeg.position.y = -0.6;
    rightLeg.position.z = 0.1;
    var rightLowerLeg = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.2, 0.2, 0.4), bodyMaterial ); 
    rightLowerLeg.position.y = -0.35;
    rightLeg.add(rightLowerLeg);
    var rightFeet = new THREE.Mesh( new THREE.BoxBufferGeometry(0.6, 0.4, 0.6), greyMaterial); 
    rightFeet.position.y = -0.4;
    rightFeet.position.z = 0.05;
    rightLowerLeg.add(rightFeet);
    var rightFeetFinger = new THREE.Mesh( new THREE.BoxBufferGeometry(0.6, 0.2, 0.2), greyMaterial); 
    rightFeetFinger.position.y = -0.1;
    rightFeetFinger.position.z = 0.4;
    rightFeet.add(rightFeetFinger);
    this.tank.add(rightLeg);

    this.el.setObject3D('tank', this.tank);
    
    function tRotate( obj, angles, dur, pause ) {    
          
        var tween =  new TWEEN.Tween(obj.rotation)
            .delay(pause)
            .to( {z: [angles.z,0] }, dur )
            .onStart(function(){
                    tween.repeat(Infinity);
            })
      	return tween;
      }
      

    this.leftLegLR =   tRotate(this.leftLeg, {x:0,y:0,z:-Math.PI/8}, 500, 0 );
    this.rightLegLR = tRotate(this.rightLeg, {x:0,y:0,z:Math.PI/8}, 500, 0 );

  },

    moveLeftOrRight: function () {
    
        this.leftLegLR.start();
        this.rightLegLR.start();

    },
    moveStop:function(){
         this.leftLegLR.repeat(0);
         this.rightLegLR.repeat(0);
    },
  moveForwardOrBackward: function () {
    
     //console.log("enter"+this.i);
        if(this.legMovement == false){
          console.log("false");
          
          return;
        }
        function tRotate( obj, angles, dur, pause ) {    
          
         new TWEEN.Tween(obj.rotation)
            .delay(pause)
            .to( {
            x: [angles.x,-angles.x,0]          
            }, dur )
            .onComplete(function() {
                })
            .repeat(0)
            .onUpdate(function(){
    
            })
            .onStart(function() {
 
      	}).start();
      }
    
     tRotate(this.leftLeg, {x:-Math.PI/7,y:0,z:0}, 500, 0 );
     tRotate(this.rightLeg, {x:Math.PI/7,y:0,z:0}, 500, 0 );

       

  


    },

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