
var scene = document.querySelector('a-scene');
class SkillEffect{

    static shootBullet(from, to){
        // var d =cameraEl.getAttribute("rotation");
          //var d = cameraEl.components.rotation.data;
          var bullet = document.createElement('a-entity');
          bullet.setAttribute("id","bullet")
          bullet.setAttribute("bullet","")
          bullet.setAttribute("position",from.x+" "+from.y+" "+from.z);
      
          
          var animation = document.createElement('a-animation');
          animation.setAttribute("attribute","position");  
          animation.setAttribute("from",from.x+" "+from.y+" "+from.z);    
          animation.setAttribute("to",to.x+" "+to.y+" "+to.z);
          animation.setAttribute("begin","bulletStart");
          animation.setAttribute("id","bulletShoot");
          animation.setAttribute("dur",300);
          bullet.appendChild(animation);
          scene.appendChild(bullet);

          animation.addEventListener("animationend",function(e){
              console.log("animationed",e)
              scene.removeChild(bullet);
              
          })
          bullet.emit("bulletStart");    
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

    static lazer(pos,from,to){

        var maxX = Math.max(from.x,to.x);
        var minX = Math.min(from.x,to.x);
        var maxZ = Math.max(from.z,to.z);
        var minZ = Math.min(from.z,to.z);
        var d = cameraEl.components.rotation.data;


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
        animation.setAttribute("dur","700");
       // animation.setAttribute( "repeat","indefinite");
        lazer.appendChild(animation);

        var tran = document.createElement('a-animation');
        tran.setAttribute("attribute","material.opacity");
        tran.setAttribute("to","1")
        tran.setAttribute("dur","700");
       // tran.setAttribute( "repeat","indefinite");
  
        lazer.appendChild(tran);
        entity.appendChild(lazer);
        scene.appendChild(entity);

        animation.addEventListener("animationend",function(){
            console.log("animationeddfasdfas")
            var enemy = [];
            for (var id in playersDict) {
                // check if the property/key is defined in the object itself, not in parent
                if (playersDict.hasOwnProperty(id)) {           
                    if(playersDict[id].getAttribute("team")=="ally") continue
                    var enemyPos = playersDict[id].getAttribute("position");
                    console.log(maxX,minX,maxZ,minZ);
                    if (enemyPos.x-0.05>maxX || enemyPos.x+0.05<minX || enemyPos.z-0.05>maxZ || enemyPos.z+0.05<minZ) continue;
                        var line = new THREE.Line3( from, to );
                        var newP = line.closestPointToPoint (enemyPos, false  );
                        var d = SkillEffect.distanceVector(enemyPos,newP);
                        console.log(d);
                        if(d<0.55){
                            enemy.push(id)
                        }
                    
                }
            }
            console.log(enemy)
            var data = {
                target:enemy,
                name:"Lazer",
            }
            //console.log("SEND FireBall: ",data)
            gameRoom.send({action: "DAMAGE", data}); 
        scene.removeChild(entity);


        });


    }

    static distanceVector( v1, v2 )
    {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
    
        return  dx * dx + dy * dy + dz * dz;
    }

    static fireBall(from, to){
      // var d =cameraEl.getAttribute("rotation");
        var d = cameraEl.components.rotation.data;
        var fireBall = document.createElement('a-entity');
        fireBall.setAttribute("id","fireBall")
        fireBall.setAttribute("fireBall","")
       // bullet.setAttribute("radius","0.025");
        fireBall.setAttribute("position",from.x+" "+from.y+" "+from.z);
        fireBall.setAttribute("raycaster","objects: .collidable;far: 0.5;recursive:false;interval:15");
        fireBall.setAttribute("rotation",d.x+" "+d.y+" "+d.z);
        var animation = document.createElement('a-animation');
        animation.setAttribute("attribute","position");  
        animation.setAttribute("from",from.x+" "+from.y+" "+from.z);    
        animation.setAttribute("to",to.x+" "+to.y+" "+to.z);
        animation.setAttribute("begin","fireBallStart");
        animation.setAttribute("id","fireBallShoot");
        animation.setAttribute("dur",1500);
        fireBall.appendChild(animation);
        scene.appendChild(fireBall);

        fireBall.addEventListener("raycaster-intersection",function(evt){
            var target = evt.detail.intersections[0].object.el;
            if(target.getAttribute("team") == "enemy"){
                // console.log(evt.detail.intersections[0].object.el);
                // console.log("intersection!!!!!!!!!",evt);
                var data = {
                    target:[target.getAttribute("id")],
                    name:"FireBall",
                }
                //console.log("SEND FireBall: ",data)
                gameRoom.send({action: "DAMAGE", data}); 
                scene.removeChild(fireBall);
            }
          
        });

        animation.addEventListener("animationend",function(e){
            console.log("animationed",e)
            scene.removeChild(fireBall);
            
        })
      
        fireBall.emit("fireBallStart");    
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