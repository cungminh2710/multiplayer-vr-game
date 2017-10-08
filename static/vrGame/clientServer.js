var count = 0;

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
var roomName = findGetParameter("roomName");
var gameRoom = client.join(roomName != null ? roomName : "test-arena", { id: client.id, test: roomName == null });
var playersDict = {};

// PLAYER AND GAME INFO
var playerNumber = 0; // index in state.players[] array that will correspond to this player
var myPlayerName = client.id; // player id is currently same as their browser's id
var globalState = null // it is a good idea to store state changes from server on client

// THIS IS THE FIRST STAETE THIS CLIENT WILL SEE WHEN THEY JOIN THE GAME
gameRoom.onData.add(function(data) {
    if (data.type == "initial") {
        console.log("initial room data:", data.state);

        // STORE STATE
        globalState = data.state
        console.log(globalState);
        // THIS WILL UPDATE playerNumber 
        // TO UPDATE YOUR POSITION LATER
        for (var i = 0; i < globalState.players.length; i++) {
            if (myPlayerName == globalState.players[i].id) {
                playerNumber = i;

                player = Players.createMyself("0 0 5");
                console.log("MYSELF CREATED");
            } else {
                player = Players.createOtherPlayer("0 0 5");
                console.log("OTHER" + i + " " + "CREATED");
            }
            playersDict[globalState.players[i].id] = player;
            console.log(globalState.players[i].id);

        }
        //console.log(playersDict);
        //console.log(playersDict["BJ26x2ljW"]);
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
        } else if (!isEquivalent(globalState.players[i], state.players[i], state.players[i].id)) {
            // TODO: change to player's coordinates
            console.log("CHANGE PLAYER COORD");

        }
    }
    // UPDATE CLIENT STATE
    globalState = state;
    console.log(state);
});

gameRoom.listen("players/:id/:attribute", function(change) {
    console.log("CHANGE LISTENED");
    console.log(change.path.id, change.path.attribute, change.operation, change.value);
});

gameRoom.onJoin.add(function() {
    console.log("JOIN_SUCCESSFUL");
})

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function isEquivalent(a, b, id) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (JSON.stringify(a[propName]) != JSON.stringify(b[propName])) {
            console.log(JSON.stringify(a[propName]));
            console.log(a[propName]);
            var newPos = b[propName].position;
            console.log(id)
            console.log(newPos);

            var player = playersDict[id];
            var animation = b[propName].moveAnimation;
            player.setAttribute("position", newPos);
            console.log(player);
            var preAnimation = player.getAttribute("animation-mixer").clip;
            console.log(preAnimation);
            if (preAnimation.includes(animation) == false) {
                console.log("animation= " + animation)
                Animation.setAnimation(player, animation);
            }

            console.log("updated", playersDict[id].getAttribute("position"));
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}