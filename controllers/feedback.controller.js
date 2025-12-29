const Feedback = require("../models/feedback.model.js");

//Get All Feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
//Get Single Feedbacks by ID
const getFeedback = async (req, res) => {
    try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
//Create Feedback
const createFeedback = async (req, res) => {
    try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
//update Feedback
const updateFeedback = async (req, res) => {
     try {
        const { id } = req.params;
        const feedback = await Feedback.findByIdAndUpdate(id, req.body);
        if (!feedback) {
          return res
            .status(404)
            .json({ message: `Cannot find any feedback with ID ${id}` });
        }
        const updatedFeedback = await Feedback.findById(id);
        res.status(201).json(updatedFeedback);
      } catch (err) {
        res.status(500).json({ message: error.message });
      }
};
//delete Feedback
const deleteFeedback = async (req, res) => {
    try {
    const { id } = req.params;
    const feedback=await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res
        .status(404)
        .json({ message: `Cannot find any feedback with ID ${id}` });
    }
    res.status(201).json({message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFeedbacks,
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback
};

