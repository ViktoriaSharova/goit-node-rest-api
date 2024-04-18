import express from "express";
import authControllers from "../controllers/authControllers.js";
import { userSigninSchema, userSignupSchema } from "../schemas/authSchemas.js";
import validateBody  from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";



const authRouter = express.Router();


authRouter.post("/register", validateBody(userSignupSchema), authControllers.register);

authRouter.post("/login", validateBody(userSigninSchema), authControllers.login);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);


export default authRouter;