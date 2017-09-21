AFRAME.registerComponent('healer', {
  schema: {
     speed : {default:1}
  },
  init: function () {
      var bodyMaterial = new THREE.MeshStandardMaterial( { color:0xff0000,roughness: 1, metalness: 0.5 } )
      var wheelMaterial = new THREE.MeshStandardMaterial( { color:0xff00ff,roughness: 1, metalness: 0.5 } )
    this.healer = new THREE.Mesh( new THREE.BoxBufferGeometry(2, 1, 1), bodyMaterial );
  
    
    
    //wheel
    var geo = new THREE.TorusBufferGeometry( 0.3, 0.19, 16, 76 );
    var wheel = new THREE.Mesh( geo, wheelMaterial );
    wheel.position.y =-0.5;
    wheel.position.x =1;
    wheel.position.z =-0.5;
    this.healer.rotation.y = Math.PI/2;
    this.healer.add(wheel);
    this.el.setObject3D('healer', this.healer);
       

  


    },


});