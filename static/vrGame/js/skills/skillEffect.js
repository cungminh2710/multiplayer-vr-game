
var scene = document.querySelector('a-scene');
class SkillEffect{

    static shootBullet(from, to){
        console.log(from, to);
        var bullet = document.createElement('a-sphere');
        bullet.setAttribute("id","bullet")
        bullet.setAttribute("radius","0.4");
        bullet.setAttribute("position",from.x+" "+from.y+" "+from.z);
        bullet.setAttribute("sphere-collider","objects: .coll");
        bullet.setAttribute("grab","");
        var animation = document.createElement('a-animation');
        animation.setAttribute("attribute","position");  
        animation.setAttribute("from",from.x+" "+from.y+" "+from.z);    
        animation.setAttribute("to",to.x+" "+to.y+" "+to.z);
        animation.setAttribute("begin","shootStart");
        animation.setAttribute("id","bulletShoot");
        animation.setAttribute("dur",5000);
        bullet.appendChild(animation);
        document.querySelector("a-scene").appendChild(bullet);

        bullet.addEventListener("hit",function(evt){
            if(evt.detail.el!=null){
                console.log("DETECT HIT",evt);
                animation.stop();
                scene.removeChild(bullet);
            }
        });

        animation.addEventListener("animationend",function(e){
            console.log("animationed",e)
            scene.removeChild(bullet);
            
        })
        animation.addEventListener("animationstart",function(e){
           console.log("start:", animation);

        }) 
      
        bullet.emit("shootStart");
        
    }
    static shootBullet2(from, to){
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
        animation.setAttribute("begin","shootStart");
        animation.setAttribute("id","bulletShoot");
        animation.setAttribute("dur",1500);
        bullet.appendChild(animation);
        scene.appendChild(bullet);

        bullet.addEventListener("raycaster-intersection",function(evt){
            var target = evt.detail.intersections[0].object.el;
            console.log(evt.detail.intersections[0].object.el);
            console.log("intersection!!!!!!!!!",evt);
            var data = {
                target:[target.getAttribute("id")],
                name:"AdcAttack",
            }
            console.log("SEND adcAttack: ",data)
            gameRoom.send({action: "DAMAGE", data}); 

            scene.removeChild(bullet);
        });

        animation.addEventListener("animationend",function(e){
            console.log("animationed",e)
            scene.removeChild(bullet);
            
        })
      
        bullet.emit("shootStart");
        
    }
    

}