import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return /^\+?[0-9]{7,15}$/.test(v); // Basic phone number validation
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    resume: {
      type: String, // Stores the file path or URL for the resume
      required: [true, "Resume is required"],
    },
    jobs: {
        type: [String], // Array of job requirements
        required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [2000, "Cover letter cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Interview Scheduled", "Rejected", "Hired"],
      default: "Applied",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

export default mongoose.model("Candidate", candidateSchema);
