import express from "express";
import { google, SignIn, SignUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/sign-up', SignUp)
authRouter.post('/sign-in', SignIn)
authRouter.post('/google', google)

export default authRouter;