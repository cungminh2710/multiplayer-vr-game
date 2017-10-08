var count = 0;

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
var roomName = findGetParameter("roomName");
var gameRoom = client.join(roomName != null ? roomName : "test-arena", { id: client.id, test: roomName == null });
var playersDict = {};

// PLAYER AND GAME INFO
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
// gameRoom.onUpdate.add(function(state) {
//     console.log("IN UPDATE", state, globalState);
//     if (globalState === null) {
//         return;
//     }
//     // this signal is triggered on each patch
//     for (var key in state.players) {
//         // skip loop if the property is from prototype
//         if (!state.players.hasOwnProperty(key)) continue;
//         var player = state.players[key];
//         if (key == client.id) {
//             // check health
//             continue;
//         } else if (!isEquivalent(globalState.players[key], state.players[key], state.players[key].id)) {
//             // TODO: change to player's coordinates
//             console.log("CHANGE PLAYER COORD");
//         }
//     }
//     // UPDATE CLIENT STATE
//     globalState = state;
//     console.log(state);
// });

gameRoom.listen("players/:id", function(change) {
    console.log("CHANGE OF PLAYER NUMBERS");
    console.log(change.path); // => { id: "f98h3f", attribute: "y" }
    console.log(change.operation); // => "replace" (can be "add", "remove" or "replace")
    console.log(change.value); // => 1

    if (change.path.id == client.id) {
        player = Players.createMyself("0 0 5");
        console.log("MYSELF CREATED");
    } else {
        player = Players.createOtherPlayer("0 0 5");
        console.log("OTHER" + change.path.id + " " + "CREATED");
    }
})


// THIS STUFF ONLY HAPPENS WHEN A PLAYER'S ANIMATION OR 
gameRoom.listen("players/:id/data/:attribute", function(change) {
    console.log("CHANGE ANIMATION");
    // console.log(change.path);
    // console.log(change.operation);
    // console.log(change.value);

    if(change.path.id == client.id){
        console.log("ITS MY OWN CHANGE");
        return;
    }else{
        var personThatMoved = change.path.id;
        var newValue = change.value;
        if(change.path.attribute == "moveAnimation"){
            //CHANGE THIS OPPONENT'S MOVE ANIMATION
        }
    }
});

gameRoom.listen("players/:id/data/position/:attribute", function(change) {
    console.log("CHANGE POS");
    // console.log(change.path);
    // console.log(change.operation);
    // console.log(change.value);

    if(change.path.id == client.id){
        console.log("ITS MY OWN CHANGE");
        return;
    }else{
        var personThatMoved = change.path.id;
        var newValue = change.value;
        if(change.path.attribute == "x"){
            //CHANGE THIS OPPONENT'S X POS
        }else if(change.path.attribute == "y"){
            //CHANGE THIS OPPONENT'S Y POSITION
        }else{
            //CHANGE THIS OPPONENT'S Z POSITION
        }
    }
});


gameRoom.listen("players/:id/health/:number", function(change) {
    console.log("CHANGE LISTENED");
    // console.log(change.path);
    // console.log(change.operation);
    // console.log(change.value);

    if(change.path.id != client.id){
        return;
    }else if(change.value == 100){
        // REVIVE YOUR PLAYER
    }else{
        // DO ANIMATION TO SHOW THAT YOU TOOK DAMAGE
    }
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