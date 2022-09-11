import { Schema, model } from "mongoose";
export interface IUser {
  username: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  avatar: string;
  emailToken: string;
  verified: Boolean;
  date: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
  },
  emailToken: {
    type: String,
    },
  verified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(), }

}, {
  timestamps: true,
  }
);
const User = model<IUser>("User", userSchema);
export default User;
