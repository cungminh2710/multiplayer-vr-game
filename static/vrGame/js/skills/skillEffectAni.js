
class SkillEffectAni{


    static shootBullet2(from, to){
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
        animation.setAttribute("dur",1500);
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
    

}