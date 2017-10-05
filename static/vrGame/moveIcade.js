AFRAME.registerComponent('move', {
    schema: {
        DELTA_MOVE: {

          default:'0.12'
        }
      },
    init: function () {
        this.repeating = false;
        var tween;
        this.repeatRateTimer = null;
        var count = this.count = 0;
        var el = this.el;
        var DELTA_MOVE = this.data.DELTA_MOVE;
        var moveFlag = "idle"; 
        var preKey = 0;
        var preTime;


        window.addEventListener( 'keydown', function( e ) {
            e.preventDefault( );
            var camera = document.querySelector("#camera").object3D;
            var direction = camera.getWorldDirection();
            var player = document.querySelector("#playerWrapper");
            var pos = player.getAttribute("position");
            this.repeating = true;
            console.log("press");
            var pos = el.getAttribute("position");
            e = e ||window.event; // to deal with IE
            var map = {};
            map[e.keyCode] = e.type == 'keydown';
            console.log("kedown");
            if (map[67] || map[69]||map[81]||map[90]){
                tween.stop();
                Animation.setAnimation(el.children[0],"idle");
                preKey = 0;              
            }
            else if(map[87]&& preKey != 87){// w
                preKey = 87;
                el.setAttribute("position",pos);
                console.log(el.object3D.position);
                map = {};    
                tween = new TWEEN.Tween()
                .repeat(Infinity)
                .onUpdate(function(){
                    var now = new Date().getTime();
                    //console.log(preTime);

                    if(now-preTime <10) return;
                    preTime = now;
                    pos = player.getAttribute("position");
                    //console.log("pos ",pos);
                    direction = camera.getWorldDirection();
                    var newPos =  {x:pos.x-direction.x*DELTA_MOVE, y:pos.y, z:pos.z-direction.z*DELTA_MOVE};
                    player.setAttribute('position', newPos);
                    gameRoom.send({action: "MOVE",data: newPos});
                    //console.log(direction);
                 })
                .onStart(function(){
                    preTime = new Date().getTime();
                    Animation.setAnimation(el.children[0],"run");
                })
                .start();   
            }
            else if(map[88] && preKey != 88){//x
                preKey = 88;
                map = {};
                tween = new TWEEN.Tween()
                .repeat(Infinity)
                .onUpdate(function(){
                    var now = new Date().getTime();
                    //console.log(preTime);
                    if(now-preTime <10) return;
                    preTime = now;
                    console.log("send")
                    pos = player.getAttribute("position");
                    //console.log("pos ",pos);
                    direction = camera.getWorldDirection();
                    var newPos =  {x:pos.x+direction.x*DELTA_MOVE, y:pos.y, z:pos.z+direction.z*DELTA_MOVE};
                    player.setAttribute('position', newPos);
                    gameRoom.send({action: "MOVE",data: newPos}); 
                })
                .onStart(function(){
                    preTime = new Date().getTime();
                    Animation.setAnimation(el.children[0],"run");
                })
                .start();
                
            }
            else if(map[65] && preKey != 65){ //a
                preKey = 65;
                map = {};
                tween = new TWEEN.Tween()
                .repeat(Infinity)
                .onUpdate(function(){
                    var now = new Date().getTime();
                    //console.log(preTime);
                    if(now-preTime <10) return;
                    preTime = now;
                    console.log("send")
                    pos = player.getAttribute("position");
                    //console.log("pos ",pos);
                    direction = camera.getWorldDirection();
                    var axis = new THREE.Vector3( 0, 1, 0 );
                    var angle = Math.PI / 2;
                    direction.applyAxisAngle( axis, angle );
                    var newPos =  {x:pos.x-direction.x*DELTA_MOVE, y:pos.y, z:pos.z-direction.z*DELTA_MOVE};
                    player.setAttribute('position', newPos);
                    gameRoom.send({action: "MOVE",data: newPos}); 
                })
                .onStart(function(){
                    preTime = new Date().getTime();
                    Animation.setAnimation(el.children[0],"move");
                })
                .start();
            }
            else if(map[68]&& preKey != 68){ //d
                preKey = 68;
                map = {};
                tween = new TWEEN.Tween()
                .repeat(Infinity)
                .onUpdate(function(){
                    var now = new Date().getTime();
                    //console.log(preTime);

                    if(now-preTime <10) return;
                    preTime = now;
                    console.log("send")
                    pos = player.getAttribute("position");
                    
                    //console.log("pos ",pos);
                    direction = camera.getWorldDirection();
                    var axis = new THREE.Vector3( 0, 1, 0 );
                    var angle = Math.PI / 2;

                    direction.applyAxisAngle( axis, angle );
                    var newPos =  {x:pos.x+direction.x*DELTA_MOVE, y:pos.y, z:pos.z+direction.z*DELTA_MOVE};
                    player.setAttribute('position', newPos);
                    gameRoom.send({action: "MOVE",data: newPos}); 
                })
                .onStart(function(){
                    preTime = new Date().getTime();
                    Animation.setAnimation(el.children[0],"move");
                })
                .start();
            }
        } );

    },


});
