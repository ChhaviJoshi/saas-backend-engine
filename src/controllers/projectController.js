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

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // e.g., 'completed'
  const orgId = req.user.org_id;
  const userId = req.user.id;

  try {
    const updatedProject = await projectModel.updateProjectStatus(id, status, orgId);
    if (!updatedProject) return res.status(404).json({ error: 'Project not found' });

    await logModel.createLog(`Updated project ${id} status to "${status}"`, userId, orgId);

    res.json({ message: 'Project status updated', project: updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const orgId = req.user.org_id;
  const userId = req.user.id;

  try {
    const deletedProject = await projectModel.deleteProject(id, orgId);
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' });

    await logModel.createLog(`Deleted project ${id}`, userId, orgId);

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createProject, getAllProjects, updateStatus, deleteProject };
