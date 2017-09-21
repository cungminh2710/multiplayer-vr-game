


var count = 0;

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
var gameRoom = client.join("test-arena");
gameRoom.onUpdate.addOnce(function(state) {
    console.log("initial room data:", state);
    var id = "test1";
    Players.createMyself("2.5 2.5 5");
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
    if(count == 0){
        Players.createOtherPlayer("2.5 2.5 5");
        console.log("created");
    }
    count++;
    console.log(change);

  
});




