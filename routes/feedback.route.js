const express = require("express");
const Feedback = require("../models/feedback.model.js");
const router = express.Router();
const {getFeedbacks, getFeedback, createFeedback, updateFeedback, deleteFeedback, exportData} = require("../controllers/feedback.controller.js");

router.get("/", getFeedbacks);
router.get("/:id", getFeedback);
router.post("/", createFeedback);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);
router.get("/exportData", exportData);

module.exports = router;
