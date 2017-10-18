class Tank{

    static attack(){
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        if(!target) return;
        if(target.getAttribute("team") == "ally") return;
        //WHAT IS THE FORMAT
        //damage
        var deltaHealth = -skillInfo.attack.damage;
        //gameRoom.send({action: "DAMAGE", data:"TODO"}); 
        

    }

    static skill1(){
        var target = raycasterEl.components.raycaster.intersectedEls[0];
        if(!target) return;
        if(target.getAttribute("team") == "ally") return;
        //WHAT IS THE FORMAT
        //no damage for this one, create a cage for 3 second
        gameRoom.send({action: "SKILLANIMATION", data:"skill1"}); 
        //gameRoom.send({action: "DAMAGE", data:"TODO"}); 
        

    }

    static skill2(){
        gameRoom.send({action: "SKILLANIMATION", data:"skill2"});
    }

}