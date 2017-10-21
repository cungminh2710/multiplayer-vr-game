import { Client } from "colyseus/lib";
import { Room } from "colyseus";
import { GameArena } from "./game-arena";
import { gameServer } from "../index";
import { readUsernameBySession } from "../src/helper";
import { Promise } from "bluebird";

interface RoomData {
	name: string;
	players: Array<string>;
	readyPlayers: Array<string>;
	maxPlayers: number;
	isReady: boolean;
}

export class GameRoom extends Room {
	// CHANGE THIS SO ITS A USERNAME INSTEAD OF A SESSION ID
	// IF THE CLIENTID ISN'T TIED TO A USER RETURN UNDEFINED
	// private async getUsername(clientId: string){
	//   return await readUsernameBySession(clientId);
	// }

	private roomNameExists(name: string) {
		let arr = this.state.rooms;
		return arr.filter(room => room.name == name) > 0;
	}

	private markPlayerReady(name: string) {
		let roomIndex: number; // this will be the room that 'name' is in
		for (let i = 0; i < this.state.rooms.length; i++) {
			if (this.state.rooms[i].players.includes(name)) {
				this.state.rooms[i].readyPlayers.push(name);
				roomIndex = i;
				break;
			}
		}

		// check if all players are ready
		console.log(
			"CHECK IF ALL PLAYERS ARE READY +++++",
			this.state.rooms[roomIndex].players.length ==
				this.state.rooms[roomIndex].readyPlayers.length
		);
		if (
			this.state.rooms[roomIndex].players.length ==
				this.state.rooms[roomIndex].readyPlayers.length &&
			!this.state.rooms[roomIndex].isReady
		) {
			let playerArray = this.state.rooms[roomIndex].readyPlayers.slice();
			let numPlayers = this.state.rooms[roomIndex].maxPlayers;

			gameServer.register(this.state.rooms[roomIndex].name, GameArena, {
				players: playerArray,
				numPlayers
			});

			this.state.rooms[roomIndex].isReady = true;
		}
	}

	private leaveRoom(name: string) {
		for (let i: number = 0; i < this.state.rooms.length; i++) {
			let index: number = this.state.rooms[i].players.indexOf(name);
			let readyIndex: number = this.state.rooms[i].readyPlayers.indexOf(
				name
			);

			if (readyIndex > -1) {
				this.state.rooms[i].readyPlayers.splice(readyIndex, 1);
			}

			if (index > -1) {
				this.state.rooms[i].players.splice(index, 1);
				if (this.state.rooms[i].players.length == 0) {
					this.state.rooms.splice(i, 1);
				}
				break;
			}
		}
	}

	private joinRoom(room: string, player: string) {
		for (let i = 0; i < this.state.rooms.length; i++) {
			if (this.state.rooms[i].roomName == room) {
				this.state.rooms[i].players.push(player);
				break;
			}
		}
	}

	private removePlayer(id: string) {
		let i = this.state.players.indexOf(id);
		this.state.players.splice(i, 1);
	}

	onInit(options) {
		this.setState({
			rooms: [],
			players: []
		});
		console.log("GameRoom created!", options);
	}

	// Returns true/false based on if the clientId is associated with a user's
	// requestJoin (options: any) {
	//   let username: string|undefined = this.getUsername(options.client);
	//   console.log("REQUESTING JOIN");
	//   console.log(typeof username);
	//   return (typeof username === "string");
	// }

	onJoin(client: Client) {
		console.log("NEW CLIENT!", client);

		//get username from db
		// let username: string = this.getUsername(client.id);
		readUsernameBySession(client.id).then(value => {
			const username = value;
			if (username != null) {
				this.state.players.push(username);
				this.send(client, {
					success: true,
					username
				});
			} else {
				this.send(client, {
					error: "You are not logged in!"
				});
			}
		});
	}

	onLeave(client: Client) {
		readUsernameBySession(client.id).then(username => {
			let index: number = this.state.players.indexOf(username);
			this.state.players.splice(index, 1);
			this.leaveRoom(username);
		});
	}

	onMessage(client: Client, data) {
		let action: string = data.action;
		readUsernameBySession(client.id).then(value => {
			const username = value;
			switch (action) {
				case "CREATE":
					console.log("make new room");
					let newRoom: RoomData = {
						name: data.payload.roomName,
						maxPlayers: data.payload.maxPlayers,
						players: [username],
						readyPlayers: [],
						isReady: false
					};

					if (!this.roomNameExists(data.payload.roomName)) {
						this.state.rooms.push(newRoom);
					}
					break;
				case "JOIN":
					console.log("Join existing room");
					const roomName: string = data.payload.roomName;
					this.joinRoom(roomName, username);
					break;
				case "READY":
					this.markPlayerReady(username);
					break;
				default:
					console.log("Leaving current room");
					this.leaveRoom(username);
					break;
			}
		});
	}

	onDispose() {
		console.log("Dispose ChatRoom");
	}
}
