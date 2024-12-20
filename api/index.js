import express from "express"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import postRoutes from './routes/post.route.js';
import subscribeRouter from './routes/subsciber.route.js';
import jobRouter from './routes/job.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO)
        .then(() => {
            console.log('Mongodb is connected');
        })
        .catch((err) => {
            console.log(err)
        });
        
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

// the app use userRouter for API requests starting with '/api/users'
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/subscribe', subscribeRouter)
app.use('/api/job', jobRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});