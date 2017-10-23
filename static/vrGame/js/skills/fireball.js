AFRAME.registerComponent('fireball', {
    

       init: function () {
        var texture = new THREE.TextureLoader().load("js/skills/fireball.jpg");
        var bodyMaterial = new THREE.MeshStandardMaterial({map:texture,roughness:0.5 , metalness: 0.5});
        this.fireball = new THREE.Mesh(new THREE.SphereGeometry(0.2,32,32),bodyMaterial);
        this.el.setObject3D('mesh', this.fireball);
        
       }
       
    });