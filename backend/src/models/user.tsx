import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
	username: string;
	password: string;
	email: string;
	id: string;
}

const UserSchema = new Schema<IUser>({
	username: String,
	password: String,
	email: String,
	id: String,
});

UserSchema.pre('save', async function (next) {
	const user = this as IUser;
	if (!user.isModified('password')) {
		return next();
	}

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	next();
});

export default mongoose.model<IUser>('User', UserSchema);
