const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const orgRoutes = require("./src/routes/orgRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const logRoutes = require("./src/routes/logRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);

module.exports = app;
