import { Schema, model, Document } from 'mongoose';
import User from './User';
import Thought from './Thought';
import Reaction from './Reaction';

// Define the types for the models
export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

export interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Export the models using the interfaces for type safety
export const UserModel = model<IUser>('User', User);
export const ThoughtModel = model<IThought>('Thought', Thought);
export const ReactionModel = model<IReaction>('Reaction', Reaction);