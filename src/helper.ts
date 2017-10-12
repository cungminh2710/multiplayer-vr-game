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
export let isUserExist: { (id: string): Promise<boolean> } = id =>
	User.count({ id }).exec();

/**
 * Update session ID of an user given his/her User ID
 * @param id User ID
 * @param sessionID Session ID
 */

export let updateUserSession: {
	(id: string, sessionID: string): Promise<void>;
} = (id, sessionID) => User.update({ id }, { sessionID }).exec();

/**
 * Read user data based on User ID
 * @param id User ID
 */
export let readUser: { (id: string): Promise<IUserModel> } = id =>
	User.findOne({ id }).exec();

/**
 * Read user stats based on User ID
 * @param id User ID
 */
export let readUserStats: { (id: string): Promise<IUserStats> } = id =>
	readUser(id).then(user => user.stats);
