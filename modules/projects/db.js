const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
    try {
      await mongoose.connect(dbUrl);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);    
    }
  };

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
});

const Project = mongoose.model("Project", projectSchema);

const getProjects = async () => {
    return await Project.find({});
};

module.exports = { connectDB, Project, getProjects };