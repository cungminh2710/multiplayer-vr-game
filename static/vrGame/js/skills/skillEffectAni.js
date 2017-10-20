
class SkillEffectAni{
    static handleEffects(id,newValue){
        console.log("SKILLANIMATION: ",newValue);
        var ani  = JSON.parse(newValue);
        Animation.setAnimation(playersDict[id], ani.name);
        console.log("++++++++++++++++++++++++++++++++++++++++",ani);
        if (ani.name=="none") return;
        else if(ani.skillName == "FireBall") SkillEffectAni.fireBallAni(ani.from,ani.to);
        else if(ani.skillName =="Cure") SkillEffectAni.cure(ani.targetId);
        else if(ani.skillName =="Wish") SkillEffectAni.wish(ani.targetId);


    }

    static fireBallAni(from, to){
       console.log(from, to);
        var bullet = document.createElement('a-entity');
        bullet.setAttribute("id","bullet")
        bullet.setAttribute("bullet","")
  
        bullet.setAttribute("position",from.x+" "+from.y+" "+from.z);
        //bullet.setAttribute("raycaster","objects: .collidable;far: 0.5;recursive:false;interval:15");

        var animation = document.createElement('a-animation');
        animation.setAttribute("attribute","position");  
        animation.setAttribute("from",from.x+" "+from.y+" "+from.z);    
        animation.setAttribute("to",to.x+" "+to.y+" "+to.z);
        animation.setAttribute("begin","shootStart");
        animation.setAttribute("id","bulletShoot");
        animation.setAttribute("dur",2000);
        bullet.appendChild(animation);
        scene.appendChild(bullet);

        // bullet.addEventListener("raycaster-intersection",function(evt){
        //     scene.removeChild(bullet);
        // });

        animation.addEventListener("animationend",function(e){
            scene.removeChild(bullet);
            
        })
      
        bullet.emit("shootStart");
        
    }
    static cure(id){
        var pos;
        if(id == client.id) pos = playerWrapperEl.getAttribute("position");
        else pos = playersDict[id].getAttribute("position");
       // console.log("SYSTEM POS",pos);
        var cureEl = document.createElement('a-entity');
        cureEl.setAttribute('position',pos.x/2+" "+"0"+" "+pos.z/2);
        //console.log(cureEl);
        scene.appendChild(cureEl);
        cureEl.setAttribute("particle-system","velocitySpread:1 1 1;accelerationSpread:2 0 2;velocityValue:0 10 0;color: #7FF000,#7FFF00;duration:3;particleCount:5;size:1;texture:js/skills/crosifixion.png");
   
        cureEl.addEventListener("particleed",function(){
  
        scene.removeChild(cureEl);
       })
         
    }
    static wish(ids){
        for(var i = 0; i<ids.length;i++ ){
            console.log(ids[i]);
            SkillEffectAni.cure(ids[i])
        }
         
    }
    

}