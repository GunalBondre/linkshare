import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
});
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});
export default mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map