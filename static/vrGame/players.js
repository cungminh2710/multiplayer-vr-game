class Players {

  static createAllPlayers(playersInfo){


  }


  static createMyself(playerInfo){
    //   var player = Players.createOtherPlayer(playerInfo);
    //   player.appendChild(Players.createCamera());

      var player = document.createElement("a-entity");
      player.setAttribute("id",client.id);
      player.setAttribute("position",playerInfo );
 
      player.setAttribute("animation-mixer","clip: idle");
      player.setAttribute("move","");
      player.setAttribute("json_model","src: url(models/adc.json);");
      player.appendChild(Players.createCamera());
      document.querySelector("a-scene").appendChild(player);

  }
  

  static createOtherPlayer(playerInfo){
      var player = document.createElement("a-entity");
      player.setAttribute("id","aaa");
      player.setAttribute("position",playerInfo );
 
      player.setAttribute("animation-mixer","clip: idle");
      player.setAttribute("json_model","src: url(models/adc.json);");
      document.querySelector("a-scene").appendChild(player);

      return player;


  }
  static createCamera(){
      var cameraWrapper = document.createElement("a-entity");
      cameraWrapper.setAttribute("id","cameraWrapper");

      //TODO camera set on head position
      var camera = document.createElement("a-camera");
      camera.setAttribute("id","camera");
      camera.setAttribute("userHeight","0");
      camera.setAttribute("far","20000");
      camera.setAttribute("wasd-controls","enabled:false");
      camera.setAttribute("position","0  0 2");
      camera.setAttribute("rotation","0 0 0");
      camera.setAttribute("id","camera");

      var raycaster = document.createElement("a-entity");
      raycaster.setAttribute("raycaster","");
      raycaster.setAttribute("id","caster");
      raycaster.setAttribute("position","0 0 -1");
      raycaster.setAttribute("geometry","primitive: ring; radiusOuter: 0.03; radiusInner: 0.015;");
      raycaster.setAttribute("cursor","");
      raycaster.setAttribute("material","color: cyan; shader: flat");
      camera.appendChild(raycaster);


                  
      camera.addEventListener('componentchanged', function (evt) {
        if (evt.detail.name !== 'rotation') return;
          var rotation = evt.detail.newData;
          var a = document.querySelector('#cameraWrapper').getAttribute("position");
          document.querySelector("#"+client.id).setAttribute("rotation",rotation);
        
      });

      cameraWrapper.appendChild(camera);

      return cameraWrapper;
  }


}