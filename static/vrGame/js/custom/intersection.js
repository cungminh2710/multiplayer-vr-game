AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],
    init: function () {
      this.el.addEventListener('raycaster-intersection', function (e) {
        //raycaster.setAttribute("material","color: cyan; shader: flat");
      });
    }
  });