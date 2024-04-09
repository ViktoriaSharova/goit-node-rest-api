import jwt from "jsonwebtoken";
import User from "../models/authModel.js";
import HttpError from "../helpers/HttpError.js";

const {JWT_SECRET} = process.env;

export const authanticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
        next(HttpError(401));
        }
        req.user = user;
        next();
    }
    catch {
        next(HttpError(401));
    }
}