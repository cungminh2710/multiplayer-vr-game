




var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
var gameRoom = client.join("test-arena");
gameRoom.onUpdate.addOnce(function(state) {
    console.log("initial room data:", state);
    Players.createMyself(client.id);
});
// new room state
gameRoom.onUpdate.add(function(state) {
    // this signal is triggered on each patch
    console.log("NEW STATE");
});
// listen to patches coming from the server
gameRoom.listen("players", function(change) {
    console.log("YOU DID SOMETHING");
});
gameRoom.listen(function(change) {
    console.log("patch:", change.path, change.operation, change.value);
    // change positions of other players HERE
});




