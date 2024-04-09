import User from "../models/authModel.js";

export const findUser = filter => User.findOne(filter);

export const signup = data => User.create(data);