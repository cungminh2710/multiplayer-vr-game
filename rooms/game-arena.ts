import { Client } from "colyseus/lib";
import { Room } from "colyseus";
import { IUserStats } from "../models/user";
import { updateUserAchievementsFromStats } from "../src/helper";
import { skills } from "../src/skill-config";
import { Promise } from "bluebird";

interface PlayerInfo {
	id?: string;
	character: number;
	team: string;
	health: number;
	data: {
		position: string;
		moveAnimation: string;
	};
	rotation: string;
	skill: string;
	skillAnimation: string;
}

interface Coords {
	x: number;
	y: number;
	z: number;
}

const EIGHT_MINUTES = 480000;

export class GameArena extends Room {
	private numJoined: number = 0;
	private maxPlayers: number;
	private allowedPlayers: Array<string>;
	private playerClientMap: any = {};
	private statsAdded: Array<string>;
	private takenCharacters: any = {
		red: [],
		blue: []
	};

	onInit(options) {
		console.log("Arena created!", options);
		this.allowedPlayers = options.players;
		this.maxPlayers = this.allowedPlayers.length;

		this.setState({
			players: {
				"TURRET_RED": {
					id: "TURRET_RED",
					character: "turret",
					team: "red",
					health: 100000,
					data: {
						position: "",
						moveAnimation: "",
					},
					rotation: "",
					skill: "",
					skillAnimation: "",
				},
				"TURRET_BLUE": {
					id: "TURRET_BLUE",
					character: "turret",
					team: "blue",
					health: 100000,
					data: {
						position: "",
						moveAnimation: "",
					},
					rotation: "",
					skill: "",
					skillAnimation: "",
				},
			},
			stats: {},
			gameOver: false,
			playersReady: false
		});
		this.allowedPlayers.forEach(p => {
			this.playerClientMap[p] = "";
		});
	}

	// resetSkillAnimation(playerId: string) {
	//   this.state.players[playerId].weapon = "none";
	// }

	newPlayerInfo(playerId: string): PlayerInfo {
		let pTeam: string;
		let pCoords: string;
		let pCharacter = Math.floor(Math.random() * 3) + 1;
		let pHealth = pCharacter == 1 ? 2500 : pCharacter == 2 ? 1500 : 1700;


		if (this.numJoined % 2 == 0) {
			pTeam = "red";
			pCoords = `${this.numJoined * 5} 3 -235`;
		} else {
			pTeam = "blue";
			pCoords = `${this.numJoined * 5} 3 -5`;
		}

		while (
			this.takenCharacters[pTeam].indexOf(pCharacter) != -1
		) {
			pCharacter = Math.floor(Math.random() * 3) + 1;
		}

		this.takenCharacters[pTeam].push(pCharacter);

		let newPlayer: PlayerInfo = {
			id: playerId,
			team: pTeam,
			character: pCharacter,
			health: pHealth,
			data: {
				position: pCoords,
				moveAnimation: "idle"
			},
			rotation: "0 0 0",
			skill: "",
			skillAnimation: "none"
		};

		console.log(newPlayer);
		return newPlayer;
	}

	revivePlayer(playerId: string) {
		let pCharacter = this.state.players[playerId].character;
		let pHealth = pCharacter == 1 ? 2500 : pCharacter == 2 ? 1500 : 1700;
		this.state.players[playerId].health = pHealth;
		if(this.state.players[playerId].team == "red"){
			this.state.players[playerId].data.position = "5 3 -235";
		}else{
			this.state.players[playerId].data.position = "5 3 0";
		}
	}

	requestJoin(options: any) {
		let clientId = options.clientId;
		let userId = options.username;

		if (options.test || this.allowedPlayers.indexOf(userId) > -1) {
			this.playerClientMap[userId] = clientId;
			return true;
		}
		return false;
	}

	onJoin(client: Client) {
		if (!(Object.keys(this.state.players).length === 0)) {
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
		};

		//Once all players have joined, set the game timer
		if (this.numJoined == this.maxPlayers) {
			this.state.playersReady = true;
			var self = this;
			setTimeout(function() {
				console.log("ENDING GAME");
				self.endGame("draw");
			}, EIGHT_MINUTES);
		}
	}

	onLeave(client: Client) {
		//let index: number = this.state.messages.indexOf(client.id);
		//this.state.players.splice(index, 1);
		console.log("CLIENT GONE");
		console.log(client.id);
		delete this.state.players[client.id];
		this.numJoined -= 1;
	}

	endGame(winner: string) {
		this.state.gameOver = true;

		//update player stats in database
		this.autoDispose = false;

		let loadAchievements = [];
		for (var player in this.playerClientMap) {
			if (this.playerClientMap.hasOwnProperty(player)) {
				var clientId = this.playerClientMap[player];
				loadAchievements.push(
					updateUserAchievementsFromStats(
						player,
						this.state.stats[clientId].kills,
						this.state.stats[clientId].deaths,
						winner == "draw"
							? "draw"
							: this.state.players[clientId].team == winner
					)
				);
			}
		}

		Promise.all(loadAchievements).then(function() {
			console.log("ALL ACHIEVEMENTS ADDED, SAFE TO DESTROY ARENA");
			this.autoDispose = true;
		});
	}

	onMessage(client: Client, data) {
		// console.log("Game Arena:", client.id, data);
		if (
			data.action == "idle" ||
			this.state.gameOver ||
			!this.state.players.hasOwnProperty(client.id)
		) {
			return;
		}

		if (data.action == "MOVE") {
			this.state.players[client.id].data = data.data;
		} else if (data.action == "ROTATION") {
			this.state.players[client.id].rotation = data.data;
		} else if (data.action == "SKILLANIMATION") {
			console.log("SKILLANIMATION: ", data);
			this.state.players[client.id].skillAnimation = data.data;
		} else if (data.action == "DAMAGE") {
			console.log(data.data);

			//let clientCoords = target.position;
			for (var i = 0; i < data.data.target.length; i++) {
				let targetId = data.data.target[i];
				console.log("TARGET: ", targetId);
				if (targetId == "TURRET_RED" || targetId == "TURRET_BLUE") {
					let newTurretHealth = this.state.players[targetId] - skills[data.data.name].damage;
					this.state.players[targetId] = newTurretHealth;
					//check if game finished
					if (newTurretHealth <= 0) {
						//GAME OVER
						this.endGame(targetId == "TURRET_RED" ? "blue" : "red");
					}

					return;
				} else {
					let targetPlayer = this.state.players[targetId];
					console.log("TARGETPLAYER: ", targetPlayer);
					console.log("DATA PACKET: ", data.data);
					// if(this.euclideanDistance(clientCoords, targetPlayer.data.position)){

					//TODO no damage in package now
					console.log("THIS IS DA SKILL", data.data.name);
					console.log("THIS IS HOW MUCH DMG", skills[data.data.name].damage);
					targetPlayer.health -= skills[data.data.name].damage;
					if (targetPlayer.health <= 0) {
						// Add one kill to client's stats
						this.state.stats[client.id].kills += 1;
						// Add one death to target's stats
						this.state.stats[targetId].deaths += 1;

						targetPlayer.skillAnimation = JSON.stringify({
							name:"idle",
							skillName:"Dealth",
							position: targetPlayer.team == "red" ? "3 3 -235" : "3 3 -5",
						});

						//Bring back to life
						let pCharacter = this.state.players[targetId].character;
						let pHealth = pCharacter == 1 ? 2500 : pCharacter == 2 ? 1500 : 1700;
						this.state.players[targetId].health = pHealth;
						if(this.state.players[targetId].team == "red"){
							this.state.players[targetId].data.position = "5 3 -235";
						}else{
							this.state.players[targetId].data.position = "5 3 0";
						}
					} 
					// else {
					// 	console.log("SENDBACK: ");
					// 	targetPlayer.skill = data.data.name;
					// }
				}
			}
		}

		// this.messageClient(client);
	}

	euclideanDistance(s1: string, s2: string) {
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

	messageClient(client: Client) {
		this.send(client, {
			message: "SOMETHING"
		});
	}

	onDispose() {
		console.log("Dispose Arena");
	}
}
