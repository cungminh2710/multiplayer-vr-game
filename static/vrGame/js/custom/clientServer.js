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
        tempBuffer = data.state;
    }


});
//create players
gameRoom.listen("players/:id", function(change) {
    if(change.path.id == "TURRET_RED" || change.path.id == "TURRET_BLUE"){
        return;
    }
    if (change.path.id == client.id) {
        team = change.value.team;
        for (var p in tempBuffer) {
            if (tempBuffer.hasOwnProperty(p)) {
                if (tempBuffer[p].team == team) tempBuffer[p].team = "ally";
                else tempBuffer[p].team = "enemy";
    
                if (tempBuffer[p].character == "turret") {
                
                    // player = MAKE TURRET HERE
                    player = Players.createTurret(tempBuffer[p],change.value.data.position);
                } else {
                    //MAKE NORMAL PLAYER HERE
                    player = Players.createOtherPlayer(tempBuffer[p]);
                   // playersDict[data.state[p].id] = player
        
                }
                playersDict[tempBuffer[p].id] = player;
            }
           
            
        }
        tempBuffer = {};
        player = Players.createMyself(change.value);
      
    } else {
        if (change.value.team == team) change.value.team = "ally";
        else change.value.team = "enemy";
        player = Players.createOtherPlayer(change.value);


    }
    playersDict[change.path.id] = player
})

gameRoom.listen("gameOver", function(change) {
    if (change.value != "") {

        SkillEffectAni.gameOver(change.value);
    }
    

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
    
        playersDict[id].setAttribute("rotation", newValue)
    } else if (change.path.attribute == "skillAnimation") {
        
        SkillEffectAni.handleEffects(id, newValue);

    } else if (change.path.attribute == "skill") {
        if (id == client.id) return;

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
        if(newValue<totalHealth) {
        var r = initRadius * newValue / totalHealth;
        healthBar.setAttribute("radius", r);
        }
    }
});

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