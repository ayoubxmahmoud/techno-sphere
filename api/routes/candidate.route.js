import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createCandidate, deleteCandidate, getCandidates } from '../controllers/candidate.controller.js';

const candidateRouter = express.Router();

// This route handles the subscription requests, it calls Subscription Controller function to save subscriber's email to the database
candidateRouter.get('/get-candidates', getCandidates);
candidateRouter.post('/create/:jobId',verifyToken, createCandidate);
candidateRouter.delete('/delete/:candidateId',verifyToken, deleteCandidate);

export default candidateRouter;