
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
        else if(ani.skillName =="Bullet") SkillEffectAni.shootBullet(ani.from,ani.to);
        else if(ani.skillName =="Flash") SkillEffectAni.flash(ani.pos);
        else if(ani.skillName =="Lazer") SkillEffectAni.lazer(ani.direction,ani.from);
        else if(ani.skillName =="Cage") SkillEffectAni.cage(ani.targetId);
        else if(ani.skillName =="Rocket") SkillEffectAni.rocket(id,ani.pos);

    }
    static cage(id){

            var pos;
            if(id == client.id){
                console.log("DISABLE",disableMove);
                pos = playerWrapperEl.getAttribute("position");
                disableMove = true;


            }else{
                pos = playersDict[id].getAttribute("position");
            }
            console.log(pos);

            var cage = document.createElement('a-entity');
            cage.setAttribute("cage","");
            cage.setAttribute("position",pos);
            
            var animation = document.createElement('a-animation');
            animation.setAttribute("attribute","rotation");  
        
            animation.setAttribute("to","0 180 0");
    
            animation.setAttribute("dur",3000);
            cage.appendChild(animation);
            scene.appendChild(cage);
    
            animation.addEventListener("animationend",function(e){
                console.log("animationed",e);
                disableMove = false;
                scene.removeChild(cage);
                
            })
    
        }
    static rocket(id,pos){
        
        var top = pos.y+10;
        var from = pos.x+" "+top+" "+pos.z;
        var rocket = document.createElement("a-entity");
        rocket.setAttribute("position",from);
        rocket.setAttribute("rotation","180 0 0");
        rocket.setAttribute("rocket","");
        rocket.setAttribute("scale","5 5 5");
        var animation = document.createElement('a-animation');
        animation.setAttribute("attribute","position");
        animation.setAttribute("to",pos.x+" "+pos.y+" "+pos.z);
        animation.setAttribute("dur","700");
        rocket.appendChild(animation);
        scene.appendChild(rocket);

        animation.addEventListener("animationend",function(){
            // if(id == client.id){
            //     panel.querySelector("#attack").emit("start");
            //     panel.querySelector("#skill1").emit("start");
            //     panel.querySelector("#skill2").emit("start");
            // }
            scene.removeChild(rocket);  
        });
    }

    static shootBullet(from, to){
        // var d =cameraEl.getAttribute("rotation");
          //var d = cameraEl.components.rotation.data;
          console.log(from,to)
          var bullet = document.createElement('a-entity');
          bullet.setAttribute("id","bullet")
          bullet.setAttribute("bullet","")
          bullet.setAttribute("position",from.x+" "+from.y+" "+from.z);
          
          var animation = document.createElement('a-animation');
          animation.setAttribute("attribute","position");  
          animation.setAttribute("from",from.x+" "+from.y+" "+from.z);    
          animation.setAttribute("to",to.x+" "+to.y+" "+to.z);
          animation.setAttribute("id","bulletShoot");
          animation.setAttribute("dur",300);
          bullet.appendChild(animation);
          scene.appendChild(bullet);

          animation.addEventListener("animationend",function(e){
              console.log("animationed",e)
              scene.removeChild(bullet);
              
          })
    }

    static flash(pos){
        var flashEl = document.createElement('a-entity');
        flashEl.setAttribute('position',pos.x/2+" "+"0"+" "+pos.z/2);
        console.log(pos);
        scene.appendChild(flashEl);
        flashEl.setAttribute("particle-system","accelerationValue:0 -20 0;velocitySpread:1 1 1;accelerationSpread:2 0 2;velocityValue:0 7 0;color: #FFFF33,#FFFF00;duration:0.5;particleCount:10;size:0.5;texture:js/skills/star.png");
        flashEl.addEventListener("particleed",function(){  
            scene.removeChild(flashEl);
            console.log("remove");
        })
    }

    static lazer(d,from){

        var entity = document.createElement("a-entity");
        entity.setAttribute("position",from);
        entity.setAttribute("rotation",d.x+" "+d.y+" "+d.z);
        var lazer = document.createElement('a-cylinder');
        lazer.setAttribute("position","0 0 -5");
        lazer.setAttribute("rotation",'90 0 0');
        lazer.setAttribute("radius","0.05");
        lazer.setAttribute("height","10");

        lazer.setAttribute("material","src:js/skills/lazer.jpg;transparent:true;opacity:0;repeat:2 1");
        var animation = document.createElement('a-animation');
        animation.setAttribute("attribute","radius");
        animation.setAttribute("to","0.5");
        animation.setAttribute("dur","500");
       // animation.setAttribute( "repeat","indefinite");
        lazer.appendChild(animation);

        var tran = document.createElement('a-animation');
        tran.setAttribute("attribute","material.opacity");
        tran.setAttribute("to","1")
        tran.setAttribute("dur","500");
       // tran.setAttribute( "repeat","indefinite");
  
        lazer.appendChild(tran);
        entity.appendChild(lazer);
        scene.appendChild(entity);

        animation.addEventListener("animationend",function(){
            scene.removeChild(entity);
        });
    }
    static fireBallAni(from, to){
       console.log(from, to);
        var fireBall = document.createElement('a-entity');
        fireBall.setAttribute("id","fireBall")
        fireBall.setAttribute("fireBall","")
        fireBall.setAttribute("position",from.x+" "+from.y+" "+from.z);

        var animation = document.createElement('a-animation');
        animation.setAttribute("attribute","position");  
        animation.setAttribute("from",from.x+" "+from.y+" "+from.z);    
        animation.setAttribute("to",to.x+" "+to.y+" "+to.z);
        animation.setAttribute("begin","fireBallStart");
        animation.setAttribute("id","fireBallShoot");
        animation.setAttribute("dur",2000);

        fireBall.appendChild(animation);
        scene.appendChild(fireBall);
        animation.addEventListener("animationend",function(e){
            scene.removeChild(fireBall);
            
        })
      
        fireBall.emit("fireBallStart");
        
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