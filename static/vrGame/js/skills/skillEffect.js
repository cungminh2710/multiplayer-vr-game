
var scene = document.querySelector('a-scene');
class SkillEffect{

    static fireBall(from, to){
      // var d =cameraEl.getAttribute("rotation");
        var d = cameraEl.components.rotation.data;
        var bullet = document.createElement('a-entity');
        bullet.setAttribute("id","bullet")
        bullet.setAttribute("bullet","")
       // bullet.setAttribute("radius","0.025");
  
        bullet.setAttribute("position",from.x+" "+from.y+" "+from.z);
        bullet.setAttribute("raycaster","objects: .collidable;far: 0.5;recursive:false;interval:15");
        bullet.setAttribute("rotation",d.x+" "+d.y+" "+d.z);

        var animation = document.createElement('a-animation');
        animation.setAttribute("attribute","position");  
        animation.setAttribute("from",from.x+" "+from.y+" "+from.z);    
        animation.setAttribute("to",to.x+" "+to.y+" "+to.z);
        animation.setAttribute("begin","fireBallStart");
        animation.setAttribute("id","fireBallShoot");
        animation.setAttribute("dur",1500);
        bullet.appendChild(animation);
        scene.appendChild(bullet);

        bullet.addEventListener("raycaster-intersection",function(evt){
            var target = evt.detail.intersections[0].object.el;
            console.log(evt.detail.intersections[0].object.el);
            console.log("intersection!!!!!!!!!",evt);
            var data = {
                target:[target.getAttribute("id")],
                name:"FireBall",
            }
            console.log("SEND FireBall: ",data)
            gameRoom.send({action: "DAMAGE", data}); 

            scene.removeChild(bullet);
        });

        animation.addEventListener("animationend",function(e){
            console.log("animationed",e)
            scene.removeChild(bullet);
            
        })
      
        bullet.emit("fireBallStart");
        
    }
    static cure(id){
        var pos;
        if(id == client.id) pos = playerWrapperEl.getAttribute("position");
        else pos = playersDict[id].getAttribute("position");
      
        var cureEl = document.createElement('a-entity');
        cureEl.setAttribute('position',pos.x/2+" "+"0"+" "+pos.z/2);
        console.log(pos);
  
        scene.appendChild(cureEl);
        cureEl.setAttribute("particle-system","velocitySpread:1 1 1;accelerationSpread:2 0 2;velocityValue:0 10 0;color: #7FF000,#7FFF00;duration:3;particleCount:5;size:1;texture:js/skills/crosifixion.png");

        cureEl.addEventListener("particleed",function(){
  
        scene.removeChild(cureEl);
       })
         
    }    
    static wish(ids){
        for(var i = 0; i<ids.length;i++ ){
           
            console.log(ids[i])
            SkillEffect.cure(ids[i]);
        }
         
    }
    

}