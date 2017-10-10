import { Client } from 'colyseus/lib';
import { Room } from "colyseus";

interface PlayerInfo {
  id?: string,
  character: string,
  team: string,
  health: number,
  data: {
    position: Coords,
    moveAnimation: string
  }
  skillAnimation: string
}

interface Coords {
  x: number,
  y: number,
  z: number
}

export class GameArena extends Room {
  private numJoined: number = 0;
  private maxPlayers: number;
  private allowedPlayers: Array<String>;

  onInit (options) {
    console.log("Arena created!", options);
    this.allowedPlayers = options.players;

    this.setState({
      players: {}
    });
  }

  newPlayerInfo (playerId: string): PlayerInfo{
    let newPlayer: PlayerInfo = {
      id: playerId,
      team: this.numJoined % 2 == 0 ? "red":"blue",
      character: "tank",
      health: 100,
      data: {
        position: {
          x: 1.5,
          y: 1.5 + this.numJoined,
          z: 4
        },
        moveAnimation: "idle"
      },
      skillAnimation: "skill1"
    };
    return newPlayer;
  }

  requestJoin (options: any) {
    let clientId = options.id;
    return options.test || this.allowedPlayers.indexOf(clientId) > -1;
  }

  onJoin (client: Client) {
    console.log("NEW CLIENT JOINED");
    this.state.players[client.id] = this.newPlayerInfo(client.id);
  }

  onLeave (client: Client) {
      //let index: number = this.state.messages.indexOf(client.id);
      //this.state.players.splice(index, 1);
      console.log("CLIENT GONE");
      console.log(client);
  }

  onMessage (client: Client, data) {
     // console.log("Game Arena:", client.id, data);
    if(data.action == "idle"){
      return;
    }

    if(data.action == "MOVE"){
      this.state.players[client.id].data = data.data;
    } else if(data.action == "DAMAGE"){
      let target = data.target;
      let clientCoords = target.position;
      let targetPlayer = this.state.players[target.id];
      if(this.euclideanDistance(clientCoords, targetPlayer.data.position)){
        targetPlayer.health -= data.damage;
        let newHealth = targetPlayer.health;
        if(newHealth <= 0){
          // Add one kill to client's stats

          // Add one death to target's stats
        }
      }
    } else if(data.action == "REVIVE"){
      let player = this.state.players[client.id];
      if(player.health <= 0){
        player.health = 100;
      }
    }

    // this.messageClient(client);
  }

  euclideanDistance(a: Coords, b: Coords){ 
    let sums = [ 
      Math.pow(a.x - b.x, 2), 
      Math.pow(a.y - b.y, 2), 
      Math.pow(a.z - b.z, 2) 
    ]; 
    return Math.sqrt(sums.reduce((accumulator, currentValue) => accumulator + currentValue)); 
  } 

  messageClient (client: Client) {
    this.send(client, {
      message: "SOMETHING"
    });
  }

  onDispose () {
      console.log("Dispose Arena");
  }
}