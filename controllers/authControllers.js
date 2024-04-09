import * as authServices from "../services/authServices.js";
import ctrlWraper from "../helpers/ctrlWraper.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import { userSignupSchema, userSigninSchema } from "../schemas/authSchemas.js";
import jwt from "jsonwebtoken";
import User from "../models/authModel.js";

const { JWT_SECRET } = process.env;
export const registerUser = ctrlWraper(async (req, res) => {

    const { error } = userSignupSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
    return;
    }

    const { email, password } = req.body;

    const existingUser = await authServices.findUser({ email });
    if (existingUser) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await authServices.signup({
        email: email,
        password: hashPassword,
    });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    });

});


export const loginUser = ctrlWraper(async (req, res) => {

    const { error } = userSigninSchema.validate(req.body);
    if (error) {
        res.status(401).json({ message: error.message });
    return;
    }
    
    const { email, password } = req.body;
    
    const existingUser = await authServices.findUser({ email });

    if (!existingUser) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, existingUser.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: existingUser._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    await User.findByIdAndUpdate(existingUser._id, { token });

    res.status(200).json({
        token,
        user: {
        email: existingUser.email,
        subscription: existingUser.subscription,
    }
    });
});

export const getCurrentUser = ctrlWraper(async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    })
});

export const logoutUser = ctrlWraper(async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

      res.status(204).json({ message: "No Content" });
});