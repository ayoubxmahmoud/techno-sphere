import express from 'express'
import { fetchUser, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();

userRouter.put('/update/:userId',verifyToken, updateUser);


export default userRouter;