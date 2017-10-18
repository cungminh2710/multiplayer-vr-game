AFRAME.registerComponent('cage', {
    schema: {
      colors: {
      //type: 'string',
        default:'255,0,0'
      },
      positions: {
      // type: 'string',
        default: '0 0 0'
      },
      character:{
        default:0
      }
    },
    
    init: function () {
      var texture=new THREE.TextureLoader().load('textures/skills/fire.jpg');
      var width = 1.5;
      var length = 1.5;
      var height = 1.8;
      var radius = 0.3;
      var cageMaterial = new THREE.MeshStandardMaterial({map:texture,roughness: 1, metalness: 0.5});
      this.cage = new THREE.Group();
      var cage1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius,radius,height),cageMaterial);
      cage1.position.set(width/2+radius,0,0 );
      this.cage.add(cage1);
      var cage2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius,radius,height),cageMaterial);
      cage2.position.set(-width/2-radius,0,0);
      this.cage.add(cage2);
      var cage3 = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius,radius,height),cageMaterial);
      cage3.position.set(0,0,length/2+radius);
      this.cage.add(cage3);
      var cage4 = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius,radius,height),cageMaterial);
      cage4.position.set(0,0,-length/2-radius);
      this.cage.add(cage4);
      this.el.setObject3D('cage', this.cage);
      
    },
    
    update: function (oldData) {
    var data = this.data;
    var diff = AFRAME.utils.diff(data, oldData);
    
    // Update geometry
        if ('positions' in diff) {
            var pos =  new Float32Array(this.data.positions.split(","));
            this.geometry.removeAttribute ("position");
            this.geometry.addAttribute( 'position', new THREE.BufferAttribute(pos, 3 ) );
            this.geometry.attributes.position.needsUpdate = true;

        }
        if ('sizes' in diff) {
            var size =  new Float32Array(this.data.sizes.split(","));
            this.geometry.removeAttribute ("size");
            this.geometry.addAttribute( 'size', new THREE.BufferAttribute(size, 3 ) );
            this.geometry.attributes.size.needsUpdate = true;
        }        
        if ('colors' in diff) {
            var color =  new Float32Array(this.data.colors.split(","));
            this.geometry.removeAttribute ("color");
            this.geometry.addAttribute( 'color', new THREE.BufferAttribute(color, 3 ) );
            this.geometry.attributes.color.needsUpdate = true;
        } 
        this.material.size = this.data.sizes.split(',')[0];
        this.el.setObject3D('points', this.points);
    },

      tick: function (time, timeDelta) {
        console.log(timeDelta);
      }
      
  });