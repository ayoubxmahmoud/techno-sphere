import Job from "../models/job.model.js";
import { errorHandler } from "../utils/error.js";

export const getJobs = async (req, res, next) => {
  try {
    // Build a query object dynamically based on the query parameters
    const jobs = await Job.find({
      ...(req.query.jobId && { _id : req.query.jobId })
    });
    const totalJobs = await Job.countDocuments();
    res.status(200).json({
      jobs,
      totalJobs
    });
  } catch (error) {
    next(error)
    res.status(500).send("Error fetching jobs");
  }
};
export const createJob = async (req, res, next) => {
  try {
    // Ensure user is admin
    if (!req.user?.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a job"));
    }

    // Validate required fields
    const { title, location, type, description } = req.body;
    if (!title || !location || !type || !description) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    // Create new job
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    return res.status(201).json(savedJob); // Send response and stop execution
  } catch (error) {
    next(error); // Pass error to middleware
  }
};


export const updateJob = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update the job"));
  }
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, {
      $set: {
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        type: req.body.type
      }
    }, { new: true });
    res.status(200).json(updatedJob)
  } catch (error) {
    next(error);
  }
}

export const deleteJob = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this job"));
  }

  try {
    await Job.findByIdAndDelete(req.params.jobId);
    res.status(200).json("The Job has been deleted")
  } catch (error) {
    next(error);
  }
}

export const applyForJob = async (req, res, next) => {
  const { jobId } = req.params; // Correct destructuring
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return next(errorHandler(404, "No job found")); // Return if no job found
    }

    const isApplied = job.users.includes(req.user._id); // Correct method: includes
    if (isApplied) {
      return res.status(400).json({ message: "You are already applied for this job" }); // Return to prevent further execution
    }

    // Add user ID to job applicants
    job.users.push(req.user._id);
    await job.save(); // Save the updated job

    res.status(200).json({ message: "You have applied successfully for this job" });
  } catch (error) {
    next(error); // Pass error to middleware
  }
};
