import * as authServices from "../services/authServices.js";
import ctrlWraper from "../helpers/ctrlWraper.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import User from "../models/authModel.js";


const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }
  
    const hashPassword = await bcrypt.hash(password, 10);
  
    const newUser = await authServices.register({
      ...req.body,
      password: hashPassword,
    });
  
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  };
  
  const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }
  
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }
  
    const { _id: id } = user;
  
    const payload = {
      id,
    };
  
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authServices.updateUser({ _id: id }, { token });
  
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  };
  
  const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  };
  
  const logout = async (req, res) => {
    const { _id } = req.user;
    await authServices.updateUser(_id, { token: "" });
  
    res.status(204).json({ message: "No Content" }); 
  };

  const changeAvatar = async (req, res) => {
    const { _id } = req.user;
    if (!req.file) {
      throw HttpError(400, "You shoud add an image");
    }
    
  const { path: oldPath, filename } = req.file;
   const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    
    try {
      await Jimp.read(newPath).then((image) => {
        return image.resize(250, 250).writeAsync(newPath);});} 
        catch (error) {
        console.error(error);
      }
    
  const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
    };



  
  export default {
    register: ctrlWraper(register),
    login: ctrlWraper(login),
    getCurrent: ctrlWraper(getCurrent),
    logout: ctrlWraper(logout),
    changeAvatar: ctrlWraper(changeAvatar),
  };