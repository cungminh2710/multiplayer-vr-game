AFRAME.registerComponent('move', {
    init: function () {
         this.el.addEventListener('componentchanged', function (evt) {
        console.log('I was clicked at: ', evt.detail.intersection.point);
      });
    }
  });