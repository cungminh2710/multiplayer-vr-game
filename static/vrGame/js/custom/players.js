class Players {
  
    static createAllPlayers(playersInfo){
  
  
    }
  
    static createTurret(turretInfo,myPos){
      var tower = document.createElement("a-box");
      
      
      tower.setAttribute("depth",12);
      tower.setAttribute("height",12);
      tower.setAttribute("width",12);
      tower.setAttribute("position",pos);
      tower.setAttribute("material","transparent:true;opacity:0");
      var z = myPos.split(" ")[2];
      tower.setAttribute("initalHealth",turretInfo.health);
      var pos = "";
      if (turretInfo.team == 'ally'){  
        if(z == "-5"){
          pos = "60 9 -15";
          tower.setAttribute("position",pos)
        }
        else{
          pos = "60 9 -225";
          tower.setAttribute("position",pos)
        } 
      }else{
        if(z == "-5"){
          pos = "60 9 -225";
          tower.setAttribute("position",pos)
        }
        else{
          pos = "60 9 -15";
          tower.setAttribute("position",pos)
  
        } 
        tower.setAttribute("class","collidable" );
       
      }
      tower.setAttribute("team",turretInfo.team);
  
      tower.setAttribute("id",turretInfo.id);
  
      var towerpan = document.createElement("a-entity");
      towerpan.setAttribute("geometry","primitive:cone; radiusBottom: 2; radiusTop: 3;height:1");
      towerpan.setAttribute("material","src:#towerbase");
      towerpan.setAttribute("scale","2.5 2.5 2.5");
      towerpan.setAttribute("position","0 -6 0");
      var magicBall = document.createElement('a-entity');
      magicBall.setAttribute("id","towerBall");
      magicBall.setAttribute("geometry","primitive:sphere;radius:1.25;")
      magicBall.setAttribute("position","0 2.5 0");
      magicBall.setAttribute("material","src:#magicball")
      var ballAni = document.createElement('a-animation');
      ballAni.setAttribute("attribute","position");
      ballAni.setAttribute("to","0 3.0 0");
      ballAni.setAttribute("dur","2000");
      ballAni.setAttribute("direction","alternate");
      ballAni.setAttribute("repeat","indefinite");
      magicBall.appendChild(ballAni);
      towerpan.appendChild(magicBall);
      var zhuzi1 = document.createElement("a-entity");
      zhuzi1.setAttribute("geometry","primitive:cylinder;radius:0.2;height:2");
      zhuzi1.setAttribute("rotation","0 0 -30")
      zhuzi1.setAttribute("material","src:#zhuzi");
      zhuzi1.setAttribute("position","-2 1.5 0");
      towerpan.appendChild(zhuzi1);
       var zhuzi2 = document.createElement("a-entity");
      zhuzi2.setAttribute("geometry","primitive:cylinder;radius:0.2;height:2");
      zhuzi2.setAttribute("rotation","0 0 30")
      zhuzi2.setAttribute("material","src:#zhuzi");
      zhuzi2.setAttribute("position","2 1.5 0");
      towerpan.appendChild(zhuzi2);
      var zhuzi3 = document.createElement("a-entity");
      zhuzi3.setAttribute("geometry","primitive:cylinder;radius:0.2;height:2");
      zhuzi3.setAttribute("rotation","-30 0 0")
      zhuzi3.setAttribute("material","src:#zhuzi");
      zhuzi3.setAttribute("position","0 1.5 2");
      towerpan.appendChild(zhuzi3);
      var zhuzi4 = document.createElement("a-entity");
      zhuzi4.setAttribute("geometry","primitive:cylinder;radius:0.2;height:2");
      zhuzi4.setAttribute("rotation","30 0 0")
      zhuzi4.setAttribute("material","src:#zhuzi");
      zhuzi4.setAttribute("position","0 1.5 -2");
      towerpan.appendChild(zhuzi4);
  
  
      var healthBar = Players.createHealthBar(9,2);
  
      tower.appendChild(towerpan);
      tower.appendChild(healthBar);
      if(raycasterEl) raycasterEl.components.raycaster.refreshObjects();
      document.querySelector("a-scene").appendChild(tower);
      return tower;
    }
  
  
    static createMyself(playerInfo){
        character = playerInfo.character;
        //character = 3;
        var config = characterConfig[character];
        
        //skill init
        skillInfo = config.skill;
  
  
        playerWrapperEl = document.createElement("a-entity");
        playerWrapperEl.setAttribute("id","playerWrapper");
        playerWrapperEl.setAttribute("class","collidable");
   
        console.log(playerInfo.data.position );
        //for debug
        //playerWrapperEl.setAttribute("position","5 3 -3");
        playerWrapperEl.setAttribute("visible",true);
        playerWrapperEl.setAttribute("control","moveSpeed: "+config.moveSpeed+";runSpeed: "+config.runSpeed);
        var player = document.createElement("a-entity");
        player.setAttribute("json_model","src: url("+config.model+"-yellow.json);");
        player.setAttribute("id",client.id);
        player.setAttribute("health",config.health);
        player.setAttribute("team","ally");
        player.setAttribute("animation-mixer",playerInfo.data.moveAnimation);
        //console.log("CREATEMYSELF MOVEANIMATION: ",playerInfo.data.moveAnimation);
        //0.43 is radius of head
        // 0.85 is the distance from character's eye to feet, each character will be different
        player.addEventListener('model-loaded', function (event) {
          //var boundingBox = Players.getBoundingBox(player.object3D.children[0]);
          //console.log(boundingBox)
          player.setAttribute("position",config.localPosition);
          playerWrapperEl.setAttribute("position",playerInfo.data.position );
        })
        
  
        //set character fixed to camera
        Players.createCamera(player,config);
      
        
      return player;
    }
    
    static createHealthBar(y,radius){
  
  
      var outsphere = document.createElement("a-sphere");
      outsphere.setAttribute("radius",radius);
      outsphere.setAttribute("position",0+" "+y+" "+0.1);
      outsphere.setAttribute("material","color:#00FA9A;transparent:true;opacity:0.3");
      var innersphere = document.createElement('a-sphere');
      innersphere.setAttribute('radius',radius-0.02);
      innersphere.setAttribute('initRadius',radius-0.02);
      innersphere.setAttribute('id',"healthBar");
      innersphere.setAttribute("material","color:#DC143C");
      outsphere.appendChild(innersphere);
      return outsphere;
  
    }
    static createOtherPlayer(playerInfo){
      //console.log(playerInfo);
      //console.log(playerInfo.character);  
     // playerInfo.character = 3;
        var model = characterConfig[playerInfo.character].model;
    
        if(playerInfo.team == "ally") model += "-yellow.json";
        else model += "-red.json";
  
        var player = document.createElement("a-entity");
  
        //load model
        player.setAttribute("json_model","src: url("+model+");");
        player.addEventListener('model-loaded', function (event) {
         // var boundingBox = Players.getBoundingBox(player.object3D.children[0]);
          player.setAttribute("class","collidable" );
          if(raycasterEl) raycasterEl.components.raycaster.refreshObjects();
        })
        player.setAttribute("visible",true);
        player.setAttribute("id",playerInfo.id);
  
        player.setAttribute("team",playerInfo.team);
        player.setAttribute("initalHealth",characterConfig[playerInfo.character].health);
        player.setAttribute("position",playerInfo.data.position);
        //for debug
        //player.setAttribute("position","10 3 -3");
        player.setAttribute("health",characterConfig[playerInfo.character].health);
        player.setAttribute("rotation",playerInfo.rotation);
      
        player.setAttribute("animation-mixer",playerInfo.data.moveAnimation);
         
        document.querySelector("a-scene").appendChild(player);
        var healthBar = Players.createHealthBar(characterConfig[playerInfo.character].healthBarPos,0.2);
        player.appendChild(healthBar);
        return player;
  
    }
  
    static getBoundingBox(player){
      player.geometry.computeBoundingBox();
      var boundingBox = player.geometry.boundingBox;
      return {x:boundingBox.max.x-boundingBox.min.x,
              y:boundingBox.max.y-boundingBox.min.y,
              z:boundingBox.max.z-boundingBox.min.z};
  
    }
  
    static createCamera(player,config){
        var userHeight = config.cameraHeight;
        cameraEl = document.createElement("a-camera");
        cameraEl.setAttribute("position","0 0 0");
        cameraEl.setAttribute("rotation","0 0 0");
        cameraEl.setAttribute("id","camera");
        cameraEl.setAttribute("active",true);
        cameraEl.setAttribute("look-controls");
        cameraEl.setAttribute("user-height",userHeight);
        cameraEl.setAttribute("far","2000");
        cameraEl.setAttribute("wasd-controls","enabled:false");
        cameraEl.setAttribute("id","camera");
        //raycaster
        Players.createRayCaster(config); 
        Players.createPanel(config);
        cameraEl.appendChild(player);
        // add head movement and body rotation           
        cameraEl.addEventListener('componentchanged', function (evt) {
          if (evt.detail.name !== 'rotation') return;
            var rotation = cameraEl.components.rotation.data;
            gameRoom.send({action: "ROTATION", data: 0+" "+rotation.y+" "+0}); 
           // console.log("Crotation",rotation);
            //player.object3D.rotation.x = -Math.PI*rotation.x/180;
            //console.log(player.object3D.rotation);
            //player.setAttribute("rotation",0+" "+rotation.y+" "+0);
          //head rotation 
          //var head = player.object3D.children[0].children[0].children[0].children[0];
          //head.rotation.x = -Math.PI*rotation.x/180;
  
         });
         playerWrapperEl.appendChild(cameraEl);
         document.querySelector("a-scene").appendChild(playerWrapperEl);
    }
  
    static createRayCaster(config){
      //raycaster setting
      raycasterEl = document.createElement("a-entity");
      raycasterEl.setAttribute("raycaster","objects: .collidable;far:"+config.gazeDistance+";recursive:false");
     // raycasterEl.setAttribute("collider-check","");
      raycasterEl.setAttribute("id","caster");
      raycasterEl.setAttribute("position","0 0 -1");
      raycasterEl.setAttribute("geometry","primitive: ring; radiusOuter: 0.03; radiusInner: 0.015;");
      raycasterEl.setAttribute("cursor","");
      raycasterEl.setAttribute("material","color: black; shader: flat");
  
      raycasterEl.addEventListener("mouseenter",function(evt){
        if(evt.detail.intersectedEl.getAttribute("team")=="enemy"){
          raycasterEl.emit('targetEnemy');
        }
        else{ raycasterEl.emit('targetAlly');
      }
  
      });
      // cursor animation
      var targetEnemy = document.createElement("a-animation");
      targetEnemy.setAttribute("begin","targetEnemy");
      targetEnemy.setAttribute("attribute","material.color");
      targetEnemy.setAttribute("from","black");
      targetEnemy.setAttribute("to","red");
      targetEnemy.setAttribute("dur","1");
  
      var targetAlly = document.createElement("a-animation");
      targetAlly.setAttribute("begin","targetAlly");
      targetAlly.setAttribute("attribute","material.color");
      targetAlly.setAttribute("from","black");
      targetAlly.setAttribute("to","cyan");
      targetAlly.setAttribute("dur","1");
  
      var cursorLeave= document.createElement("a-animation");
      cursorLeave.setAttribute("begin","mouseleave");
      cursorLeave.setAttribute("attribute","material.color");
      cursorLeave.setAttribute("from","black");
      cursorLeave.setAttribute("to","black");
      cursorLeave.setAttribute("dur","0");
  
      raycasterEl.appendChild(targetEnemy);
      raycasterEl.appendChild(targetAlly);
      raycasterEl.appendChild(cursorLeave);
      cameraEl.appendChild(raycasterEl);
  
    }
  
    static createPanel(config){
  
      panel = document.createElement("a-entity");
      panel.setAttribute("geometry","primitive:plane;height: 0.03; width: 0.06");
      panel.setAttribute("material","color:gray;transparent:true;opacity:0.5");
      panel.setAttribute("position","0 0.05 -0.1");
      panel.setAttribute("id","panel");
      
      var damageanimation = document.createElement("a-animation");
      damageanimation.setAttribute("attribute","material.color");
      damageanimation.setAttribute("begin","damage");
      damageanimation.setAttribute("from","red");
      damageanimation.setAttribute("to","gray");
      damageanimation.setAttribute("dur","1000");
      damageanimation.setAttribute("repeat","0");
      panel.appendChild(damageanimation);
  
      var healthtext = document.createElement("a-text");
      healthtext.setAttribute("id","health");
      healthtext.setAttribute("position","-0.02 0.011 0");
      healthtext.setAttribute("value","Health: "+config.health);
      
      healthtext.setAttribute("width","0.1");
      healthtext.setAttribute("color","white");
      panel.appendChild(healthtext);
      
  
      var attack = document.createElement("a-text");
      attack.setAttribute("id","attack");
      attack.setAttribute("position","-0.02 0.004 0");
      attack.setAttribute("value",config.skill.attack.name+": Ready");
      attack.setAttribute("width","0.1");
      attack.setAttribute("color","green");
  
      var attackanimation = document.createElement("a-animation");
      attackanimation.setAttribute("attribute","color");
      attackanimation.setAttribute("begin","start");
      attackanimation.setAttribute("from","red");
      attackanimation.setAttribute("to","red");
      attackanimation.setAttribute("dur",config.skill.attack.cd);
      attackanimation.setAttribute("repeat","0");
      attack.appendChild(attackanimation);
      attack.addEventListener("animationend",function(){
        attack.setAttribute("value",config.skill.attack.name+": Ready");
         Animation.setAnimation(playerWrapperEl.querySelector("#"+client.id),"none");
         attack.setAttribute("color","green");
      });
      attack.addEventListener("animationstart",function(){
        attack.setAttribute("value",config.skill.attack.name+": Not Ready");
         
      });
      panel.appendChild(attack);
  
      var skill1 = document.createElement("a-text");
      skill1.setAttribute("id","skill1");
      skill1.setAttribute("position","-0.02 -0.003 0");
      skill1.setAttribute("value",config.skill.skill1.name+": Ready");
      skill1.setAttribute("width","0.1");
      skill1.setAttribute("color","green");
      var skill1animation = document.createElement("a-animation");
      skill1animation.setAttribute("attribute","color");
      skill1animation.setAttribute("begin","start");
      skill1animation.setAttribute("from","red");
      skill1animation.setAttribute("to","red");
      skill1animation.setAttribute("dur",config.skill.skill1.cd);
      skill1animation.setAttribute("repeat","0");
      skill1.appendChild(skill1animation);
      skill1.addEventListener("animationend",function(){
         skill1.setAttribute("value",config.skill.skill1.name+": Ready");
         Animation.setAnimation(playerWrapperEl.querySelector("#"+client.id),"none");
         skill1.setAttribute("color","green");
      });
      skill1.addEventListener("animationstart",function(){
         skill1.setAttribute("value",config.skill.skill1.name+": Not Ready");
         
      });
      panel.appendChild(skill1);
      
      var skill2 = document.createElement("a-text");
      skill2.setAttribute("id","skill2");
      skill2.setAttribute("position","-0.02 -0.01 0");
      skill2.setAttribute("value",config.skill.skill2.name+": Ready");
      skill2.setAttribute("width","0.1");
      skill2.setAttribute("color","green");
      var skill2animation = document.createElement("a-animation");
      skill2animation.setAttribute("attribute","color");
      skill2animation.setAttribute("begin","start");
      skill2animation.setAttribute("from","red");
      skill2animation.setAttribute("to","red");
      skill2animation.setAttribute("dur",config.skill.skill2.cd);
      skill2animation.setAttribute("repeat","0");
      skill2.appendChild(skill2animation);
      skill2.addEventListener("animationend",function(){
        skill2.setAttribute("value",config.skill.skill2.name+": Ready");
        // if(tween) tween.stop();
        skill2.setAttribute("color","green");
        Animation.setAnimation(playerWrapperEl.querySelector("#"+client.id),"none");
      });
      skill2.addEventListener("animationstart",function(){
         skill2.setAttribute("value",config.skill.skill2.name+": Not Ready");
      });
  
      panel.appendChild(skill2);
      cameraEl.appendChild(panel);
  
  
    }
  
  }