class Players {

  static createAllPlayers(playersInfo){


  }


  static createMyself(playerInfo){
      character = playerInfo.character;
      character = 2;
      var config = characterConfig[character];
      
      //skill init
      skillInfo = config.skill;


      playerWrapperEl = document.createElement("a-entity");
      playerWrapperEl.setAttribute("id","playerWrapper");
      playerWrapperEl.setAttribute("class","collidable");
      //playerWrapperEl.setAttribute("position",playerInfo.data.position );
      //for debug
      playerWrapperEl.setAttribute("position","5 0 -100");
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
      // player.addEventListener('model-loaded', function (event) {
      //   //var boundingBox = Players.getBoundingBox(player.object3D.children[0]);
      //   //console.log(boundingBox)
      // })
      player.setAttribute("position",config.localPosition);

      //set character fixed to camera
      Players.createCamera(player,config);
      playerWrapperEl.appendChild(cameraEl);
      document.querySelector("a-scene").appendChild(playerWrapperEl);
    return player;
  }
  

  static createOtherPlayer(playerInfo){
    //console.log(playerInfo);
    //console.log(playerInfo.character);  
      playerInfo.character = 2;
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

      player.setAttribute("id",playerInfo.id);
      console.log(playerInfo);
      player.setAttribute("team",playerInfo.team);
      //player.setAttribute("position",playerInfo.data.position);
      //for debug
      player.setAttribute("position","10 0 -100");
      player.setAttribute("health",characterConfig[playerInfo.character].health);
      player.setAttribute("rotation",playerInfo.rotation);
    
      player.setAttribute("animation-mixer",playerInfo.data.moveAnimation);
       
      document.querySelector("a-scene").appendChild(player);
  
      return player;

  }

  static getBoundingBox(player){
    //console.log(player)
    player.geometry.computeBoundingBox();
    var boundingBox = player.geometry.boundingBox;
    //console.log(boundingBox)
    return {x:boundingBox.max.x-boundingBox.min.x,
            y:boundingBox.max.y-boundingBox.min.y,
            z:boundingBox.max.z-boundingBox.min.z};

  }

  static createCamera(player,config){
      var userHeight = config.cameraHeight;
      cameraEl = document.createElement("a-camera");
      cameraEl.setAttribute("id","camera");
      cameraEl.setAttribute("user-height",userHeight);
      cameraEl.setAttribute("far","2000");
      cameraEl.setAttribute("wasd-controls","enabled:false");
      cameraEl.setAttribute("position","0 0 0");
      cameraEl.setAttribute("rotation","0 0 0");
      cameraEl.setAttribute("id","camera");
      //raycaster
      Players.createRayCaster(); 
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
  }

  static createRayCaster(){
    //raycaster setting
    raycasterEl = document.createElement("a-entity");
    raycasterEl.setAttribute("raycaster","objects: .collidable;far:20;recursive:false");
   // raycasterEl.setAttribute("collider-check","");
    raycasterEl.setAttribute("id","caster");
    raycasterEl.setAttribute("position","0 0 -1");
    raycasterEl.setAttribute("geometry","primitive: ring; radiusOuter: 0.03; radiusInner: 0.015;");
    raycasterEl.setAttribute("cursor","");
    raycasterEl.setAttribute("material","color: black; shader: flat");

    raycasterEl.addEventListener("mouseenter",function(evt){
      console.log(evt)
      if(evt.detail.intersectedEl.getAttribute("team")=="enemy")raycasterEl.emit('targetEnemy');
      else raycasterEl.emit('targetAlly');

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
    
    var healthtext = document.createElement("a-text");
    healthtext.setAttribute("id","health");
    healthtext.setAttribute("position","-0.01 0.01 0");
    console.log(config)
    healthtext.setAttribute("value","Health: "+config.health);
    
    healthtext.setAttribute("width","0.1");
    healthtext.setAttribute("color","white");
    panel.appendChild(healthtext);
    
    var skill1 = document.createElement("a-text");
    skill1.setAttribute("id","skill1");
    skill1.setAttribute("position","-0.01 0 0");
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
    skill2.setAttribute("position","-0.01 -0.01 0");
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
    console.log("have created panel");


  }

}