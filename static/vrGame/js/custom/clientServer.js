var count = 0;

var host = window.document.location.host.replace(/:.*/, '');
var isProduction = host.indexOf('minhcung') !== -1;
var url = !isProduction ? 'ws://' + host + (location.port ? ':' + location.port : '') : 'wss://minhcung.me/lovr';
var client = new Colyseus.Client(url);
var roomName = findGetParameter("roomName");
var user = findGetParameter("user");
var gameRoom = client.join(roomName != null ? roomName : "test-arena", { clientId: client.id, username: user, test: roomName == null });
var playersDict = {};
var raycasterEl;
var cameraEl;
var playerWrapperEl;
var panel;
var disableMove = false;
var team = "";
var character = Infinity;
// PLAYER AND GAME INFO
var myPlayerName = client.id; // player id is currently same as their browser's id
var globalState = [] // it is a good idea to store state changes from server on client
var skillInfo = {}
var tempBuffer = {}

// THIS IS THE FIRST STAETE THIS CLIENT WILL SEE WHEN THEY JOIN THE GAME
gameRoom.onData.add(function(data) {
    if (data.type == "initial") {

        // STORE STATE
        // THIS WILL UPDATE playerNumber 
        // TO UPDATE YOUR POSITION LATER
        // for (var p in data.state) {
        //     console.log("````````````````````````````````````");
        //     // check if the property/key is defined in the object itself, not in parent
        //     if (data.state.hasOwnProperty(p)) {
        //        // console.log(data.state[p]);
        //        // console.log(team)
        //        // if (data.state[p].team == team) data.state[p].team = "ally";
        //         //else data.state[p].team = "enemy";

        //         if (data.state[p].character == "turret") {
        //             //console.log(data.state[p]);
        //             console.log("THIS IS A TURRET");
        //             // player = MAKE TURRET HERE
        //         } else {
        //             //MAKE NORMAL PLAYER HERE
        //            // player = Players.createOtherPlayer(data.state[p]);
        //            // playersDict[data.state[p].id] = player
        //             ///console.log("ondata: ", player);
        //         }
        //         //tempBuffer[data.state[p].id] = data.state[p];
        //     }
        // }
        tempBuffer = data.state;
    }
    // } else if (data.type === "damage") {
    //     console.log("YOU GOT HIT");
    // }

});
//create players
gameRoom.listen("players/:id", function(change) {
    console.log("CHANGE OF PLAYER NUMBERS");
    if (change.path.id == client.id) {
        team = change.value.team;
        console.log("MESELF", team);
        for (var p in tempBuffer) {
            if (tempBuffer.hasOwnProperty(p)) {
                if (tempBuffer[p].team == team) tempBuffer[p].team = "ally";
                else tempBuffer[p].team = "enemy";
                console.log(team)
                if (tempBuffer[p].character == "turret") {
                    console.log("THIS IS A TURRET");
                    // player = MAKE TURRET HERE
                    player = Players.createTurret(tempBuffer[p],change.value.data.position);
                } else {
                    //MAKE NORMAL PLAYER HERE
                    player = Players.createOtherPlayer(tempBuffer[p]);
                   // playersDict[data.state[p].id] = player
                    console.log("ondata: ", player);
                }
                playersDict[tempBuffer[p].id] = player;
            }
           
            
        }
        tempBuffer = {};
        player = Players.createMyself(change.value);
        console.log("MYSELF CREATED");
    } else {
        if (change.value.team == team) change.value.team = "ally";
        else change.value.team = "enemy";
        player = Players.createOtherPlayer(change.value);
        console.log("listen: others ", player);

    }
    playersDict[change.path.id] = player
})

gameRoom.listen("gameOver", function(change) {
    if (change.value != "") {
        console.log("GAME OVER!!!");
        console.log(value);
    }
});

gameRoom.listen("turrets/:attribute", function(change) {
    console.log("DAMAGE TO TURRET");
});

//MOVEANIMATION AND POSITION UPDATE
gameRoom.listen("players/:id/data/:attribute", function(change) {
    if (change.path.id == client.id) {
        return;
    }
    var newValue = change.value;
    if (newValue == "") return
    var id = change.path.id;
    if (change.path.attribute == "moveAnimation") {
        if (newValue != "flash") {
            playersDict[id].setAttribute("animation-mixer", "clip: " + newValue);
        }
    } else {
        playersDict[id].setAttribute("position", newValue);


    }
});




gameRoom.listen("players/:id/:attribute", function(change) {

    var newValue = change.value;
    var id = change.path.id;

    if (change.path.attribute == "rotation") {
        if (id == client.id) return;
        console.log("CHANGE ROTATION");
        playersDict[id].setAttribute("rotation", newValue)
    } else if (change.path.attribute == "skillAnimation") {
        
        SkillEffectAni.handleEffects(id, newValue);

    } else if (change.path.attribute == "skill") {
        if (id == client.id) return;
        console.log(newValue);
    } else if (change.path.attribute == "health") {
        playersDict[id].setAttribute("health", newValue);

        if (id == client.id) {
            panel.querySelector("#health").setAttribute("value", "Health: " + newValue);
            panel.emit("damage");
            return;
        }
        var totalHealth = playersDict[id].getAttribute("initalHealth");

        var healthBar = playersDict[id].querySelector("#healthBar");
        var initRadius = healthBar.getAttribute("initRadius");
        var r = initRadius * newValue / totalHealth;
        healthBar.setAttribute("radius", r);
        console.log(playersDict[id]);
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