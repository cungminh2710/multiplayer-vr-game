import { Document, Schema, Model, model} from "mongoose";
import * as bcrypt from "bcrypt";

const SALT_FACTOR = 10;

export interface Achievement {
  logoUrl: string,
  name: string,
  description: string
}

export interface IUserModel extends Document {
  email: string,
  userName: string,
  password: string,
  achievements: Array<Achievement>,
  stats: {
    numGamesPlayed: number,
    numWon: number,
    numDrew: number,
    numKills: number,
    numDeath: number
  }
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

UserSchema.pre('save', next => {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')){
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

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);