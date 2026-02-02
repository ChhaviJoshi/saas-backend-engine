const logModel = require("../models/logModel");

const getLogs = async (req, res) => {
  const orgId = req.user.org_id;

  try {
    const logs = await logModel.getLogsByOrg(orgId);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getLogs };
