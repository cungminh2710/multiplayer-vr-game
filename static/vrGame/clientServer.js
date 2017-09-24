var count = 0;

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
var gameRoom = client.join("test-arena");


// PLAYER AND GAME INFO
var playerNumber = 0; // index in state.players[] array that will correspond to this player
var myPlayerName = client.id; // player id is currently same as their browser's id
var globalState = {} // it is a good idea to store state changes from server on client

// THIS IS THE FIRST STAETE THIS CLIENT WILL SEE WHEN THEY JOIN THE GAME
gameRoom.onJoin.addOnce(function(state) {
    console.log("initial room data:", state);

    // STORE STATE
    globalState = state

    // THIS WILL UPDATE playerNumber 
    // TO UPDATE YOUR POSITION LATER
    for (var i = 0; i < state.players.length; i++) {
        if (myPlayerName == state.players[i].id) {
            playerNumber = i;
            break;
        }
    }

    Players.createMyself("2.5 2.5 5");
});

// THIS WILL LISTEN FOR STATE UPDATES (movements, HP changes, deaths, etc)
gameRoom.onUpdate.add(function(state) {
    // UPDATE CLIENT STATE
    globalState = state;

    // this signal is triggered on each patch
    for (var i = 0; i < state.players.length; i++) {

        // TODO: change to player's coordinates
        if (i == playerNumber) {
            Players.createMyself("2.5 2.5 5")
        } else {
            Players.createOtherPlayer("2.5 2.5 5");
        }
    }
    console.log(state);
});