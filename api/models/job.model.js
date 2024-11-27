import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Job title is mandatory
  },
  location: {
    type: String,
    required: true, // Location of the job is mandatory
  },
  description: {
    type: String,
    required: true, // Detailed job description
  },
  type: {
    type: String,
    required: true,
  },
  candidates: {
    type: [String], // Array of job requirements
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});
const Job = mongoose.model("Job", jobSchema);
export default Job;
