import * as path from "path";
import * as express from "express";
import * as serveIndex from "serve-index";
import * as mongoose from "mongoose";
import { Promise } from "bluebird";

import { createServer } from "http";
import { Server } from "colyseus";

// Require ChatRoom handler
import { ChatRoom } from "./rooms/01-basic";
import { GameRoom } from "./rooms/game-room";
import { GameArena } from "./rooms/game-arena";

const port = Number(process.env.PORT || 2657);
const app = express();
/**
 * Connect to MongoDB.
 */
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/");

mongoose.connection.on("error", () => {
	console.log(
		"MongoDB connection error. Please make sure MongoDB is running."
	);
	process.exit();
});

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register ChatRoom as "chat"
gameServer.register("game-room", GameRoom);
gameServer.register("test-arena", GameArena, { TEST: true });

app.use(express.static(path.join(__dirname, "static")));
app.use("/", serveIndex(path.join(__dirname, "static"), { icons: true }));

gameServer.listen(port);
console.log(`Listening on http://localhost:${port}`);
export { gameServer };
