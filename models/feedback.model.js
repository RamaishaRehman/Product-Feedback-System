const e = require("express");
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    feedback: { type: String, required: [true, "Feedback is required"] },
    improvement: { type: String, required: [true, "Improvement suggestion is required"] },
    comments: { type: String, required: false },
  },
  {
    Timestamps: true,
  }
);
const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;