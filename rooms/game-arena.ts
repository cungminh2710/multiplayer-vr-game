import { Client } from 'colyseus/lib';
import { Room } from "colyseus";

interface PlayerInfo {
  id?: string,
  character: string,
  health: number,
  team: string,
  position: {
    x: number,
    y: number,
    z: number
  }
}
export class GameArena extends Room {
  private numJoined: number = 0;
  onInit (options) {
    let newPlayer1: PlayerInfo = {
      team: "blue",
      character: "tank1",
      health: 100,
      position: {
        x: 10,
        y: 10,
        z: 1
      }
    };

    let newPlayer2: PlayerInfo = {
      team: "red",
      character: "tank2",
      health: 100,
      position: {
        x: 15,
        y: 15,
        z: 1
      }
    };
    this.setState({
      players: <Array<PlayerInfo>> [newPlayer1, newPlayer2],
    });
    console.log("Arena created!", options);
  }

  onJoin (client: Client) {
    console.log("NEW CLIENT JOINED");
    console.log(client);
    if(this.numJoined == 0){
      this.state.players[0].id = client.id;
      this.numJoined++;
    }else if(this.numJoined == 1){
      this.state.players[1].id = client.id;
    }
  }

  onLeave (client: Client) {
      //let index: number = this.state.messages.indexOf(client.id);
      //this.state.players.splice(index, 1);
      console.log("CLIENT GONE");
      console.log(client);
  }

  onMessage (client: Client, data) {
      console.log("Game Arena:", client.id, data);

      if(data.action == "MOVE"){
        for (var index = 0; index < this.state.players.length; index++) {
          var element = this.state.players[index];
          if(element.id == client.id){
            this.state.players[index].position = data.data;
          }
        }
      }
  }

  onDispose () {
      console.log("Dispose Arena");
  }
}