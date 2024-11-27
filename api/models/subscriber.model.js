import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate subscriptions
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address.",
      ],
    },
    subscribedAt: {
      type: Date,
      default: Date.now, // Track when the subscription occurred
    },
    isActive: {
      type: Boolean,
      default: true, // Indicates whether the subscription is active
    },
    preferences: {
      type: [String], // For example: ['tech', 'news', 'events']
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
