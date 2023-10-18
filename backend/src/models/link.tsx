import mongoose, { Document, Schema } from 'mongoose';

export interface ILink extends Document {
	title: string;
	url: string;
	createdBy: object;
}
const linkSchema = new Schema<ILink>({
	title: { type: String },
	url: { type: String },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

export default mongoose.model<ILink>('Link', linkSchema);
