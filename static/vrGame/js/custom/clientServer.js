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

        // STORE STATE
        // THIS WILL UPDATE playerNumber 
        // TO UPDATE YOUR POSITION LATER
        for (var p in data.state) {
            // check if the property/key is defined in the object itself, not in parent
            if (data.state.hasOwnProperty(p)) {
                console.log(p, data.state[p].id);
                //player = Players.createOtherPlayer(data.state[p]);
                player = Players.createOtherPlayer("39 0 -100", data.state[p].id);
                playersDict[data.state[p].id] = player
            }
        }
        //console.log(playersDict);
        //console.log(playersDict["BJ26x2ljW"]);
    } else if (data.type === "damage") {
        console.log("YOU GOT HIT");
    }

    // Players.createMyself("2.5 2.5 5");
});

gameRoom.listen("players/:id", function(change) {
    console.log("CHANGE OF PLAYER NUMBERS");
    console.log(change.path); // => { id: "f98h3f", attribute: "y" }
    console.log(change.operation); // => "replace" (can be "add", "remove" or "replace")
    console.log(change.value); // => 1

    if (change.path.id == client.id) {
        player = Players.createMyself("39 0 -100");  
        console.log("MYSELF CREATED");
    } else {
        player = Players.createOtherPlayer("39 0 -100");
        console.log("OTHER" + change.path.id + " " + "CREATED");
    }
    playersDict[change.path.id] = player
})


// THIS STUFF ONLY HAPPENS WHEN A PLAYER'S ANIMATION
gameRoom.listen("players/:id/data/:attribute", function(change) {
  //  console.log("CHANGE ANIMATION");
    // console.log(change.path);
    // console.log(change.operation);
    // console.log(change.value);
    //console.log(change)
    if(change.path.id == client.id){
        //console.log("ITS MY OWN CHANGE");
        return;
    }
    var newValue = change.value;
    if(newValue == "") return
    var id = change.path.id;
    if(change.path.attribute == "moveAnimation"){
        playersDict[id].setAttribute("animation-mixer","clip: "+newValue);

    }else{
        playersDict[id].setAttribute("position",newValue);


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

    if(change.path.id != client.id){
        return;
    }else if(change.value == 100){
        // REVIVE YOUR PLAYER
    }else{
        // DO ANIMATION TO SHOW THAT YOU TOOK DAMAGE
    }
});

gameRoom.listen("players/:id/:attribute", function(change) {
 
    // console.log(change.path);
    // console.log(change.operation);
    // console.log(change.value);
    var newValue = change.value;
    var id = change.path.id;
    if(change.path.attribute == "rotation"){
        console.log("CHANGE ROTATION");
        playersDict[id].setAttribute("rotation",newValue)
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

// function isEquivalent(a, b, id) {
//     // Create arrays of property names
//     var aProps = Object.getOwnPropertyNames(a);
//     var bProps = Object.getOwnPropertyNames(b);

//     // If number of properties is different,
//     // objects are not equivalent
//     if (aProps.length !== bProps.length) {
//         return false;
//     }

//     for (var i = 0; i < aProps.length; i++) {
//         var propName = aProps[i];

//         // If values of same property are not equal,
//         // objects are not equivalent
//         if (JSON.stringify(a[propName]) != JSON.stringify(b[propName])) {
//             console.log(JSON.stringify(a[propName]));
//             console.log(a[propName]);
//             var newPos = b[propName].position;
//             console.log(id)
//             console.log(newPos);

//             var player = playersDict[id];
//             var animation = b[propName].moveAnimation;
//             player.setAttribute("position", newPos);
//             console.log(player);
//             var preAnimation = player.getAttribute("animation-mixer").clip;
//             console.log(preAnimation);
//             if (preAnimation.includes(animation) == false) {
//                 console.log("animation= " + animation)
//                 Animation.setAnimation(player, animation);
//             }

//             console.log("updated", playersDict[id].getAttribute("position"));
//             return false;
//         }
//     }

    // If we made it this far, objects
    // are considered equivalent
//     return true;
// }