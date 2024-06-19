require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const isAuthenticated = (req, res, next) => {
  const headerToken = req.get("Authorization");

  if (!headerToken) {
    console.log("ERROR IN: authorization middleware");
    res.sendStatus(401);
  }

  let token;

  try {
    token = jwt.verify(headerToken, SECRET);
  } catch (err) {
    console.log("ERROR IN: token verifification", err);
    return res.status(500).json({ message: "Server error" });
  }

  if (!token) {
    console.log("Token verification failed");
    return res.status(401).json({ message: "Not authenticated" });
  }

  req.user = token;
  next();
};

module.exports = isAuthenticated;
