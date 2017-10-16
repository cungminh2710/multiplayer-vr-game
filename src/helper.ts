import { User, IUserModel, IUserStats, Achievement } from "../models/user";
import Promise from "bluebird";

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
		}
	): Promise<IUserModel>;
} = userData => new User(userData).save();

/**
 * Check if an user id is valid and existed
 * @param username Username
 * @param password Password
 */
export let isUserExist: {
	(username: string, password: string): Promise<boolean>;
} = (username, password) =>
	User.findOne({ username })
		.exec()
		.then(user => {
			if (user)
				return user.comparePassword(password)
					? Promise.resolve(user)
					: Promise.resolve(null);
			else return Promise.resolve(null);
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
 */

export let readUserIDBySession: {
	(sessionID: string): Promise<String>;
} = sessionID =>
	User.find({ sessionID })
		.select("_id")
		.exec()
		.then(user => Promise.resolve(user._id));
