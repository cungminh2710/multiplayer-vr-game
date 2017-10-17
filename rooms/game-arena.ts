import { Client } from 'colyseus/lib';
import { Room } from "colyseus";
import { IUserStats } from '../models/user';
import * as helper from '../src/helper';

interface PlayerInfo {
  id?: string,
  character: number,
  team: string,
  health: number,
  data: {
    position: string,
    moveAnimation: string
  },
  rotation: string 
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
  private takenCharacters: any = {
    red: [],
    blue: []
  };

  onInit (options) {
    console.log("Arena created!", options);
    this.allowedPlayers = options.players;

    this.setState({
      turrets: {
        blue: 100000,
        red: 100000
      },
      players: {},
      stats: {},
      gameOver: false
    });
  }

  revivePlayer (playerId: string) {
    this.state.players[playerId].health = 100;
  }

  newPlayerInfo (playerId: string): PlayerInfo{
    let playerTeam: string;
    let playerCoords: string;
    let playerCharacter = Math.floor(Math.random() * 3) + 1;

    if(this.numJoined % 2 == 0){
      playerTeam = "red";
      playerCoords = `${this.numJoined*5} 3 -235`;
    }else{
      playerTeam = "blue";
      playerCoords = `${this.numJoined*5} 3 0`;
    }

    while(this.takenCharacters[playerTeam].indexOf(playerCharacter) != -1){
      playerCharacter = Math.floor(Math.random() * 3) + 1;
    }

    this.takenCharacters[playerTeam].push(playerCharacter);

    let newPlayer: PlayerInfo = {
      id: playerId,
      team: playerTeam,
      character: playerCharacter,
      health: 100,
      data: {
        position: playerCoords,
        moveAnimation: "idle",
      },
      rotation: "0 0 0",
      skillAnimation: "none"
    };

    console.log(newPlayer);
    return newPlayer;
  }

  requestJoin (options: any) {
    let clientId = options.id;
    return options.test || this.allowedPlayers.indexOf(clientId) > -1;
  }

  onJoin (client: Client) {
    if(!(Object.keys(this.state.players).length === 0)){
      this.send(client, {
        type: "initial",
        state: this.state.players
      });
    }

    this.numJoined += 1;
    this.state.players[client.id] = this.newPlayerInfo(client.id);
    this.state.stats[client.id] = {
      kills: 0,
      deaths: 0
    }
  }

  onLeave (client: Client) {
      //let index: number = this.state.messages.indexOf(client.id);
      //this.state.players.splice(index, 1);
      console.log("CLIENT GONE");
      console.log(client);
      delete this.state.players[client.id];
  }

  onMessage (client: Client, data) {
     // console.log("Game Arena:", client.id, data);
    if(data.action == "idle" || this.state.gameOver || !this.state.players.hasOwnProperty(client.id)){
      return;
    }

    if(data.action == "MOVE"){
      console.log(data)
      this.state.players[client.id].data = data.data;
    } else if(data.action == "ROTATION"){
      this.state.players[client.id].rotation = data.data;
      console.log(data)
    }
    
    else if(data.action == "DAMAGE"){
      let target = data.target;
      let clientCoords = target.position;
      if(target.id = "TURRET"){
        let targetTurretId = this.state.players[client.id].team == "red" ? "blue" : "red";
        let newTurretHealth = this.state.turrets[targetTurretId] - data.damage;
        this.state.turrets[targetTurretId] = newTurretHealth;
        //check if game finished
        if(newTurretHealth <= 0){
          //GAME OVER
          this.state.gameOver = true;

          //update player stats in database
        }
        return;
      }else{
        let targetPlayer = this.state.players[target.id];
        if(this.euclideanDistance(clientCoords, targetPlayer.data.position)){
          targetPlayer.health -= data.damage;
          let newHealth = targetPlayer.health;
          if(newHealth <= 0){
            // Add one kill to client's stats
            this.state.stats[client.id].kills += 1;
            // Add one death to target's stats
            this.state.stats[target.id].deaths += 1;
            setTimeout(function() {
              console.log('bring back to life', target.id);
              this.revivePlayer(target.id);
            }, 1500)
          }
        }
      }
    }

    // this.messageClient(client);
  }

  euclideanDistance(s1: string, s2: string){
    let a = s1.split(" ");
    let b = s2.split(" ");
    let sums = 0;
    for (var i = 0; i < 3; i++) {
      let aAsNum = parseFloat(a[i]);
      let bAsNum = parseFloat(b[i]);
      sums += Math.pow(aAsNum - bAsNum, 2);
    }
    return Math.sqrt(sums); 
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