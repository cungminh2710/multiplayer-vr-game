class Players {

  static createAllPlayers(playersInfo){


  }


  static createMyself(playerInfo){

      var playerWrapper =  document.createElement("a-entity");
      playerWrapper.setAttribute("id","playerWrapper");
      playerWrapper.setAttribute("position",playerInfo );
      playerWrapper.setAttribute("move","");


      var player = document.createElement("a-entity");
      player.setAttribute("id",client.id);
      player.setAttribute("animation-mixer","clip:run");
      player.setAttribute("json_model","src: url(models/tank.json);");

      //0.43 is radius of head
      // 0.85 is the distance from character's eye to feet, each character will be different
      player.setAttribute("position","0 -0.85 0.43");
      //for debug
      //tank 0 -1.4 0
      //adc 0 -0.85 0.43
      player.setAttribute("position","0 -1.4 0");
      var camera = Players.createCamera(player);
      playerWrapper.appendChild(camera);

      document.querySelector("a-scene").appendChild(playerWrapper);
    return player;
  }
  

  static createOtherPlayer(playerInfo,id){

      var player = document.createElement("a-entity");
      player.setAttribute("id",id);
      player.setAttribute("position",playerInfo );
      player.setAttribute("animation-mixer","clip: idle");

      player.setAttribute("json_model","src: url(models/tank.json);");
      player.addEventListener('model-loaded', function (event) {
        var boundingBox = Players.getBoundingBox(player.object3D.children[0]);
        console.log(boundingBox)
        console.log("MODELLOADED*********************************")
        player.setAttribute("class","collidable" );
       // var raycasterEl = AFRAME.scenes[0].querySelector('[raycaster]');

       // var raycasterEl = document.querySelector('#caster');
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
     // var cameraWrapper = document.createElement("a-entity");
     // cameraWrapper.setAttribute("id","cameraWrapper");

      //TODO camera set on head position
      var camera = document.createElement("a-camera");
      camera.setAttribute("id","camera");
      //camera.setAttribute("userHeight","1.6");
      camera.setAttribute("userHeight","1.6");
     // camera.setAttribute("user-height","0.4");
      camera.setAttribute("far","2000");
      camera.setAttribute("wasd-controls","enabled:false");
      camera.setAttribute("position","0 0 0");
      camera.setAttribute("rotation","0 0 0");
      camera.setAttribute("id","camera");
      //raycaster

    
      Players.createRayCaster(); 
      camera.appendChild(raycasterEl);
      camera.appendChild(player);


      // add head movement and body rotation           
      camera.addEventListener('componentchanged', function (evt) {
        if (evt.detail.name !== 'rotation') return;
          
          var rotation = camera.components.rotation.data;
          gameRoom.send({action: "ROTATION", data: 0+" "+rotation.y+" "+0}); 
         //player.setAttribute("rotation",0+" "+rotation.y+" "+0);
        
          //var head = player.object3D.children[0].children[0].children[0].children[0];
         // head.rotation.x = -Math.PI*rotation.x/180;
    

       });
       
      //  <a-animation begin="mouseenter"  attribute="material.color" from="black" to="red" dur="100"></a-animation>
      //  <a-animation begin="mouseleave"  attribute="material.color" from="red" to="black" dur="100"></a-animation>



      return camera;
  }
  static createRayCaster(){
    raycasterEl = document.createElement("a-entity");
    raycasterEl.setAttribute("raycaster","objects: .collidable;far:20;recursive:false");
    raycasterEl.setAttribute("collider-check","");
    raycasterEl.setAttribute("id","caster");
    raycasterEl.setAttribute("position","0 0 -1");
    raycasterEl.setAttribute("geometry","primitive: ring; radiusOuter: 0.03; radiusInner: 0.015;");
    raycasterEl.setAttribute("cursor","");
    raycasterEl.setAttribute("material","color: cyan; shader: flat");

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