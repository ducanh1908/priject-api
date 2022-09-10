import { Schema, model } from "mongoose";
interface IUser {
  username: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  avatar: string;
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
});
const User = model<IUser>("User", userSchema);
export default User;
