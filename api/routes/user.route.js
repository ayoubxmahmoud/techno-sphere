import express from 'express'
import { deleteUser, fetchUser, getUsers, signOut, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { checkToken } from '../controllers/auth.controller.js';

const userRouter = express.Router();

userRouter.put('/update/:userId',verifyToken, updateUser);
userRouter.delete('/delete/:userId', verifyToken, deleteUser)
userRouter.post('/sign-out', signOut)
userRouter.get('/get-users', verifyToken, getUsers);

export default userRouter;