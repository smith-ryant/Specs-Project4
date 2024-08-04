// ../server/controllers/auth.js

const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

const sendResponse = (res, user, token) => {
  const exp = Date.now() + 1000 * 60 * 60 * 48;
  const data = {
    username: user.username,
    userId: user.id,
    token: token,
    exp: exp,
  };
  res.status(200).send(data);
};

module.exports = {
  register: async (req, res) => {
    try {
      console.log("User Model:", User); // Debugging
      const { username, password } = req.body;
      const foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        return res.status(409).send("Username is taken!");
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        username,
        hashedPass: hash,
      });

      const token = createToken(newUser.username, newUser.id);
      sendResponse(res, newUser, token);
    } catch (error) {
      console.error("ERROR IN register:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const foundUser = await User.findOne({ where: { username } });
      if (!foundUser) {
        return res.status(404).send("User does not exist.");
      }

      const isAuthenticated = bcrypt.compareSync(
        password,
        foundUser.hashedPass
      );
      if (!isAuthenticated) {
        return res.status(401).send("Password is incorrect");
      }

      const token = createToken(foundUser.username, foundUser.id);
      sendResponse(res, foundUser, token);
    } catch (error) {
      console.error("ERROR IN login:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
