AFRAME.registerComponent('movementAnimationControl', {


    init: function () {
        var movement = this.movement = "idle";

        var el = this.el;

        var moveFlag = "idle"; 
        window.addEventListener( 'componentchanged', function( evt) {
            if (evt.detail.name !== 'movementAnimationControl') return;

            var animation = evt.detail.newData;

            if(animation == "keyup") Animation.setAnimation(el,"idle");

            else if(animation == "move") Animation.setAnimation(el,"move");

            else if(animation == "run") Animation.setAnimation(el,"run");

            else if(animation == "attack") Animation.setAnimation(el,"attack");

            else if(animation == "skill1") Animation.setAnimation(el,"skill1");

            else if(animation == "skill2") Animation.setAnimation(el,"skill2");

            else if(animation == "skill3") Animation.setAnimation(el,"skill3");


    
        } );



    },


});
