import Joi from "joi";
import { emailRegexp } from "../constant/user-constant.js";


export const userSignupSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
  });
  
  export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });
  
  export const userVerifySchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
  });
