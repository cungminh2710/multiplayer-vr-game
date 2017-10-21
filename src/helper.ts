import { User, IUserModel, IUserStats, Achievement } from "../models/user";
import { Promise } from "bluebird";

/**
 * Register a new user
 * @param userData User Initial Data including username and password 
 */
export let createNewUser: {
	(
		userData: {
			username: string;
			password: string;
			email: string;
			achievements: Array<Achievement>;
		}
	): Promise<IUserModel>;
} = userData => new User(userData).save();

/**
 * Check if an user id is valid and existed
 * @param username Username
 * @param password Password
 */
export let isUserExist: {
	(username: string, password: string): Promise<IUserModel>;
} = (username, password) =>
	User.findOne({ username })
		.exec()
		.then(user => {
			if (user)
				return user.comparePassword(password)
					? Promise.resolve(user)
					: Promise.resolve(null);
			else return Promise.resolve(null);
		})
		.catch(err => {
			console.log("+++++ SOMETHING BAD +++++++");
			console.log(err);
		});

/**
 * Update session ID of an user given his/her User ID
 * @param id User ID
 * @param sessionID Session ID
 */

export let updateUserSession: {
	(id: string, sessionID: string): Promise<void>;
} = (_id, sessionID) => User.update({ _id }, { sessionID }).exec();

/**
 * Read user data based on User ID
 * @param id User ID
 */
export let readUser: { (id: string): Promise<IUserModel> } = _id =>
	User.findOne({ _id }).exec();

/**
 * Read user stats based on User ID
 * @param id User ID
 */
export let readUserStats: { (id: string): Promise<IUserStats> } = _id =>
	readUser(_id).then(user => Promise.resolve(user.stats));

/**
 * Read all User Achievements
 * @param _id User ID
 */

export let readUserAchievements: {
	(id: string): Promise<Achievement[]>;
} = _id => readUser(_id).then(user => user.achievements);

/**
 * Add an achievement to a User's list of achievements
 * @param id User ID
 * @param newAchievement New Achievement
 */
export let updateUserAchievements: {
	(id: string, newAchievement: Achievement): Promise<void>;
} = (_id, newAchievement) =>
	User.update({ _id }, { $push: { achievements: newAchievement } }).exec();

export let updateUserAchievementsFromStats: {
	(username: string, kills: number, death: number, won: boolean): Promise<
		IUserModel
	>;
} = (username, kills, death, won) =>
	User.find({ username }).then(async user => {
		let {
			_id,
			stats: { numGamesPlayed, numWon, numDrew, numKills, numDeath }
		} = user;

		// Calculate new Stats
		let newStats = {
			numGamesPlayed: numGamesPlayed + 1,
			numWon: won ? numWon + 1 : numWon,
			numDrew: won ? numDrew : numDrew + 1,
			numKills: numKills + kills,
			numDeath: numDeath + death
		};
		// Amazing Achievements
		let achievement;
		if (kills > death + 20 && death < 10)
			achievement = {
				logoUrl: won ? "smile-o" : "frown-o",
				name: won ? "FPS Artist" : "Bad luck Brian",
				description: "You are amazing player. GG WP !"
			};
		else if (kills > death + 10 && death < 10)
			achievement = {
				logoUrl: won ? "smile-o" : "frown-o",
				name: won
					? "You completely smashed the opponent(s)"
					: "You are great ... but not enough",
				description: "You have amazing skills !"
			};
		else if (kills < death + 10 && won)
			achievement = {
				logoUrl: "meh-o",
				name: "You got carried by your team",
				description: "Your team is better than you ... Poor them"
			};
		else if (kills < 1 && death > 15)
			achievement = {
				logoUrl: "meh-o",
				name: "Born to die",
				description: "You can't help your teammates"
			};
		else if (kills < 1 && death > 10)
			achievement = {
				logoUrl: "meh-o",
				name: "Party crasher",
				description: "You can't help your teammates"
			};

		if (achievement)
			await Promise.all([
				updateUserStats(_id, newStats),
				updateUserAchievements(_id, achievement)
			]);
		else await updateUserStats(_id, newStats);

		return User.findOne({ username })
			.select("stats achievements email username")
			.exec();
	});
/**
 * Update User Stats
 * @param id User ID 
 * @param newStats Updated User Stats
 */
export let updateUserStats: {
	(id: string, newStats: IUserStats): Promise<void>;
} = (_id, newStats) => User.update({ _id }, { stats: newStats }).exec();

/**
 * Read User ID from sessionID
 * @param sessionID Session ID
 * @returns Promise<string>
 * @throws Error when user sessionID not found or database gone wrong
 */

export let readUserInfoBySession: {
	(sessionID: string): Promise<string>;
} = sessionID =>
	User.findOne({ sessionID })
		.select("stats achievements email username")
		.exec();
// .then(user =>Promise.resolve(user));

/**
 * Read User obj stuff from sessionID
 * @param sessionID Session ID
 * @returns Promise<string>
 * @throws Error when user sessionID not found or database gone wrong
 */

export let readUserIDBySession: {
	(sessionID: string): Promise<string>;
} = sessionID =>
	User.findOne({ sessionID })
		.select("_id")
		.exec()
		.then(user => Promise.resolve(user._id));

/**
 * Read Username from sessionID
 * @param sessionID Session ID
 * @throws Error when user sessionID not found or database gone wrong
 */

export let readUsernameBySession: {
	(sessionID: string): Promise<String | null>;
} = sessionID =>
	User.findOne({ sessionID })
		.exec()
		.then(user => {
			if (user) return Promise.resolve(user.username);
			else return Promise.resolve(null);
		});
