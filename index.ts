import * as path from "path";
import * as express from "express";
import * as serveIndex from "serve-index";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { Promise } from "bluebird";

import { createServer } from "http";
import { createServer as createServerSecure } from "https";
import { Server } from "colyseus";

// Require ChatRoom handler
import { ChatRoom } from "./rooms/01-basic";
import { GameRoom } from "./rooms/game-room";
import { GameArena } from "./rooms/game-arena";

import {
	createNewUser,
	isUserExist,
	updateUserSession,
	readUserInfoBySession
} from "./src/helper";

const port = Number(process.env.PORT || 2657);
const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
);

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
const httpServer =
	process.env.NODE_ENV === "production"
		? createServerSecure(app)
		: createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register ChatRoom as "chat"
gameServer.register("game-room", GameRoom);
gameServer.register("test-arena", GameArena, { TEST: true });

app.post("/api/register", (req, res) => {
	console.log("/api/register");
	let { username, password, confirm_password, email } = req.body;
	if (password !== confirm_password)
		return res.status(403).json({
			status: "error",
			message: "Password and Confirmed password are not matched"
		});
	else
		createNewUser({
			username,
			password,
			email,
			achievements: [
				{
					logoUrl: "smile-o",
					name: "You made an account!",
					description:
						"We have given you an account, but we do not grant you the rank of master"
				}
			]
		})
			.then(_ =>
				res.status(200).json({ status: "success", message: "Success" })
			)
			.catch(err =>
				res.status(500).json({ status: "error", message: err.message })
			);
});

app.post("/api/login", (req, res) => {
	console.log("/api/login");
	let { username, password, sessionId } = req.body;
	isUserExist(username, password).then(user => {
		if (user) {
			updateUserSession(user.username, sessionId);
			res.status(200).json({
				status: "success",
				message: {
					username: user.username,
					email: user.email,
					stats: user.stats,
					achievements: user.achievements
				},
				redirect: `/profile.html`
			});
		} else {
			res.status(400).json({
				status: "error",
				message: "Username is not found or password is not matched"
			});
		}
	});
});

app.get("/api/logout", (req, res) => {
	delete req.sessionID;
	res.redirect("/index.html");
});

app.get("/api/getuser/:session", (req, res) => {
	let sessionId = req.params.session;
	console.log(req.path);
	readUserInfoBySession(sessionId).then(user => {
		if (user) {
			res.status(200).json({
				status: "success",
				message: {
					username: user.username,
					email: user.email,
					stats: user.stats,
					achievements: user.achievements
				}
			});
		} else {
			res.status(400).json({
				status: "error",
				message: "Username is not found or password is not matched"
			});
		}
	});
});
app.use(function(req, res, next) {
	console.log(req.path);
	next();
});
app.use(express.static(path.join(__dirname, "static")));
app.use("/", serveIndex(path.join(__dirname, "static"), { icons: true }));

gameServer.listen(port);
console.log(`Listening on http://localhost:${port}`);
export { gameServer };
