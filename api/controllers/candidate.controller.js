import Candidate from "../models/candidate.model.js";
import Job from "../models/job.model.js";
import { errorHandler } from "../utils/error.js";

export const getCandidates = async (req, res, next) => {
  try {
    // Build a query object dynamically based on the query parameters
    const candidates = await Candidate.find({
      ...(req.query.candidateId && { _id : req.query.candidateId })
    });
    const totalCandidates = await Candidate.countDocuments();
    res.status(200).json({
      candidates,
      totalCandidates
    });
  } catch (error) {
    next(error)
    res.status(500).send("Error fetching candidates");
  }
};
export const createCandidate = async (req, res, next) => {
  try {
    // Validate required fields
    const { fullName, email, phone, resume, coverLetter } = req.body;
    const { jobId } = req.params;
    if (!fullName || !email || !phone || !resume || !coverLetter) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    // Validate the job exists
    const job = await Job.findById(jobId);
    if(!job) {
      return next(errorHandler(404, "Job not found"));
    }
    // Append the jobId to the candidate's jobs arrays
    const candidateData = {
      fullName,
      email,
      phone,
      resume,
      coverLetter,
      jobs: [jobId]
    }
    // Create new candidate
    const newCandidate = new Candidate(candidateData);
    const savedCandidate = await newCandidate.save();
    return res.status(201).json(savedCandidate); // Send response and stop execution
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

export const deleteCandidate = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this candidate"));
  }

  try {
    await Candidate.findByIdAndDelete(req.params.candidateId);
    res.status(200).json("The Candidate has been deleted")
  } catch (error) {
    next(error);
  }
}
