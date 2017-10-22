import { Room } from "colyseus";

export class ChatRoom extends Room {
	onInit(options) {
		this.setState({ messages: [] });
	}

	onJoin(client) {
		this.state.messages.push(`${client.id} joined.`);
	}

	onLeave(client) {
		this.state.messages.push(`${client.id} left.`);
	}

	onMessage(client, data) {
		this.state.messages.push(data.message);
	}

	onDispose() {
	}
}
