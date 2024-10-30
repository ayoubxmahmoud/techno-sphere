import express from 'express'
import { fetchUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/fetch', fetchUser);

export default userRouter;