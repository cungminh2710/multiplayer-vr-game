class Healer{
    //cure
    //done
    static attack(){
        //description: heal an ally, need to target an ally, 100% success
        //animation: a "+" symbol will be on the top of the target's 
        //must need an ally target
        
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        if(!target) return;
        //if(target.getAttribute("team") != "ally") return;
        var id = target.getAttribute("id");
        // realease skill and update cd
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"attack");
        SkillEffect.cure(id);
        //send animation
        var dataAni = JSON.stringify({
            name:"attack",
            skillName:"Cure",
            targetId: id
        });
        gameRoom.send({action: "SKILLANIMATION", data:dataAni}); 
        //send damage
        var data = {
            //not AOE
            target:[id],
            name:"Cure",
        }
        console.log("SEND Cure: ",data)
        gameRoom.send({action: "DAMAGE", data}); 

       
    }
    //magicBall
    //done
    static skill1(){
        //description: do not need target, shoot a light or a magic ball along the gaze(lookAt) direction, not 100% success,
        //animation: a light or a magic ball will be fly from the healer's position to gaze direction with specific distance
        //do not need a target, release skill directly
        //check cd
        var skill1 = panel.querySelector("#skill1");
        if(skill1.getAttribute("color") == "#ff0000") return;
        skill1.emit("start");
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"skill1");
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
            name:"skill1",
            skillName:"FireBall",
            from: from,
            to: to
        });
        gameRoom.send({action: "SKILLANIMATION", data:data});
        console.log(direction);
        SkillEffect.fireBall(from,to);
    }
    
    static skill2(){
        //heal all allies, do not need target, 100% success
        //check cd
        var skill2 = panel.querySelector("#skill2");
        if(skill2.getAttribute("color") == "#ff0000") return;
        skill2.emit("start");
        var ally = [];
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"skill2")
        gameRoom.send({action: "SKILLANIMATION", data:"skill2"});
        panel.querySelector("#skill2").emit("start");
        for (var id in playersDict) {
            // check if the property/key is defined in the object itself, not in parent
            if (playersDict.hasOwnProperty(id)) {           
               // if(playersDict[id].getAttribute("team")=="ally")
                 ally.push(id)
            }
        }
        SkillEffect.wish(ally);
        console.log("IDLISt",ally);
        //send animation
        var dataAni = JSON.stringify({
            name:"skill2",
            skillName:"Wish",
            targetId: ally
        });
        gameRoom.send({action: "SKILLANIMATION", data:dataAni}); 
        //send damage
        var data = {
            //AOE
            target:ally,
            name:"Wish",
        }
       
        gameRoom.send({action: "DAMAGE", data}); 
        console.log("SEND Wish: ",data)
        }

}