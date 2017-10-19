class Healer{

    static attack(){
        // description: do not need target, shoot a light or a magic ball along the gaze(lookAt) direction, not 100% success,
        // animation: a light or a magic ball will be fly from the healer's position to gaze direction with specific distance
        // do not need a target, release skill directly
        Animation.setAnimation(el.children[0].querySelector("#"+client.id),"attack")
        gameRoom.send({action: "SKILLANIMATION", data:"skill1"});
        //find a enemy target 
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        if(!target) return;
        if(target.getAttribute("team") == "ally") return;
        //send damage
        var data = {
            //not AOE
            target:[target.getAttribute("id")],
            name:"HealerAttack",
        }
    }
    //cure
    static skill1(){
    //description: heal an ally, need to target an ally, 100% success
    //animation: a "+" symbol will be on the top of the target's 
    //must need an ally target
    var target = raycasterEl.components.raycaster.intersectedEls[0];
    if(!target) return;
    if(target.getAttribute("team") != "ally") return;
    // realease skill and update cd
    Animation.setAnimation(el.children[0].querySelector("#"+client.id),"skill1")
    gameRoom.send({action: "SKILLANIMATION", data:"skill1"}); 
    //send damage
    var skill1 = panel.querySelector("#skill1");
    var data = {
        //not AOE
        target:[target.getAttribute("id")],
        name:"Cure",
    }
    console.log("SEND Cure: ",data)
    gameRoom.send({action: "DAMAGE", data}); 
    }
    
    static skill2(){
        //heal all allies, do not need target, 100% success
        var ally = [];
        Animation.setAnimation(el.children[0].querySelector("#"+client.id),"skill2")
        gameRoom.send({action: "SKILLANIMATION", data:"skill2"});
        for (var id in playersDict) {
            // check if the property/key is defined in the object itself, not in parent
            if (playersDict.hasOwnProperty(id)) {           
                if(playersDict[id].getAttribute("team")=="ally") ally.push[id]
            }
        }
        //send damage
        var skill1 = panel.querySelector("#skill1");
        var data = {
            //AOE
            target:ally,
            name:"Wish",
        }
        console.log("SEND Wish: ",data)
        gameRoom.send({action: "DAMAGE", data}); 
        }
    
}