const addPost = (req, res) => {
  console.log("addPost");
  res.sendStatus(200);
};

const getAllPosts = (req, res) => {
  console.log("getAllPosts");
  res.sendStatus(200);
};

const getCurrentUserPosts = (req, res) => {
  console.log("getCurrentUserPosts");
  res.sendStatus(200);
};

const editPost = (req, res) => {
  console.log("editPost");
  res.sendStatus(200);
};

const deletePost = (req, res) => {
  console.log("deletePost");
  res.sendStatus(200);
};

module.exports = {
  addPost,
  getAllPosts,
  getCurrentUserPosts,
  editPost,
  deletePost,
};
