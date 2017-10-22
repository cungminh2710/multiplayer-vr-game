class Tank{

    static attack(){
        //description: do not need a target, punch an enemy if there has an enemy target in a small distance 
        // animation: no extra animation required
        // do not need a target, release attack directly
        var attack = panel.querySelector("#attack");
        if(attack.getAttribute("color") == "#ff0000") return;
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"attack")
        attack.emit("start");
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        if(!target) return;
    
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
        console.log(distance);
        if(distance > 6) return;
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
        if(!target) return;
       
        if(target.getAttribute("team") == "ally") return;
        // realease skill and update cd
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"skill1")
        skill1.emit("start");
        //no damage for it 
        var skill1 = panel.querySelector("#skill1");
        SkillEffect.cage(target);
     

    

    }
    //Document N/A
    //rocket, AOE skill, do it later
    static skill2(){

        var skill2 = panel.querySelector("#skill2");
        if(skill2.getAttribute("color") == "#ff0000") return;
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        if(!target) return;
        Animation.setAnimation(cameraEl.querySelector("#"+client.id),"skill2");
        skill2.emit("start");

        var pos = target.getAttribute("position");
        SkillEffect.rocket(pos);
    }

    

}