class Players {

  static createAllPlayers(playersInfo){


  }


  static createMyself(playerInfo){
      var player = Players.createOtherPlayer(playerInfo);
      player.appendChild(Players.createCamera());

  }

  static createOtherPlayer(playerInfo){
      var player = document.createElement("a-entity");
      player.setAttribute("id","playerInfo.id");
      player.setAttribute("position","0 0 -5" );
      player.setAttribute("rotation","0 180 0" );
      player.setAttribute("animation-mixer","clip: idle");
      player.setAttribute("move","");
      player.setAttribute("json_model","src: url(models/bot-bunnyBoned.json);");
      document.querySelector("a-scene").appendChild(player);

      return player;


  }
  static createCamera(){
      var cameraWrapper = document.createElement("a-entity");
      var camera = document.createElement("a-camera");
      camera.setAttribute("userHeight","1.5");
      camera.setAttribute("far","20000");
      camera.setAttribute("wasd-controls","enabled:false");
      camera.setAttribute("position","0  0.5 -2");
      camera.setAttribute("rotation","0 180 0");
      cameraWrapper.appendChild(camera);

      return cameraWrapper;
  }


}