import { Schema, model, models } from 'mongoose';
import connectMongo from '../database/conn';
import { hash } from "bcryptjs";
const userSchema = new Schema({
  username: String,
  email: String,

  password: String,
  avatar:String
});

const Users = models.user || model('user', userSchema);

export default Users;
