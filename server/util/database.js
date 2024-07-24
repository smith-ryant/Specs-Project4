require("dotenv").config(); // Load environment variables from .env file
const { Sequelize, DataTypes } = require("sequelize");

// Use the DATABASE_URL from the .env file
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false, // Disable logging; default: console.log
});

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: "green",
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    // Code here
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = {
  sequelize,
  User,
};
