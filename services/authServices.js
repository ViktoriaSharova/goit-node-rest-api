import User from "../models/authModel.js";

export const findUser = filter => User.findOne(filter);

export const register = (data) => User.create(data);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);