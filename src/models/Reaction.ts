import { Schema, model, Types } from 'mongoose';


const reactionSchema = new Schema(
  {

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    thoughtId: {
      type: Types.ObjectId,
      ref: 'Thought',
      required: true,
    },
    // Timestamp for when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toISOString(), // Formatting the date to a string if desired
    },
  },
  {
    // Mongoose will add the `createdAt` field automatically, but this option allows customization
    toJSON: {
      getters: true,  // Apply getters to the `createdAt` field
    },
    toObject: {
      getters: true,  // Apply getters when turning the document to a plain object
    },
  }
);

// Create the Reaction model
const Reaction = model('Reaction', reactionSchema);

export default Reaction;