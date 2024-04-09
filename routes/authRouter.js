import express from "express";
// import authControllers from "../controllers/authControllers.js";
import { userSignupSchema, userSigninSchema } from "../schemas/authSchemas.js";
import validateBody  from "../helpers/validateBody.js";
import { authanticate } from "../middlewares/authenticate.js";
import { registerUser, loginUser, getCurrentUser, logoutUser} from "../controllers/authControllers.js";



const authRouter = express.Router();


authRouter.post("/register", validateBody(userSignupSchema), registerUser);

authRouter.post("/login", validateBody(userSigninSchema), loginUser);

authRouter.get("/current", authanticate, getCurrentUser);

authRouter.post("/logout", authanticate, logoutUser);


export default authRouter;