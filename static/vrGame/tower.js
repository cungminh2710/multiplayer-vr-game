AFRAME.registerComponent('tower', {
  init: function () {
    // var faceTexture = new THREE.TextureLoader().load('tank-face.png');
    // var bodyTexture = new THREE.TextureLoader().load('tankBody.jpg');
    var towerbase = new THREE.TextureLoader().load('towerbase.png');
    var frontgun = new THREE.TextureLoader().load('frontgun.png');
    var watergun = new THREE.TextureLoader().load('watergun.png');
    

    var panMaterial = new THREE.MeshStandardMaterial({map:towerbase,roughness: 1, metalness: 0.5})
    var headMaterial = new THREE.MeshStandardMaterial({color:0xffffff})
    var frontgunMaterial = new THREE.MeshStandardMaterial({map:frontgun,roughness: 1, metalness: 0.5})
    var rightgunMaterial = new THREE.MeshStandardMaterial({map:watergun,roughness: 1, metalness: 0.5})
    var leftgunMaterial = new THREE.MeshStandardMaterial({map:watergun,roughness: 1, metalness: 0.5})
   // this.tank = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.8, 0.4, 1), bodyMaterial ); 
    this.tower = new THREE.Mesh(new THREE.CylinderBufferGeometry(2,3,1),panMaterial);
    //this.tower.position.y =2;
         var head = new THREE.Mesh( new THREE.BoxBufferGeometry(2.5, 2.5, 2.5),headMaterial); 
         head.position.y =1;
    
    var frontgun = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.5,0.5,2),frontgunMaterial);
    frontgun.rotation.x = Math.PI/2;
    frontgun.rotation.y = 0;
    frontgun.rotation.z = 0;
    frontgun.position.x =0;
      frontgun.position.y =0.5;
    frontgun.position.z = -2.25;
    head.add(frontgun);
    
    var rightgun = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.3,0.3,1.5),rightgunMaterial);
    rightgun.rotation.x = Math.PI/2;
    rightgun.rotation.y = 0;
    frontgun.rotation.z = 0;
    rightgun.position.x =1.4;
      rightgun.position.y =0.5;
    rightgun.position.z = -1.25;
    head.add(rightgun);
    
    
        var leftgun = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.3,0.3,1.5),leftgunMaterial);
    leftgun.rotation.x = Math.PI/2;
    leftgun.rotation.y = 0;
    leftgun.rotation.z = 0;
    leftgun.position.x =-1.4;
      leftgun.position.y =0.5;
    leftgun.position.z = -1.25;
    head.add(leftgun);
    
    this.tower.add(head);
     this.el.setObject3D('tower', this.tower);


}
});