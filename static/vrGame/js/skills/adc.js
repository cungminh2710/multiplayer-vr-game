class Adc{

    static attack(){
        // description: do not need target, shoot a bullet along the gaze(lookAt) direction, not 100% success,
        // animation: a bullet will be fly from the adc's position to gaze direction with specific distance
        // do not need a target, release attack directly


        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"attack");
        var camera = cameraEl.object3D;
        var direction = camera.getWorldDirection();
      
        var pos = playerWrapperEl.getAttribute("position");
        var from = {
            x: pos.x - direction.x*0.5,
            y: pos.y + characterConfig[character].cameraHeight,
            z:pos.z - direction.z*0.5

        };
        var to = {
            x: pos.x - direction.x*20,
            y: from.y -direction.y*20,
            z:pos.z - direction.z*20

        };
        var data = JSON.stringify({
            name:"attack",
            skillName:"AdcAttack",
            from: from,
            to: to
        });
        gameRoom.send({action: "SKILLANIMATION", data:data});
        console.log(direction);
        SkillEffect.shootBullet2(from,to);
    }
    //description: transport adc itself 5 meters along gaze position
    //animation: N/A
    //flash
    static skill1(){
        gameRoom.send({action: "SKILLANIMATION", data:"skill1"});
        //TODO calculate position
        gameRoom.send({action: "MOVE", data:{position: newPos, moveAnimation:"none"}}); 
    }
    //description: do not need target,shoot a lazer from adc's eyes to along the gaze direction, not 100% success,
    //animation:  draw a lazer animated from adc's eyes to along the gaze direction
    //lazer
    static skill2(){
        Animation.setAnimation(el.children[0].querySelector("#"+client.id),"skill2")
        gameRoom.send({action: "SKILLANIMATION", data:"skill2"});

    }
    
    }