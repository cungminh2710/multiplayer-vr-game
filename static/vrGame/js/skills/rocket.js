AFRAME.registerComponent('rocket', {
    init: function () {
      var rocketBody = new THREE.TextureLoader().load('js/skills/rockethead.png');
      var panMaterial = new THREE.MeshStandardMaterial({map:rocketBody,roughness: 1, metalness: 0.5})
      var bodyMaterial = new THREE.MeshStandardMaterial({color:0xFFFFFF})
      this.rocket = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.1,0.1,0.3),bodyMaterial);
      var body  = new THREE.Mesh(new THREE.CylinderBufferGeometry(0,0.1,0.2),panMaterial);
      body.position.y = 0.25;
      this.rocket.add(body);
      var foot1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03,0.03,0.15),panMaterial);
      foot1.position.x = 0.115;
      foot1.position.y = -0.15;
      this.rocket.add(foot1);
      var foot2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03,0.03,0.15),panMaterial);
      foot2.position.x = -0.115;
      foot2.position.y = -0.15;
      this.rocket.add(foot2);
      var foot3 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03,0.03,0.15),panMaterial);
      foot3.position.z = 0.115;
      foot3.position.y = -0.15;
      this.rocket.add(foot3);
      var foot4 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03,0.03,0.15),panMaterial);
      foot4.position.z = -0.115;
      foot4.position.y = -0.15;
      this.rocket.add(foot4);
      this.el.setObject3D('mesh', this.rocket);
    }
  });