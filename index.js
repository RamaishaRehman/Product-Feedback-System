const express = require("express");
const mongoose = require("mongoose");
const Feedback = require("./models/feedback.model.js");
const feedbackRoute = require("./routes/feedback.route.js");
const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//routes
app.use("/api/feedbacks", feedbackRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

mongoose
  .connect(
    "mongodb+srv://ramaishar24:RBSXpRbFxBIc365u@userfeedbackdb.ieeme89.mongodb.net/Node-APIs?appName=userfeedbackdb"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
