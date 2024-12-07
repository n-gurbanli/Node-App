const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);    
  }
};

// Define the Skill schema
const skillSchema = new mongoose.Schema({
  name: String,  
  level: String
});

const Skill = mongoose.model("Skill", skillSchema);

const getSkills = async () => {
    const check =  Skill.find({});
};




//exports
module.exports = { connectDB, Skill, getSkills };

