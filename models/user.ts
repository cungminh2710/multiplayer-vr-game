import { Document, Schema, Model, model } from "mongoose";
import * as bcrypt from "bcrypt";

const SALT_FACTOR = 10;

export interface Achievement {
	logoUrl: string;
	name: string;
	description: string;
}

export interface IUserStats extends Document {
	numGamesPlayed: number;
	numWon: number;
	numDrew: number;
	numKills: number;
	numDeath: number;
}

export interface IUserModel extends Document {
	email: string;
	username: string;
	password: string;
	achievements: Array<Achievement>;
	sessionID: string;
	stats: IUserStats;
}

export var UserSchema: Schema = new Schema({
	username: {
		type: String,
		required: true,
		index: { unique: true }
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	achievements: {
		type: Array,
		default: []
	},
	sessionID: {
		type: String
	},
	stats: {
		type: {
			numGamesPlayed: Number,
			numWon: Number,
			numDrew: Number,
			numKills: Number,
			numDeath: Number
		},
		default: {
			numGamesPlayed: 0,
			numWon: 0,
			numDrew: 0,
			numKills: 0,
			numDeath: 0
		}
	}
});

UserSchema.pre("save", function(next) {
	let user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified("password")) {
		return next();
	}

	// generate a salt
	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = candidatePassword =>
	bcrypt.compareSync(candidatePassword, this.password);
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
