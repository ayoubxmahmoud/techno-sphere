import express from 'express'
import { Subscription } from '../controllers/subscriber.controller.js';

const subscribeRouter = express.Router();

// This route handles the subscription requests, it calls Subscription Controller function to save subscriber's email to the database
subscribeRouter.post('/create', Subscription);
export default subscribeRouter;