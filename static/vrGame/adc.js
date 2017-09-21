AFRAME.registerComponent('adc', {
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
    0.3 +.5+ 1.11
    **/
    
    var bodyMaterial = new THREE.MeshStandardMaterial( { map:bodyTexture,roughness: 1, metalness: 0.5 } )
    var greyMaterial = new THREE.MeshStandardMaterial( { color:0x696969,roughness: 1, metalness: 0.5 } )

    this.adc = new THREE.Mesh( new THREE.CylinderBufferGeometry(radiusTop=0.30, radiusBottom=0.25, height=0.6 ,radiusSegments=5), bodyMaterial ); 

    var neck = new THREE.Mesh(  new THREE.CylinderBufferGeometry(radiusTop=0.1, radiusBottom=0.12, height=0.15), bodyMaterial); 
    neck.position.y = 0.30;
    this.adc.add(neck);
    
    var head = new THREE.Mesh( new THREE.BoxBufferGeometry(0.25, 0.25, 0.25), new THREE.MultiMaterial(headMaterials)); 
    head.position.y = 0.2;
    neck.add(head);
    var hair = new THREE.Mesh(new THREE.SphereBufferGeometry(radius=0.3, widthSegments=8 ,thetaLength=Math.PI/2),bodyMaterial);
    hair.position.y = 0.4;
    //head.add(hair);
    
    //leftArm
    var leftArmor = new THREE.Mesh(new THREE.BoxBufferGeometry(0.4, 0.06, 0.3),greyMaterial);
    leftArmor.position.x = -0.3;
    leftArmor.position.y = 0.3;
    leftArmor.position.z = -0.1;
    leftArmor.rotation.y = -Math.PI/9;
    leftArmor.rotation.z = -Math.PI/9;
    var leftUpperArm = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.1, 0.09, 0.5), bodyMaterial ); 
    leftUpperArm.position.y = -0.24;
    leftUpperArm.position.z = 0.07;
    leftUpperArm.rotation.x = -Math.PI/10;
    leftArmor.add(leftUpperArm)
     var leftElbow = new THREE.Mesh( new THREE.SphereBufferGeometry(radius=0.09), greyMaterial ); 
    leftElbow.position.y = -0.3;
    leftUpperArm.add(leftElbow);
    
    var leftLowerArm = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.07, 0.08, 0.4), bodyMaterial ); 
    leftLowerArm.position.x = 0.15;
    leftLowerArm.position.y = 0.05;
    leftLowerArm.position.z = 0.2;
    leftLowerArm.rotation.x = Math.PI/2.5;
    leftLowerArm.rotation.z = -Math.PI/5;


    leftElbow.add(leftLowerArm)
    var leftHand = new THREE.Mesh( new THREE.SphereBufferGeometry(radius=0.09), greyMaterial ); 
    
     

    leftHand.position.y = 0.2;
    leftHand.rotation.x = -Math.PI/4;
    leftLowerArm.add(leftHand);

    var wand = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.05, 0.05, 2), bodyMaterial );
    wand.position.y = 0.7;
    leftHand.add(wand)
    this.adc.add(leftArmor);
    
   
       
    //leftArm
    var rightArmor = new THREE.Mesh(new THREE.BoxBufferGeometry(0.4, 0.06, 0.3),greyMaterial);
    rightArmor.position.x = 0.3;
    rightArmor.position.y = 0.3;
    rightArmor.position.z = -0.1;
    rightArmor.rotation.y = Math.PI/9;
    rightArmor.rotation.z = Math.PI/9;
    var rightUpperArm = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.1, 0.09, 0.5), bodyMaterial ); 
    rightUpperArm.position.y = -0.24;
    rightUpperArm.position.z = 0.07;
    rightUpperArm.rotation.x = -Math.PI/10;
    rightArmor.add(rightUpperArm)
     var rightElbow = new THREE.Mesh( new THREE.SphereBufferGeometry(radius=0.09), greyMaterial ); 
    rightElbow.position.y = -0.3;
    rightUpperArm.add(rightElbow);
    
    var rightLowerArm = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.07, 0.08, 0.4), bodyMaterial ); 
    rightLowerArm.position.x = -0.15;
    rightLowerArm.position.y = 0.05;
    rightLowerArm.position.z = 0.2;
    rightLowerArm.rotation.x = Math.PI/2.5;
    rightLowerArm.rotation.z = Math.PI/5;


    rightElbow.add(rightLowerArm)
    var rightHand = new THREE.Mesh( new THREE.SphereBufferGeometry(radius=0.09), greyMaterial ); 
    
     

    rightHand.position.y = 0.2;
    rightHand.rotation.x = -Math.PI/4;
    rightLowerArm.add(rightHand);


    this.adc.add(rightArmor);
    

    
    //leftLeg
    var leftLegBackConnector=this.leftLegBackConnector = new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.05, 0.5),greyMaterial);
    leftLegBackConnector.position.x = -0.3;
    leftLegBackConnector.position.y = -0.35;
    leftLegBackConnector.position.z = -0.15;
    leftLegBackConnector.rotation.order = "ZYX";
    leftLegBackConnector.rotation.z = Math.PI/4;
    leftLegBackConnector.rotation.y =Math.PI/2.5;
    this.adc.add(leftLegBackConnector);

    
    var leftLeg = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.11, 0.10, 0.4), bodyMaterial ); 
    leftLeg.position.x = -0.13;
    leftLeg.position.y = -0.45;
    leftLeg.rotation.z = -Math.PI/22;
    var leftKnee = new THREE.Mesh(new THREE.SphereBufferGeometry(radius=0.12),greyMaterial);
    leftKnee.position.y = -0.27;
    leftLeg.add(leftKnee);
    
    var leftLowerLeg =new THREE.Mesh( new THREE.CylinderBufferGeometry(0.10, 0.08, 0.4), bodyMaterial ); 
    leftLowerLeg.position.y = -0.28;
    leftLowerLeg.position.x = 0.035;
    leftLowerLeg.rotation.z = Math.PI/22;
    leftKnee.add(leftLowerLeg);
   
    var leftAnkle = new THREE.Mesh( new THREE.SphereBufferGeometry(radius=0.13), greyMaterial); 
    leftAnkle.position.y = -0.30;
    leftLowerLeg.add(leftAnkle);

    var leftFeet = new THREE.Mesh( new THREE.CylinderBufferGeometry(radiusTop = 0,radiusBottom = 0.17, height = 0.4,radiusSegments=3), greyMaterial); 
    leftFeet.position.z = 0.2;
  leftFeet.position.y = -0.05;
    leftFeet.rotation.x = -Math.PI/2;

    leftAnkle.add(leftFeet);
    
    var leftHeel = new THREE.Mesh( new THREE.CylinderBufferGeometry(radiusTop = 0,radiusBottom = 0.17, height = 0.2,radiusSegments=3), greyMaterial); 
    leftHeel.position.z = -0.1;
  leftHeel.position.y = -0.05;
    leftHeel.rotation.x = -Math.PI/2;
    leftFeet.rotation.z = -Math.PI;
    
    leftAnkle.add(leftHeel);
    this.adc.add(leftLeg);

    //rightleg
    var rightLegConnector=this.rightLegConnector = new THREE.Mesh(new THREE.BoxBufferGeometry(0.5, 0.10, 0.5),greyMaterial);
    rightLegConnector.position.x = 0.3;
    rightLegConnector.position.y = -0.3;
    rightLegConnector.rotation.z = -Math.PI/3;
    var rightLeg = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.15, 0.13, 0.4), bodyMaterial ); 
    rightLeg.position.x = 0.20;
    rightLeg.position.y = -0.45;
    rightLeg.rotation.z = Math.PI/20;
    var rightKnee = new THREE.Mesh(new THREE.SphereBufferGeometry(radius=0.18),greyMaterial);
    rightKnee.position.y = -0.3;
    rightLeg.add(rightKnee);
    
    var rightLowerLeg =new THREE.Mesh( new THREE.CylinderBufferGeometry(0.12, 0.09, 0.4), bodyMaterial ); 
    rightLowerLeg.position.y = -0.6;
    rightLeg.add(rightLowerLeg);
   
    var rightFeet = new THREE.Mesh( new THREE.SphereBufferGeometry(radius=0.13), greyMaterial); 
    rightFeet.position.y = -0.30;
    rightLowerLeg.add(rightFeet);

    var rightFeetFinger = new THREE.Mesh( new THREE.CylinderBufferGeometry(radiusTop = 0,radiusBottom = 0.2, height = 0.55,radiusSegments=3), greyMaterial); 
    rightFeetFinger.position.z = 0.03;
  rightFeetFinger.position.y = -0.05;
    rightFeetFinger.rotation.x = -Math.PI/2;
    rightFeet.add(rightFeetFinger);
    this.adc.add(rightLegConnector);
    this.adc.add(rightLeg);
    this.el.setObject3D('adc', this.adc);
    

  },

    moveLeftOrRight: function () {
    
     //console.log("enter"+this.i);
        if(this.legMovement == false){
          console.log("false");
          
          return;
        }
        function tRotate( obj, angles, dur, pause ) {    
          
         new TWEEN.Tween(obj.rotation)
            .delay(pause)
            .to( {
            z: [angles.z,0]          
            }, dur )
            .onComplete(function() {
                })
            .repeat(0)
            .onUpdate(function(){
    
            })
            .onStart(function() {
 
      	}).start();
      }
    
     tRotate(this.leftLeg, {x:0,y:0,z:-Math.PI/8}, 500, 0 );
     tRotate(this.rightLeg, {x:0,y:0,z:Math.PI/8}, 500, 0 );

       

  


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