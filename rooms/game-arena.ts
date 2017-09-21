import { Client } from 'colyseus/lib';
import { Room } from "colyseus";

enum Action {
  Move,
  Shoot
}

interface PlayerInfo {
  id: string,
  character: string,
  health: number,
  team: string,
  position: {
    x: number,
    y: number
  }
}

export class GameArena extends Room {
  private roomNameExists(name: string) {
    let arr = this.state.rooms;
    return arr.filter(room => room.name == name) > 0;
  }

  onInit (options) {
      this.setState({
        players: <Array<PlayerInfo>> [],
      });
      console.log("GameRoom created!", options);
  }

  onJoin (client: Client) {
    let newPlayer: PlayerInfo = {
      id: client.id,
      team: "blue",
      character: "tank1",
      health: 100,
      position: {
        x: 10,
        y: 10
      }
    };
    this.state.players.push(newPlayer);
  }

  onLeave (client: Client) {
      this.state.messages.push(`${ client.id } left.`);
      
      let index: number = this.state.messages.indexOf(client.id);
      this.state.players.splice(index, 1);
  }

  onMessage (client: Client, data) {
      console.log("ChatRoom:", client.id, data);

      let action: Action = data.action;
      switch (action) {
        case Action.Move:
        console.log("moving");
        break;
        default:
          console.log("Leaving current room");
          break;
      }
  }

  onDispose () {
      console.log("Dispose ChatRoom");
  }
}