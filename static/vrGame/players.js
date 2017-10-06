class Players {

  static createAllPlayers(playersInfo){


  }


  static createMyself(playerInfo){

      var playerWrapper =  document.createElement("a-entity");
      playerWrapper.setAttribute("id","playerWrapper");
      var player = document.createElement("a-entity");

      player.setAttribute("id",client.id);
     // player.setAttribute("id","testID");
      playerWrapper.setAttribute("position",playerInfo );
 
      player.setAttribute("animation-mixer","clip: idle");
      playerWrapper.setAttribute("move","");
      player.setAttribute("json_model","src: url(models/adc.json);");

      //0.43 is radius of head
      // 0.85 is the distance from character's eye to feet, each character will be different
      player.setAttribute("position","0 -0.85 0.43");
      //for debug
      //player.setAttribute("position","0 -0.85 -1");
      var camera = Players.createCamera(player);

      playerWrapper.appendChild(camera);
      document.querySelector("a-scene").appendChild(playerWrapper);
    return player;
  }
  

  static createOtherPlayer(playerInfo){
      var player = document.createElement("a-entity");
      player.setAttribute("id",client.id);
      player.setAttribute("position",playerInfo );
      player.setAttribute("animation-mixer","clip: idle");
      player.setAttribute("json_model","src: url(models/adc.json);");
      document.querySelector("a-scene").appendChild(player);

      return player;


  }
  static createCamera(player){
     // var cameraWrapper = document.createElement("a-entity");
     // cameraWrapper.setAttribute("id","cameraWrapper");

      //TODO camera set on head position
      var camera = document.createElement("a-camera");
      camera.setAttribute("id","camera");
      //camera.setAttribute("userHeight","1.6");
      camera.setAttribute("user-height","1.0");
      camera.setAttribute("far","20000");
      camera.setAttribute("wasd-controls","enabled:false");
      camera.setAttribute("position","0 0 0");
      camera.setAttribute("rotation","0 0 0");
      camera.setAttribute("id","camera");
      //cusor
      var raycaster = document.createElement("a-entity");
      raycaster.setAttribute("raycaster","");
      raycaster.setAttribute("id","caster");
      raycaster.setAttribute("position","0 0 -1");
      raycaster.setAttribute("geometry","primitive: ring; radiusOuter: 0.03; radiusInner: 0.015;");
      raycaster.setAttribute("cursor","");
      raycaster.setAttribute("material","color: cyan; shader: flat");
      camera.appendChild(raycaster);
      camera.appendChild(player);


      // add head movement and body rotation           
      camera.addEventListener('componentchanged', function (evt) {
        if (evt.detail.name !== 'rotation') return;
          
          var rotation = camera.components.rotation.data;
         // player.setAttribute("rotation",0+" "+rotation.y+" "+0);
          var head = player.object3D.children[0].children[0].children[0].children[0];
          head.rotation.x = -Math.PI*rotation.x/180;
    

      });



      return camera;
  }


}