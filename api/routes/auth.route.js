import express from "express";
import { SignUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/sign-up', SignUp)

export default authRouter;