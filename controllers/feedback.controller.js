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
      const { id, fullname, email, feedback: fb, improvement, comments, createdAt } = feedback;
      feedbacks.push({ id, fullname, email, feedback: fb, improvement, comments, createdAt });
  });
  const csvFields=['ID', 'Full Name', 'Email', 'Feedback', 'Improvement', 'Comments', 'Created At'];
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

// // Export to Excel
// const exportToExcel = async (req, res) => {
//   try {
//     // Fetch all feedback data
//     const feedbacks = await Feedback.find({});
    
//     // Format data for Excel
//     const excelData = feedbacks.map((feedback) => ({
//       'ID': feedback._id.toString(),
//       'Full Name': feedback.fullname || 'N/A',
//       'Email': feedback.email || 'N/A',
//       'Overall Satisfaction': feedback['overall-satisfaction'] || 'N/A',
//       'Service Quality': feedback['service-quality'] || 'N/A',
//       'Recommendation': feedback.recommendation || 'N/A',
//       'Feedback': feedback.feedback || 'N/A',
//       'Improvement': feedback.improvement || 'N/A',
//       'Comments': feedback.comments || 'N/A',
//       'Likert Scale': feedback['likert-scale'] || 'N/A',
//       'Created At': feedback.createdAt ? new Date(feedback.createdAt).toLocaleString() : 'N/A'
//     }));

//     // Create workbook and worksheet
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(excelData);

//     // Set column widths
//     worksheet['!cols'] = [
//       { wch: 25 }, // ID
//       { wch: 20 }, // Full Name
//       { wch: 30 }, // Email
//       { wch: 20 }, // Overall Satisfaction
//       { wch: 20 }, // Service Quality
//       { wch: 15 }, // Recommendation
//       { wch: 40 }, // Feedback
//       { wch: 40 }, // Improvement
//       { wch: 40 }, // Comments
//       { wch: 20 }, // Likert Scale
//       { wch: 20 }  // Created At
//     ];

//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedbacks');

//     // Generate filename with timestamp
//     const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
//     const filename = `feedbacks_${timestamp}.xlsx`;

//     // Write file to buffer
//     const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

//     // Set headers for download
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
//     // Send file
//     res.send(excelBuffer);

//   } catch (err) {
//     console.error('Export error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

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
