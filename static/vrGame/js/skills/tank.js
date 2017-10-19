class Tank{

    static attack(){
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
            name:"TankAttack",
        }
        console.log("SEND TankAttack: ",data)
        gameRoom.send({action: "DAMAGE", data}); 
    }
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
    //rocket, AOE skill, do it later
    static skill2(){
        gameRoom.send({action: "SKILLANIMATION", data:"skill2"});
    }

}