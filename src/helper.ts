import { User, IUserModel, IUserStats } from "../models/user";

/**
 * Register a new user
 * @param userData User Initial Data including username and password 
 */
export let createNewUser: {
	(
		userData: {
			username: string;
			password: string;
		}
	): Promise<IUserModel>;
} = userData => new User.save(userData);

/**
 * Check if an user id is valid and existed
 * @param id User ID
 */
export let isUserExist: { (id: string): Promise<boolean> } = _id =>
	User.count({ _id }).exec();

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
 * Update User Stats
 * @param id User ID 
 * @param newStats Updated User Stats
 */
export let updateUserStats: {
	(id: string, newStats: IUserStats): Promise<void>;
} = (_id, newStats) => User.update({ _id }, { stats: newStats }).exec();

/**
 * Get User ID from sessionID
 * @param sessionID Session ID
 */

export let readUserIDBySession: {
	(sessionID: string): Promise<String>;
} = sessionID =>
	User.find({ sessionID })
		.select("_id")
		.exec()
		.then(user => Promise.resolve(user._id));
