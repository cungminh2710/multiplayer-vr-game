class Players {

  static createAllPlayers(playersInfo){


  }


  static createMyself(playerInfo){
    //   var player = Players.createOtherPlayer(playerInfo);
    //   player.appendChild(Players.createCamera());
      var playerWrapper =  document.createElement("a-entity");
      playerWrapper.setAttribute("id","playerWrapper");
      var player = document.createElement("a-entity");

      player.setAttribute("id",client.id);
     // player.setAttribute("id","testID");
      playerWrapper.setAttribute("position",playerInfo );
 
      player.setAttribute("animation-mixer","clip: idle");
      playerWrapper.setAttribute("move","");
      player.setAttribute("json_model","src: url(models/adc.json);");

      playerWrapper.appendChild(player);
      playerWrapper.appendChild(Players.createCamera(player));
     
      document.querySelector("a-scene").appendChild(playerWrapper);

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
  static createCamera(player){
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
          
          console.log("adsfda",evt);
          var rotation = camera.components.rotation.data;
         // var player = evt.srcElement
          
          //var a = document.querySelector('#cameraWrapper').getAttribute("position");
          //var player = document.querySelector("#"+client.id)
         // var player = document.querySelector("#testID")

          player.setAttribute("rotation",0+" "+rotation.y+" "+0);
          console.log(player.getAttribute("rotation"))
          var head = player.object3D.children[0].children[0].children[0].children[0];
         head.rotation.x = -Math.PI*rotation.x/180;
          //console.log(head)

      });

      cameraWrapper.appendChild(camera);

      return cameraWrapper;
  }


}