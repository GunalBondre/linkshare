import mongoose, { Schema } from 'mongoose';
const linkSchema = new Schema({
    title: { type: String },
    link: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
export default mongoose.model('Link', linkSchema);
//# sourceMappingURL=link.js.map