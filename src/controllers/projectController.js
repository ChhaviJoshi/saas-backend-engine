const projectModel = require("../models/projectModel");
const logModel = require("../models/logModel");

// 1. Create Project
const createProject = async (req, res) => {
  const { name, description } = req.body;
  const orgId = req.user.org_id; 
  const userId = req.user.id;

  try {
    const newProject = await projectModel.createProject(
      name,
      description,
      orgId,
    );
    
    await logModel.createLog(`Created project "${name}"`, userId, orgId);

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 2. Get All Projects (Scoped to Org)
const getAllProjects = async (req, res) => {
  const orgId = req.user.org_id; // 👈 Automatic filtering!

  try {
    const projects = await projectModel.getProjectsByOrg(orgId);
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createProject, getAllProjects };
