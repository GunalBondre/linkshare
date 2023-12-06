import mongoose, { Document, Schema } from 'mongoose';

export interface ILink extends Document {
	title: string;
	link: string;
	createdBy: object;
}
const linkSchema = new Schema<ILink>({
	title: { type: String },
	link: { type: String },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

export default mongoose.model<ILink>('Link', linkSchema);
