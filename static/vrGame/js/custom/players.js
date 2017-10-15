class Players {

  static createAllPlayers(playersInfo){


  }


  static createMyself(playerInfo){
      //load player config
      // console.log(characterConfig)
      // console.log(playerInfo);
      // console.log(playerInfo.character);
      playerInfo.character = 1;
      var config = characterConfig[playerInfo.character];
      
      //skill init
      skillInfo = config.skill;
      skillCd.attack = config.skill.attack.cd;
      skillCd.skill1 = config.skill.skill1.cd;
      skillCd.skill2 = config.skill.skill2.cd;


      playerWrapperEl = document.createElement("a-entity");
      playerWrapperEl.setAttribute("id","playerWrapper");

      //playerWrapperEl.setAttribute("position",playerInfo.data.position );
      //for debug
      playerWrapperEl.setAttribute("position","5 0 -100");
      playerWrapperEl.setAttribute("move","moveSpeed: "+config.moveSpeed+";runSpeed: "+config.runSpeed);
      var player = document.createElement("a-entity");
      player.setAttribute("json_model","src: url("+config.model+");");
      player.setAttribute("id",client.id);
      player.setAttribute("health",playerInfo.health);
      player.setAttribute("animation-mixer",playerInfo.data.moveAnimation);
      console.log("asfdasfsfd",playerInfo.data.moveAnimation);
      //0.43 is radius of head
      // 0.85 is the distance from character's eye to feet, each character will be different

      //for debug
      //tank 0 -1.4 0
      //adc 0 -0.85 0.43
      player.setAttribute("position",config.localPosition);

     // player.setAttribute("position","0 -1.4 -2");
      //set character fixed to camera
      Players.createCamera(player,config);
      playerWrapperEl.appendChild(cameraEl);
      document.querySelector("a-scene").appendChild(playerWrapperEl);
    return player;
  }
  

  static createOtherPlayer(playerInfo){


      var player = document.createElement("a-entity");

      //load model
      player.setAttribute("json_model","src: url("+ characterConfig[playerInfo.character].model+");");
      player.addEventListener('model-loaded', function (event) {
        var boundingBox = Players.getBoundingBox(player.object3D.children[0]);
        player.setAttribute("class","collidable" );
        if(raycasterEl) raycasterEl.components.raycaster.refreshObjects();
      })

      player.setAttribute("id",playerInfo.id);
      //player.setAttribute("position",playerInfo.data.position);
      //for debug
      player.setAttribute("position","10 0 -100");
      player.setAttribute("health",playerInfo.health);
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
      cameraEl.appendChild(raycasterEl);
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
    raycasterEl.setAttribute("collider-check","");
    raycasterEl.setAttribute("id","caster");
    raycasterEl.setAttribute("position","0 0 -1");
    raycasterEl.setAttribute("geometry","primitive: ring; radiusOuter: 0.03; radiusInner: 0.015;");
    raycasterEl.setAttribute("cursor","");
    raycasterEl.setAttribute("material","color: cyan; shader: flat");

    // cursor animation
    var cursorEnter = document.createElement("a-animation");
    cursorEnter.setAttribute("begin","mouseenter");
    cursorEnter.setAttribute("attribute","material.color");
    cursorEnter.setAttribute("from","cyan");
    cursorEnter.setAttribute("to","red");
    cursorEnter.setAttribute("dur","50");
    var cursorLeave= document.createElement("a-animation");
    cursorLeave.setAttribute("begin","mouseleave");
    cursorLeave.setAttribute("attribute","material.color");
    cursorLeave.setAttribute("from","red");
    cursorLeave.setAttribute("to","cyan");
    cursorLeave.setAttribute("dur","50");
    raycasterEl.appendChild(cursorEnter);
    raycasterEl.appendChild(cursorLeave);

  }

}