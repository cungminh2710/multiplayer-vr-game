class Tank{

    static attack(){
        //description: do not need a target, punch an enemy if there has an enemy target in a small distance 
        // animation: no extra animation required
        // do not need a target, release attack directly
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"attack")
        var dataAni = JSON.stringify({
            name:"attack",
            skillName:"Punch"
        });
        gameRoom.send({action: "SKILLANIMATION", data:dataAni});
        //find a enemy target
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        //TODO DISTANCE CHECK
        if(!target) return;
        if(target.getAttribute("team") == "ally") return;
        var targetPos  = target.getAttribute("position");
        var pos = playerWrapperEl.getAttribute("position");
        var dx = pos.x - targetPos.x;
        var dy = pos.y - targetPos.y;
        var dz = pos.z - targetPos.z;
        var distance = dx * dx + dy * dy + dz * dz;
        if(distance > 3.5) return;
        //send damage
        var data = {
            //not AOE
            target:[target.getAttribute("id")],
            name:"Punch",
        }
        console.log("SEND TankAttack: ",data)
        gameRoom.send({action: "DAMAGE", data}); 
    }
    //description: disable someone's movement, need to target an enemy target, no damage, 100% success
    // animation: create a cage at target's position
    //cage 
    static skill1(){
        //must need an enemy target
        var skill1 = panel.querySelector("#skill1");
        if(skill1.getAttribute("color") == "#ff0000") return;
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        console.log(target);
        if(!target) return;
       
        if(target.getAttribute("team") == "ally") return;
        // realease skill and update cd
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"skill1")
        
        //no damage for it 
        var skill1 = panel.querySelector("#skill1");
        SkillEffect.cage(target);
        skill1.emit("start");

    

    }
    //Document N/A
    //rocket, AOE skill, do it later
    static skill2(){

        var skill1 = panel.querySelector("#skill1");
        if(skill1.getAttribute("color") == "#ff0000") return;
        skill1.emit("start");
        gameRoom.send({action: "SKILLANIMATION", data:"skill2"});
    }

}