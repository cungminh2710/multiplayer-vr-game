class Adc{

    static attack(){
        // description: do not need target, shoot a bullet along the gaze(lookAt) direction, not 100% success,
        // animation: a bullet will be fly from the adc's position to gaze direction with specific distance
        // do not need a target, release attack directly
        var pos = playerWrapperEl.getAttribute("position");
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"attack");
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        //directlly send damage when target to enemy
        var to;
        var direction = cameraEl.object3D.getWorldDirection();
        var from = {
            x: pos.x - direction.x*0.5,
            y: pos.y + characterConfig[character].cameraHeight,
            z:pos.z - direction.z*0.5

        };
        if (target!= undefined && target.getAttribute("team")=="enemy"){
            var data = {
                //not AOE
                target:[target.getAttribute("id")],
                name:"Bullet",
            }
            to = target.getAttribute("position");
            to.y = from.y;
            console.log("SEND Bullet: ",data)
            gameRoom.send({action: "DAMAGE", data}); 

        }else{
            to = {
                x: pos.x - direction.x*20,
                y: from.y - direction.y*20,
                z:pos.z - direction.z*20
            };
        }
        var dataAni = JSON.stringify({
            name:"attack",
            skillName:"Bullet",
            from: from,
            to: to
        });
        gameRoom.send({action: "SKILLANIMATION", data:dataAni});
        SkillEffect.shootBullet(from,to);
    }
    //description: transport adc itself 5 meters along gaze position
    //animation: N/A
    //flash
    static skill1(preMovement){
        var skill1 = panel.querySelector("#skill1");
        if(skill1.getAttribute("color") == "#ff0000") return;
        var pos = playerWrapperEl.getAttribute("position");
        var direction = cameraEl.object3D.getWorldDirection();
        var oldY = pos.y;
        var oldX = pos.x;
        var oldZ = pos.z;
        var newX = pos.x -direction.x;
        var newZ = pos.z -direction.z;
        var newY = Infinity;
        for(var i = 2 ; i<= 4 ; i++){
            newY = DetectHeight.isAvaiable(oldY,newX,newZ);
            if(newY == -1){
                newX = oldX;
                newZ = oldZ;
                newY = oldY;
                break;
            }
            newX = pos.x -direction.x*i;
            newZ = pos.z -direction.z*i;
            oldY = newY;

        }

        var newPos =  newX +" "+newY+" "+newZ;
        SkillEffect.flash(pos);

        playerWrapperEl.setAttribute('position', newPos);
        gameRoom.send({action: "MOVE", data:{position: newPos, moveAnimation:"flash"}}); 

        var dataAni = JSON.stringify({
            name:"skill1",
            skillName:"Flash",
            pos: pos,
        });
        gameRoom.send({action: "SKILLANIMATION", data:dataAni});
        // if(preMovement == 87){ //w


        // }else if(preMovement == 88){//x
            
            
        // }else if(preMovement == 65){//a
            
            
        // }else if(preMovement == 68){//d
            
            
        // }

    }
    //description: do not need target,shoot a lazer from adc's eyes to along the gaze direction, not 100% success,
    //animation:  draw a lazer animated from adc's eyes to along the gaze direction
    //lazer
    static skill2(){
       // var skill1 = panel.querySelector("#skill2");
      //  if(skill1.getAttribute("color") == "#ff0000") return;
        Animation.setAnimation(el.children[0].querySelector("#"+client.id),"skill2")
        var pos = playerWrapperEl.getAttribute("position");
        var direction = cameraEl.object3D.getWorldDirection();

        var from = {
            x: pos.x - direction.x*0.5,
            y: pos.y + characterConfig[character].cameraHeight,
            z:pos.z - direction.z*0.5

        };

        var to = {
            x: pos.x - direction.x*7,
            y: from.y -direction.y*7,
            z:pos.z - direction.z*7

        };
        var direction = cameraEl.object3D.getWorldDirection();
        SkillEffect.lazer(direction,pos,from,to);

        //gameRoom.send({action: "SKILLANIMATION", data:"skill2"});

    }
    
    }