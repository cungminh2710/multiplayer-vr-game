AFRAME.registerComponent('bullet', {
    
      init: function () {
        var bodyMaterial = new THREE.MeshStandardMaterial({color:0xc0c0c0,roughness:0.5 , metalness: 0.5});
        this.bullet = new THREE.Mesh(new THREE.SphereGeometry(0.03,32,32),bodyMaterial);
        this.el.setObject3D('mesh', this.bullet);
        
       }
    });