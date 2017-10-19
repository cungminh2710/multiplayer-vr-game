AFRAME.registerComponent('control', {
    schema: {
        moveSpeed: {
          default: 0.03
        },
        runSpeed:{
            default: 0.05
        }
      },
    init: function () {
        this.repeating = false;
        var tween;
        this.repeatRateTimer = null;
        var count = this.count = 0;
        var el = this.el;
        var moveSpeed = this.data.moveSpeed;
        var runSpeed = this.data.runSpeed;
        var moveFlag = "idle"; 
        var preKey = 0;
        var preTime;


        window.addEventListener( 'keydown', function( e ) {
            e.preventDefault( );
            var camera = cameraEl.object3D;
            var direction = camera.getWorldDirection();
            var player = playerWrapperEl;
            var pos = player.getAttribute("position");
            this.repeating = true;
            var pos = el.getAttribute("position");
            e = e ||window.event; // to deal with IE
            var map = {};
            map[e.keyCode] = e.type == 'keydown';
            if (map[67] || map[69]||map[81]||map[90]){
                if(tween) tween.stop();
                Animation.setAnimation(el.children[0].querySelector("#"+client.id),"idle");
                gameRoom.send({action: "MOVE", data:{position: "", moveAnimation:"idle"}}); 
                preKey = 0;              
            }else if(map[85]){ //Attack u
                if(character == 1) Tank.attack();
                if(character == 2) Adc.attack();
                if(character == 3) healer.attack();

            }else if(map[72]){ //Skill1 h
                var skill1 = panel.querySelector("#skill1");
                if(skill1.getAttribute("color") == "#ff0000") return;
                if(character == 1) Tank.skill1();
                if(character == 2) Adc.skill1();
                if(character == 3) Healer.skill1();
                skill1.emit("start");

    
            }else if(map[74]){ //Skill2 j
                var skill2 = panel.querySelector("#skill2");
                if(character == 1) Tank.skill2();
                if(character == 2) Adc.skill2();
                if(character == 3) Healer.skill2();
                //console.log(raycasterEl.components.raycaster.intersectedEls[0]);
                if(skill2.getAttribute("color")== "#ff0000") return;
                skill2.emit("start");
                Animation.setAnimation(el.children[0].querySelector("#"+client.id),"skill2")

            }else if(map[70] || map[78]||map[84]||map[82]){//reset skill animation n  t
                gameRoom.send({action: "SKILLANIMATION", data:"none"})
                Animation.setAnimation(el.children[0].querySelector("#"+client.id),"none");
            }
            else if(map[87]&& preKey != 87){// w front
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
                    newX = pos.x-direction.x*runSpeed;
                    newZ = pos.z-direction.z*runSpeed;
                    newY = DetectHeight.isAvaiable(pos.y,newX,newZ);
                    if(newY == -1) return;

                    var newPos =  newX +" "+newY+" "+newZ;
                    
                    player.setAttribute('position', newPos);
                    gameRoom.send({action: "MOVE", data:{position: newPos, moveAnimation:"run"}}); 
                
                 })
                .onStart(function(){
                    preTime = new Date().getTime();
                    Animation.setAnimation(el.children[0].querySelector("#"+client.id),"run");
                })
                .start();   
            }
            else if(map[88] && preKey != 88){//x back
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
                    newX = pos.x+direction.x*runSpeed;
                    newZ = pos.z+direction.z*runSpeed;
                    newY = DetectHeight.isAvaiable(pos.y,newX,newZ);
                    if(newY == -1) return;

                    var newPos =  newX +" "+newY+" "+newZ;
                    player.setAttribute('position', newPos);
                    gameRoom.send({action: "MOVE", data:{position: newPos, moveAnimation:"run"}}); 
                })
                .onStart(function(){
                    preTime = new Date().getTime();
                    Animation.setAnimation(el.children[0].querySelector("#"+client.id),"run");
                })
                .start();
                
            }
            else if(map[65] && preKey != 65){ //a left
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
                    newX = pos.x-direction.x*moveSpeed;
                    newZ = pos.z-direction.z*moveSpeed;
                    newY = DetectHeight.isAvaiable(pos.y,newX,newZ);
                    if(newY == -1) return;
                    var newPos =  newX +" "+newY+" "+newZ;
                    player.setAttribute('position', newPos);
                    gameRoom.send({action: "MOVE", data:{position: newPos, moveAnimation:"move"}}); 
                })
                .onStart(function(){
                    preTime = new Date().getTime();

                    Animation.setAnimation(el.children[0].querySelector("#"+client.id),"move");
                })
                .start();
            }
            else if(map[68]&& preKey != 68){ //d right
                preKey = 68;
                map = {};
                tween = new TWEEN.Tween()
                .repeat(Infinity)
                .onUpdate(function(){
                    var now = new Date().getTime();
                    if(now-preTime <10) return;
                    preTime = now;
                    console.log("send")
                    pos = player.getAttribute("position");
                    direction = camera.getWorldDirection();
                    var axis = new THREE.Vector3( 0, 1, 0 );
                    var angle = Math.PI / 2;

                    direction.applyAxisAngle( axis, angle );
                    newX = pos.x+direction.x*moveSpeed;
                    newZ = pos.z+direction.z*moveSpeed;
                    newY = DetectHeight.isAvaiable(pos.y,newX,newZ);
                    if(newY == -1) return;
                    var newPos =  newX +" "+newY+" "+newZ;
                    player.setAttribute('position', newPos);
                    gameRoom.send({action: "MOVE", data:{position: newPos, moveAnimation:"move"}}); 
                })
                .onStart(function(){
                    preTime = new Date().getTime();
                    Animation.setAnimation(el.children[0].querySelector("#"+client.id),"move");
                })
                .start();
            }
        } );

    },


});
