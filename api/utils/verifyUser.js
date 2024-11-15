import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// Middleware function to verify the presence and validity of JWT
export const verifyToken = (req, res, next) => {
    // Retrieve the access_token from the cookies of incoming request
    const token = req.cookies.access_token;
    if (!token){
        return next(errorHandler(401, 'Unauthorized'));
    }
    // Verify the token using the secret key stored in Env
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(401, 'Unauthorized'));
        }
        // If token is valid, attach the decoded user info to the request object
        req.user = user;
        
        next();
    });
}