class Tank{

    static attack(){
        //description: do not need a target, punch an enemy if there has an enemy target in a small distance 
        // animation: no extra animation required
        // do not need a target, release attack directly
        Animation.setAnimation(el.children[0].querySelector("#"+client.id),"attack")
        gameRoom.send({action: "SKILLANIMATION", data:"attack"}); 
        //find a enemy target
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        //TODO DISTANCE CHECK
        if(!target) return;
        if(target.getAttribute("team") == "ally") return;
        //send damage
        var data = {
            //not AOE
            target:[target.getAttribute("id")],
            name:"TankAttack",
        }
        console.log("SEND TankAttack: ",data)
        gameRoom.send({action: "DAMAGE", data}); 
    }
    //description: disable someone's movement, need to target an enemy target, no damage, 100% success
    // animation: create a cage at target's position
    //cage 
    static skill1(){
        //must need an enemy target
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        if(!target) return;
        if(target.getAttribute("team") == "ally") return;
        // realease skill and update cd
        Animation.setAnimation(el.children[0].querySelector("#"+client.id),"skill1")
        gameRoom.send({action: "SKILLANIMATION", data:"skill1"}); 

        var skill1 = panel.querySelector("#skill1");
        var data = {
            //not AOE
            target:[target.getAttribute("id")],
            name:"Cage",
        }
        console.log("SEND Cage: ",data)
        gameRoom.send({action: "DAMAGE", data}); 

    }
    //Document N/A
    //rocket, AOE skill, do it later
    static skill2(){
        gameRoom.send({action: "SKILLANIMATION", data:"skill2"});
    }

}