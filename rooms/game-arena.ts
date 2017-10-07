import { Client } from 'colyseus/lib';
import { Room } from "colyseus";

interface PlayerInfo {
  id?: string,
  character: string,
  team: string,
  health:number,
  data: {
    position: Coords,
    moveAnimation:string
  }
  skillAnimation:string
}

interface Coords {
  x: number,
  y: number,
  z: number
}

export class GameArena extends Room {
  private numJoined: number = 0;
  private maxPlayers: number;
  
  onInit (options) {
    let players: Array<PlayerInfo> = [];
    for (var i: number = 0; i < options.players.length; i++) {
      var playerId: string = options.players[i];
      let newPlayer: PlayerInfo = {
        id: playerId,
        team: i % 2 == 0 ? "red":"blue",
        character: "tank",
        health: 100,
        data: {
          position: {
            x: 1.5,
            y: 1.5 + i,
            z: 4
          },
          moveAnimation: "idle"
        },
        skillAnimation: "skill1"
      }

      players.push(newPlayer);
    }

    this.setState({
      players,
    });
    console.log("Arena created!", options);
  }

  requestJoin (options: any) {
    let clientId = options.id;
    let ret = false;
    this.state.players.forEach(player => {
      if(player.id == clientId){
        ret = true;
      }
    });
    return ret;
  }

  onJoin (client: Client) {
    console.log("NEW CLIENT JOINED");

    console.log("SENDING INITIAL DATA")
    this.send(client, {
      type: "initial",
      state: this.state
    });
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

    console.log(data);
    if(data.action== "MOVE"){
      for (var index = 0; index < this.state.players.length; index++) {
        var element = this.state.players[index];
        if(element.id == client.id){
          console.log(data.data)
          this.state.players[index].data = data.data;
        }
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
    return Math.sqrt(sums.reduce(function(accumulator, currentValue) { 
        return accumulator + currentValue; 
    })); 
  } 

  messageClient (client: Client) {
    let container = [];
    this.state.players.forEach(player => {
      if(player.id != client.id){
        container.push(player);
      }
    });

    this.send(client, {
      players: container
    });
  }

  onDispose () {
      console.log("Dispose Arena");
  }
}