import express from "express";
import { checkToken, google, SignIn, SignUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/sign-up', SignUp)
authRouter.post('/sign-in', SignIn)
authRouter.post('/google', google)
authRouter.get('/check-token', checkToken)

export default authRouter;