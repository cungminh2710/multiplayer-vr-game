AFRAME.registerComponent('face', {
  schema: {
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1}
  },
  init: function () {
    var data = this.data;
    var el = this.el;
    this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

    var texture=new THREE.TextureLoader().load('tank-face.png');
    var materials = [
  new THREE.MeshStandardMaterial( { color: 0xD7D7D7,roughness: 1, metalness: 0.5 } ), // right
  new THREE.MeshStandardMaterial( { color: 0xD7D7D7,roughness: 1, metalness: 0.5} ), // left
  new THREE.MeshStandardMaterial( { color: 0xD7D7D7,roughness: 1, metalness: 0.5} ), // top
  new THREE.MeshStandardMaterial( { color: 0xD7D7D7,roughness: 1, metalness: 0.5 } ), // bottom
  new THREE.MeshStandardMaterial( { map:texture,roughness: 1, metalness: 0.5 } ), // back
  new THREE.MeshStandardMaterial( { color:0xD7D7D7 ,roughness: 1, metalness: 0.5} )  // front
];

    this.material = new THREE.MultiMaterial(materials);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    el.setObject3D('mesh', this.mesh);
  },
  /**
   * Update the mesh in response to property updates.
   */
  update: function (oldData) {
    var data = this.data;
    var el = this.el;
    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) { return; }
    // Geometry-related properties changed. Update the geometry.
    if (data.width !== oldData.width ||
        data.height !== oldData.height ||
        data.depth !== oldData.depth) {
      el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height,
                                                                    data.depth);
    }
    // Material-related properties changed. Update the material.
    // if (data.color !== oldData.color) {
    //   el.getObject3D('mesh').material.color = data.color;
    // }
  },
    remove: function () {
        this.el.removeObject3D('mesh');
    }
});