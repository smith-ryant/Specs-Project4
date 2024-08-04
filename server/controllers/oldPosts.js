// ../server/controllers/posts.js

const { Post, User } = require("../models"); // Import from index.js

module.exports = {
  addPost: async (req, res) => {
    try {
      console.log("Post Model:", Post); // Debugging
      let { title, content, status, userId } = req.body;
      const newPost = await Post.create({
        title,
        content,
        userId,
        privateStatus: status,
      });
      res.status(201).json(newPost);
    } catch (error) {
      console.error("ERROR IN addPost:", error);
      res.status(400).json({ message: "Failed to add post", error });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      console.log("Post Model:", Post); // Debugging
      const posts = await Post.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
        ],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error("ERROR IN getAllPosts:", error);
      res.status(400).json({ message: "Failed to retrieve posts", error });
    }
  },
  editPost: async (req, res) => {
    try {
      console.log("Post Model:", Post); // Debugging
      const { id } = req.params;
      const { status } = req.body;
      await Post.update(
        { privateStatus: status },
        {
          where: { id: +id },
        }
      );
      res.sendStatus(200);
    } catch (error) {
      console.error("ERROR IN editPost:", error);
      res.status(400).json({ message: "Failed to edit post", error });
    }
  },
  getCurrentUserPosts: async (req, res) => {
    try {
      console.log("Post Model:", Post); // Debugging
      const { userId } = req.params;
      const posts = await Post.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
        ],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error("ERROR IN getCurrentUserPosts:", error);
      res
        .status(400)
        .json({ message: "Failed to retrieve user's posts", error });
    }
  },
  deletePost: async (req, res) => {
    try {
      console.log("Post Model:", Post); // Debugging
      const { id } = req.params;
      await Post.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.error("ERROR IN deletePost:", error);
      res.status(400).json({ message: "Failed to delete post", error });
    }
  },
};
