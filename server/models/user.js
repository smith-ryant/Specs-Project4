// ../server/models/user.js
// verified code

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database").sequelize; // Use sequelize instance

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    hashedPass: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true, // false - Disable timestamps if not needed, true - Enable timestamps
  }
);

module.exports = User; // Correct export
