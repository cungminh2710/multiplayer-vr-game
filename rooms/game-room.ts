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
  readyPlayers: Array<string>,
  maxPlayers: number
}

export class GameRoom extends Room {
  private roomNameExists(name: string) {
    let arr = this.state.rooms;
    return arr.filter(room => room.name == name) > 0;
  }

  private markPlayerReady(name: string) {
    for(let i = 0; i < this.state.rooms.length; i++){
      if(this.state.rooms[i].players.includes(name)){
        this.state.rooms[i].readyPlayers.push(name);
        break;
      }
    }
  }

  private leaveRoom(name: string) {
    for(let i: number = 0; i < this.state.rooms.length; i++){
      let index: number = this.state.rooms[i].players.indexOf(name);
      let readyIndex: number = this.state.rooms[i].readyPlayers.indexOf(name);

      if(readyIndex > -1){
        this.state.rooms[i].readyPlayers.splice(readyIndex, 1);
      }

      if(index > -1){
        this.state.rooms[i].players.splice(index, 1);
        if(this.state.rooms[i].players.length == 0){
          this.state.rooms.splice(i, 1);
        }
        break;
      }
    }
  }

  private joinRoom(room: string, player: string) {
    for(let i = 0; i < this.state.rooms.length; i++){
      if(this.state.rooms[i].roomName == room){
        this.state.rooms[i].players.push(player);
        break;
      }
    }
  }

  onInit (options) {
      this.setState({
        rooms: [],
        players: [],
      });
      console.log("GameRoom created!", options);
  }

  onJoin (client: Client) {
    console.log("NEW CLIENT!", client);
    this.state.players.push(client.id);
  }

  onLeave (client: Client) {
      // this.state.players.push(client.id);
      let index: number = this.state.players.indexOf(client.id);
      this.state.players.splice(index, 1);
  }

  onMessage (client: Client, data) {
      console.log("ChatRoom:", client.id, data);

      let action: string = data.action;
      switch (action) {
        case "CREATE":
          console.log("make new room");
          let newRoom: RoomData = {
            name: data.payload.roomName,
            maxPlayers: data.payload.maxPlayers,
            players: [ client.id ],
            readyPlayers: []
          }
          
          if(!this.roomNameExists(data.payload.roomName)){
            this.state.rooms.push(newRoom);
          }
          break;
        case "JOIN":
          console.log("Join existing room");
          const roomName: string = data.payload.roomName;
          this.joinRoom(roomName, client.id);
          break;
        case "READY":
          console.log("PLAYER READY");
          this.markPlayerReady(client.id);
          break;
        default:
          console.log("Leaving current room");
          this.leaveRoom(client.id);
          break;
      }
  }

  onDispose () {
      console.log("Dispose ChatRoom");
  }
}