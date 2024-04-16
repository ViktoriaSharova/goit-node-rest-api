import express from "express";
import authControllers from "../controllers/authControllers.js";
import { userSigninSchema, userSignupSchema } from "../schemas/authSchemas.js";
import validateBody  from "../helpers/validateBody.js";
import authanticate from "../middlewares/authenticate.js";



const authRouter = express.Router();


authRouter.post("/register", validateBody(userSignupSchema), authControllers.register);

authRouter.post("/login", validateBody(userSigninSchema), authControllers.login);

authRouter.get("/current", authanticate, authControllers.getCurrent);

authRouter.post("/logout", authanticate, authControllers.logout);


export default authRouter;