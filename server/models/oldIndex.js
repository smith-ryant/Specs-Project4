// ../server/models/index.js

const User = require("./user");
const Post = require("./post");

console.log("User Model: ", User);
console.log("Post Model: ", Post);

// Define associations
User.hasMany(Post); // A user can have many posts
Post.belongsTo(User); // A post belongs to a user

module.exports = { User, Post }; // Correct export
