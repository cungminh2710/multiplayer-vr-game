AFRAME.registerComponent('cage', {
   
    init: function () {
      var texture=new THREE.TextureLoader().load('textures/skills/fire.jpg');
      var width = 1.3;
      var length = 1.3;
      var height = 2;
      var radius = 0.3;
      var cageMaterial = new THREE.MeshStandardMaterial({map:texture,roughness: 1, metalness: 0.5});
      this.cage = new THREE.Group();
      var cage1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius,radius,height),cageMaterial);
      cage1.position.set(width/2+radius,height/2,0 );
      this.cage.add(cage1);
      var cage2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius,radius,height),cageMaterial);
      cage2.position.set(-width/2-radius,height/2,0);
      this.cage.add(cage2);
      var cage3 = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius,radius,height),cageMaterial);
      cage3.position.set(0,height/2,length/2+radius);
      this.cage.add(cage3);
      var cage4 = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius,radius,height),cageMaterial);
      cage4.position.set(0,height/2,-length/2-radius);
      this.cage.add(cage4);
      this.el.setObject3D('mesh', this.cage);
      
    },    
  });