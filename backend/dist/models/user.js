import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
export var Plan;
(function (Plan) {
    Plan["Free"] = "free";
    Plan["Paid"] = "paid";
    Plan["Premium"] = "premium";
})(Plan || (Plan = {}));
export var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["Inactive"] = "inactive";
})(Status || (Status = {}));
const SubscriptionSchema = new Schema({
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
const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    id: String,
    subscription: SubscriptionSchema,
    resetPasswordToken: String,
    resetPasswordExpires: String,
});
UserSchema.pre('save', async function (next) {
    const user = this;
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
export default mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map