import { Document, Schema, Model, model } from "mongoose";

export interface ICharModel extends Document {
	name: string;
	description: string;
	modifiers: {
		attack: number;
		defence: number;
		speed: number;
		range: number;
	};
}

export var CharSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	modifiers: {
		type: {
			attack: Number,
			defence: Number,
			speed: Number,
			range: Number
		},
		default: {
			attack: 1,
			defence: 1,
			speed: 1,
			range: 1
		}
	}
});

export const Character: Model<ICharModel> = model<ICharModel>(
	"Character",
	CharSchema
);
