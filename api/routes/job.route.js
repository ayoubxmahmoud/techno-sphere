import express from 'express'
import { getJobs, applyForJob, deleteJob, updateJob, createJob } from '../controllers/job.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const jobRouter = express.Router();

// This route handles the subscription requests, it calls Subscription Controller function to save subscriber's email to the database
jobRouter.get('/get-jobs', getJobs);
jobRouter.post('/create',verifyToken, createJob);
jobRouter.put('/update/:jobId',verifyToken, updateJob);
jobRouter.delete('/delete/:jobId',verifyToken, deleteJob);
jobRouter.post('/applyForJob/:jobId',verifyToken, applyForJob);

export default jobRouter;