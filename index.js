const express = require("express"); 
const path = require("path");
const dotenv = require("dotenv");
const { connectDB, Skill } = require("./modules/skills/db"); 
const { Project } = require("./modules/projects/db"); 


dotenv.config();
connectDB(); 
const cors = require("cors"); //for API paths to work when deployed
const app = express();
const port = process.env.PORT || "8888";

//SET UP CORS TO ACCEPT REQUESTS FROM ANY ORIGIN
app.use(
  cors({
    origin: "*",
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));



// Define routes
//home page
app.get("/", (request, response) => {
  response.render("index"); 
});

//skills page
app.get("/skills", async (request, response) => {
    const skills = await Skill.find();
    
    response.render("skills", { skills });  
});

app.get("/api/skills", async (request, response) => {   
  const skills = await Skill.find();
  response.json(skills);     
  
});

//projects page
app.get("/projects", async (request, response) => {  
    const projects = await Project.find(); 
    response.render("projects", { projects }); 
  
});

app.get("/api/projects", async (request, response) => {   
  const projects = await Project.find(); 
  response.json(projects);
});


// add a skill form
app.get("/skills/add", (request, response) => {
  response.render("add-skill");
});

//adding a skill
app.post("/skills", async (request, response) => {
  const { name, level } = request.body;   
  const newSkill = new Skill({ name, level });
  await newSkill.save(); 
  response.redirect("/skills"); 
  
});

//add a project form
app.get("/projects/add", (request, response) => {
  response.render("add-project"); 
});

//adding a project
app.post("/projects", async (request, response) => {
  const { title, description, link } = request.body;  
  const newProject = new Project({ title, description, link });
  await newProject.save();
  response.redirect("/projects");
  
});



app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});