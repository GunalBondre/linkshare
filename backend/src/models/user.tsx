import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export enum Plan {
	Free = 'free',
	Paid = 'paid',
	Premium = 'premium',
}

export enum Status {
	Active = 'active',
	Inactive = 'inactive',
}

interface Subscription {
	plan: Plan;
	status: Status;
	expiresAt?: Date;
	stripeCustomerId?: string; // Add Stripe Customer ID field

	// Add other fields related to the subscription
}

const SubscriptionSchema = new Schema<Subscription>({
	plan: {
		type: String,
		default: Plan.Free,
	},
	status: {
		type: String,
		default: Status.Inactive,
	},
	expiresAt: Date,
	stripeCustomerId: String,
});

export interface IUser extends Document {
	username: string;
	password: string;
	email: string;
	id: string;
	subscription: Subscription;
	resetPasswordToken?: string | undefined;
	resetPasswordExpires?: number | undefined;
}

const UserSchema = new Schema<IUser>({
	username: String,
	password: String,
	email: String,
	id: String,
	subscription: SubscriptionSchema,
	resetPasswordToken: String,
	resetPasswordExpires: String,
});

UserSchema.pre('save', async function (next) {
	const user = this as IUser;
	if (!user.isModified('password')) {
		return next();
	}

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	// Set expiresAt only if the plan is 'paid' or 'premium'
	// if (user.subscription?.plan !== Plan.Free) {
	// 	const oneYearLater = new Date();
	// 	oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
	// 	user.subscription.expiresAt = oneYearLater;
	// }

	next();
});

export default mongoose.model<IUser>('User', UserSchema);
