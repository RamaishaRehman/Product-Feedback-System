const Feedback = require("../models/feedback.model.js");
const csv = require('csvtojson');
const CsvParser = require('json2csv').Parser;

//Get All Feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Get Single Feedbacks by ID
const getFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Create Feedback
const createFeedback = async (req, res) => {
  try {
    const { fullname, email, feedback, improvement, comments } = req.body;
    const newFeedback = new Feedback({
      fullname,
      email,
      feedback,
      improvement,
      comments,
    });
    await newFeedback.save();
    res.redirect('/?success=Feedback submitted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error submitting feedback");
  }
};

//Export Data
const exportData = async (req, res) => {
  try {
    let feedbacks = [];
    var userData = await Feedback.find({});
    userData.forEach((feedback) => {
      const { id, fullname, email, feedback: fb, improvement, comments } = feedback;
      feedbacks.push({ id, fullname, email, feedback: fb, improvement, comments });
  });
  const csvFields=['ID', 'Full Name', 'Email', 'Feedback', 'Improvement', 'Comments'];
  const csvParser = new CsvParser({ csvFields });
  const csvData = csvParser.parse(feedbacks);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment: filename=feedbacks.csv");
  res.status(200).end(csvData);
}
  catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};
//delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res
        .status(404)
        .json({ message: `Cannot find any feedback with ID ${id}` });
    }
    res.status(201).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getFeedbacks,
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  exportData,
};
