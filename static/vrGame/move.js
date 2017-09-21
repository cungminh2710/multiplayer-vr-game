AFRAME.registerComponent('move', {
    schema: {
        DELTA_MOVE: {

          default:'0.4'
        }
      },
    init: function () {
        this.repeating = false;
        this.repeatRateTimer = null;
        var count = this.count = 0;
        var el = this.el;
        var DELTA_MOVE = this.data.DELTA_MOVE;
        var moveFlag = "idle"; 
        window.addEventListener( 'keyup', function( e ) {
            if( this.repeatRateTimer != null )
            {
                clearTimeout( this.repeatRateTimer );
                this.repeatRateTimer = null;
            }
            console.log("keyUp");
            moveFlag = "idle";
            Animation.setAnimation(client.id,"idle");
            this.repeating = false;
        } );


        window.addEventListener( 'keydown', function( e ) {
            e.preventDefault( );

            if( this.repeating == true )
            {
            if( this.repeatRateTimer == null ){
                    this.repeatRateTimer = setTimeout( function( ) {
                    this.repeating = false;
                    clearTimeout( this.repeatRateTimer );
                    this.repeatRateTimer = null;
                    }, 1 );
                }
                return;
            }

   
            var camera = document.querySelector("#camera").object3D;
            var direction = camera.getWorldDirection();
            var player = document.querySelector('#'+client.id);
            var pos = player.getAttribute("position");
            this.repeating = true;
            console.log("press");
            var pos = el.getAttribute("position");
            e = e ||window.event; // to deal with IE
            var map = {};
            map[e.keyCode] = e.type == 'keydown';

            if(map[40]){// up arrow
                el.setAttribute("position",pos);
                var newPos =  {x:pos.x+direction.x*DELTA_MOVE, y:pos.y, z:pos.z+direction.z*DELTA_MOVE};
                player.setAttribute('position', newPos);
                map = {};
                if(moveFlag != "run") {
                    Animation.setAnimation(client.id,"run");
                    moveFlag = "run";
                }
                gameRoom.send({action: "MOVE",data: {x: pos.x,y: pos.y, z: pos.z} });
            }
            else if(map[38]){//down arrow
                el.setAttribute("position",pos);
                var newPos =  {x:pos.x-direction.x*DELTA_MOVE, y:pos.y, z:pos.z-direction.z*DELTA_MOVE};
                player.setAttribute('position', newPos);
                if(moveFlag != "run") {
                    Animation.setAnimation(client.id,"run");
                    moveFlag = "run";
                }
                map = {};
                gameRoom.send({action: "MOVE",data: {x: pos.x,y: pos.y,z: pos.z}});
            }
            

            // if(map[37]){ //left arrow
            //     console.log(el.getAttribute("position"));
            //     el.setAttribute("position",pos);
            //     map = {};
            //     gameRoom.send({action: "MOVE",data: {x: pos.x,y: pos.y,z: pos.z}});
            // }
            // else if(map[39]){// right 
            //     el.setAttribute("position",pos);

            //     map = {};
            //     gameRoom.send({action: "MOVE",data: {x: pos.x,y: pos.y,z: pos.z}});
            // }

        } );

    },


});
