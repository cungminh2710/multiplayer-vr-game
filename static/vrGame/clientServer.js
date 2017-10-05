var count = 0;

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
var gameRoom = client.join("test-arena");


// PLAYER AND GAME INFO
var playerNumber = 0; // index in state.players[] array that will correspond to this player
var myPlayerName = client.id; // player id is currently same as their browser's id
var globalState = null // it is a good idea to store state changes from server on client

// THIS IS THE FIRST STAETE THIS CLIENT WILL SEE WHEN THEY JOIN THE GAME
gameRoom.onData.add(function(data) {
    if (data.type === "initial") {
        console.log("initial room data:", data.state);

        // STORE STATE
        globalState = data.state
        console.log(globalState);
        // THIS WILL UPDATE playerNumber 
        // TO UPDATE YOUR POSITION LATER
        for (var i = 0; i < globalState.players.length; i++) {
            if (myPlayerName == globalState.players[i].id) {
                playerNumber = i;
                Players.createMyself("2.5 2.5 5");
                console.log("1");
            } else {
                Players.createOtherPlayer("2.5 2.5 5");
                console.log("ohter");
            }
        }
    } else if (data.type === "damage") {
        console.log("YOU GOT HIT");
    }

    // Players.createMyself("2.5 2.5 5");
});

// THIS WILL LISTEN FOR STATE UPDATES (movements, HP changes, deaths, etc)
gameRoom.onUpdate.add(function(state) {
    if (globalState === null) {
        return;
    }
    // this signal is triggered on each patch
    for (var i = 0; i < globalState.players.length; i++) {

        if (i === playerNumber) {
            continue;
        } else if (!isEquivalent(globalState.players[i], state.players[i])) {
            // TODO: change to player's coordinates
            console.log("CHANGE PLAYER COORD");
            console.log(state)
        }
    }
    // UPDATE CLIENT STATE
    globalState = state;
    //  console.log(state);
});

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}


