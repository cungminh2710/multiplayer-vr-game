var count = 0;

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client('ws://' + host + (location.port ? ':' + location.port : ''));
var roomName = findGetParameter("roomName");
var gameRoom = client.join(roomName != null ? roomName : "test-arena", { id: client.id, test: roomName == null });
var playersDict = {};
var raycasterEl;
var cameraEl;
var playerWrapperEl;
var panel = document.createElement("a-entity");
var team = "";
// PLAYER AND GAME INFO
var myPlayerName = client.id; // player id is currently same as their browser's id
var globalState = [] // it is a good idea to store state changes from server on client
var skillInfo ={}
var skillCd = {
    attack: Infinity,
    skill1: Infinity,
    skill2: Infinity
}
// THIS IS THE FIRST STAETE THIS CLIENT WILL SEE WHEN THEY JOIN THE GAME
gameRoom.onData.add(function(data) {
    if (data.type == "initial") {

        // STORE STATE
        // THIS WILL UPDATE playerNumber 
        // TO UPDATE YOUR POSITION LATER
        for (var p in data.state) {
            console.log("````````````````````````````````````");
            // check if the property/key is defined in the object itself, not in parent
            if (data.state.hasOwnProperty(p)) {
                console.log(p, data.state[p].id);
                console.log("````````````````````````````````````");
                if(data.state[p].team == team ) data.state[p].team = "ally";
                else data.state[p].team = "enemy";
                player = Players.createOtherPlayer(data.state[p]);

                console.log("ondata: ",player);
                playersDict[data.state[p].id] = player
            }
        }

    } else if (data.type === "damage") {
        console.log("YOU GOT HIT");
    }

});
//create players
gameRoom.listen("players/:id", function(change) {
    console.log("CHANGE OF PLAYER NUMBERS");
    if (change.path.id == client.id) {
        team = change.value.team;
        console.log("MESELF",team);
        player = Players.createMyself(change.value);
        console.log("MYSELF CREATED");
    } else {
        if(change.value.team == team) change.value.team = "ally";
        else change.value.team = "enemy";
        player = Players.createOtherPlayer(change.value);
        console.log("listen: others ", player);

    }
    playersDict[change.path.id] = player
})

gameRoom.listen("gameOver", function(change) {
    console.log("GAME OVER");
});

gameRoom.listen("turrets/:attribute", function(change) {
    console.log("DAMAGE TO TURRET");
});

// THIS STUFF ONLY HAPPENS WHEN A PLAYER'S ANIMATION
gameRoom.listen("players/:id/data/:attribute", function(change) {
    //  console.log("CHANGE ANIMATION");
    // console.log(change.path);
    // console.log(change.operation);
    // console.log(change.value);
    if (change.path.id == client.id) {
        //console.log("ITS MY OWN CHANGE");
        return;
    }
    var newValue = change.value;
    if (newValue == "") return
    var id = change.path.id;
    if (change.path.attribute == "moveAnimation") {
        playersDict[id].setAttribute("animation-mixer", "clip: " + newValue);

    } else {
        playersDict[id].setAttribute("position", newValue);


    }
});
//not working so i merge them together
// gameRoom.listen("players/:id/data/position/:string", function(change) {
//     console.log("CHANGE POS");

//     if(change.path.id == client.id){
//         console.log("ITS MY OWN CHANGE");
//         return;
//     }else{
//         var personThatMoved = change.path.id;
//         var newValue = change.value;
//         console.log(change)
//         if(change.path.attribute == "x"){
//             playersDict[personThatMoved].components.position.attrValue.x = newValue;
//         }else if(change.path.attribute == "y"){
//             playersDict[personThatMoved].components.position.attrValue.y = newValue;
//         }else{
//             playersDict[personThatMoved].components.position.attrValue.z = newValue;
//         }
//     }
// });


gameRoom.listen("players/:id/health/:number", function(change) {
    console.log("CHANGE LISTENED");
    // console.log(change.path);
    // console.log(change.operation);
    // console.log(change.value);

    if (change.path.id != client.id) {
        return;
    } else if (change.value == 100) {
        // REVIVE YOUR PLAYER
    } else {
        // DO ANIMATION TO SHOW THAT YOU TOOK DAMAGE
    }
});

gameRoom.listen("players/:id/:attribute", function(change) {
    if (change.path.id == client.id)    return;
    // console.log(change.path);
    // console.log(change.operation);
    // console.log(change.value);
    var newValue = change.value;
    var id = change.path.id;
    if (change.path.attribute == "rotation") {
        console.log("CHANGE ROTATION");
        playersDict[id].setAttribute("rotation", newValue)
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
