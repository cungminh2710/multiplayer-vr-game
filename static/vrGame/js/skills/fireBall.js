AFRAME.registerComponent('fireBall', {
    
      init: function () {
        var texture = new THREE.TextureLoader().load("js/skills/fireball.jpg");
        var bodyMaterial = new THREE.MeshStandardMaterial({text,roughness:0.5 , metalness: 0.5});
        this.fireBall = new THREE.Mesh(new THREE.SphereGeometry(0.2,32,32),bodyMaterial);
        this.el.setObject3D('mesh', this.fireBall);      
       }
       
    });