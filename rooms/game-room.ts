import { Client } from 'colyseus/lib';
import { Room } from "colyseus";

enum Action {
  Create,
  Leave,
  Join
}

interface RoomData {
  name: string,
  players: Array<string>,
  maxPlayers: number
}

export class GameRoom extends Room {
  private roomNameExists(name: string) {
    let arr = this.state.rooms;
    return arr.filter(room => room.name == name) > 0;
  }

  onInit (options) {
      this.setState({
        rooms: [],
        messages: [],
        players: [],
      });
      console.log("GameRoom created!", options);
  }

  onJoin (client: Client) {
      this.state.messages.push(`${ client.id } joined.`);
      this.state.players.push(client.id);
  }

  onLeave (client: Client) {
      this.state.messages.push(`${ client.id } left.`);
      // this.state.players.push(client.id);
      let index: number = this.state.messages.indexOf(client.id);
      this.state.players.splice(index, 1);
  }

  onMessage (client: Client, data) {
      console.log("ChatRoom:", client.id, data);

      let action: Action = data.action;
      switch (action) {
        case Action.Create:
          console.log("make new room");
          let newRoom: RoomData = {
            name: "room1",
            maxPlayers: data.maxPlayers,
            players: [ client.id ]
          }
          
          // while(this.roomNameExists(newRoom.name)){
          //   newRoom.name = randomNameGenerator();
          // }

          this.state.rooms.push(newRoom);
          break;
        case Action.Join:
          console.log("Join existing room");
          break;
        default:
          console.log("Leaving current room")
          break;
      }
  }

  onDispose () {
      console.log("Dispose ChatRoom");
  }
}