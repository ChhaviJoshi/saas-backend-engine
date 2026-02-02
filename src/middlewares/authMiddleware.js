const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Header received:", authHeader);
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  console.log("Token parsed:", token);

  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user; // Attach user info (id, role, org_id) to the request
    next();
  });
};

module.exports = authenticateToken;
