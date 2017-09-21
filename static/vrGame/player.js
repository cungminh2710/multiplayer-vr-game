// {/* <a-entity id="man"
//                
//     
       
//       > */}

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
var gameRoom = client.join("test-arena");
gameRoom.onUpdate.addOnce(function(state) {
    console.log("initial room data:", state);
});
// new room state
gameRoom.onUpdate.add(function(state) {
    // this signal is triggered on each patch
});
// listen to patches coming from the server
gameRoom.listen("messages/:number", function(change) {
    var p = document.createElement("p");
    p.innerHTML = change.value;
    document.querySelector("#messages").appendChild(p);
});
gameRoom.listen(function(change) {


    console.log("patch:", change.path, change.operation, change.value);
    createPlayer(change);
});



function createPlayer(playerInfo){

    var player = document.createElement("a-entity");
    player.setAttribute("id",playerInfo.id);
    player.setAttribute("position","0 0 -5" );
    player.setAttribute("animation-mixer","clip: idle");
    player.setAttribute("move","");
    player.setAttribute("json_model","src: url(models/bot-bunnyBoned.json);");
   // player.appendChild(createCamera());
    document.querySelector("a-scene").appendChild(player);
    console.log(a-scene)
}


// function createCamera(){
//     var cameraWrapper = document.createElement("a-entity");
//     var camera = document.createElement("a-camera");
//     camera.setAttribute("userHeight","1.5");
//     camera.setAttribute("far","20000");
//     cameraWrapper.appendChild(camera);
//     return cameraWrapper;

// }