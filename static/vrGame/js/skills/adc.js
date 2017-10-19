class Adc{

    static attack(){
        // description: do not need target, shoot a bullet along the gaze(lookAt) direction, not 100% success,
        // animation: a bullet will be fly from the adc's position to gaze direction with specific distance
        // do not need a target, release attack directly
        Animation.setAnimation(el.children[0].querySelector("#"+client.id),"attack")
        gameRoom.send({action: "SKILLANIMATION", data:"attack"});
        //TODE create a bullet 
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