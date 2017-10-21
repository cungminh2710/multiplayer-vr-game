AFRAME.registerComponent('bullet', {
    
      init: function () {
        var bodyMaterial = new THREE.MeshStandardMaterial({color:0xcd853f,roughness:0.5 , metalness: 0.5});
        this.bullet = new THREE.Mesh(new THREE.SphereGeometry(0.015,32,32),bodyMaterial);
        this.el.setObject3D('mesh', this.bullet);
        
       }
    });