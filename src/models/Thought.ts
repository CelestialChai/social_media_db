import mongoose, { Schema, Document } from 'mongoose';

// Reaction Schema
interface IReaction {
  reactionId: mongoose.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
});

// Thought Schema
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
   username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Virtual
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});


thoughtSchema.set('toJSON', { getters: true, virtuals: true });

const Thought = mongoose.model<IThought>('Thought', thoughtSchema);

export default Thought;