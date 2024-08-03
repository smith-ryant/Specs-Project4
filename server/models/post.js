// ../server/models/posts.js

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database").sequelize; // Use sequelize instance

const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    privateStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // Disable timestamps if not needed
  }
);

module.exports = Post; // Correct export
