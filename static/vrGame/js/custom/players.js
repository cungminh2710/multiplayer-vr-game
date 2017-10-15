class Players {

  static createAllPlayers(playersInfo){


  }


  static createMyself(playerInfo){

      playerWrapperEl = document.createElement("a-entity");
      playerWrapperEl.setAttribute("id","playerWrapper");
      playerWrapperEl.setAttribute("position",playerInfo );
      playerWrapperEl.setAttribute("move","");

      var player = document.createElement("a-entity");
      player.setAttribute("id",client.id);
      player.setAttribute("animation-mixer","clip:idle");
      player.setAttribute("json_model","src: url(models/adc.json);");
      //0.43 is radius of head
      // 0.85 is the distance from character's eye to feet, each character will be different

      //for debug
      //tank 0 -1.4 0
      //adc 0 -0.85 0.43
      player.setAttribute("position","0 -1.4 0");

     // player.setAttribute("position","0 -1.4 -2");
      //set character fixed to camera
      Players.createCamera(player);
      playerWrapperEl.appendChild(cameraEl);
      document.querySelector("a-scene").appendChild(playerWrapperEl);
    return player;
  }
  

  static createOtherPlayer(playerInfo,id){

      var player = document.createElement("a-entity");
      player.setAttribute("id",id);
      player.setAttribute("position",playerInfo );
      player.setAttribute("animation-mixer","clip: idle");

      player.setAttribute("json_model","src: url(models/adc.json);");
      player.addEventListener('model-loaded', function (event) {
        var boundingBox = Players.getBoundingBox(player.object3D.children[0]);
        console.log("MODELLOADED*********************************")
        player.setAttribute("class","collidable" );
        if(raycasterEl) raycasterEl.components.raycaster.refreshObjects();
      })
       
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

  static createCamera(player){
      cameraEl = document.createElement("a-camera");
      cameraEl.setAttribute("id","camera");
      //cameraEl.setAttribute("userHeight","1.6");
      cameraEl.setAttribute("userHeight","1.6");
     // cameraEl.setAttribute("user-height","0.4");
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