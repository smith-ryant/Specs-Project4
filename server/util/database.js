// react-proj-4 2/starter/server/util/database.js
// Verified connection to database.

require("dotenv").config(); // Load environment variables from .env file
const { Sequelize } = require("sequelize");

console.log("Database URL:", process.env.DATABASE_URL);
console.log("Logging Enabled:", process.env.SEQUELIZE_LOGGING);

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}
// Check if SECRET is defined
if (!process.env.SECRET) {
  throw new Error("SECRET environment variable is not defined");
}

// Use the DATABASE_URL from the .env file
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  //logging: process.env.SEQUELIZE_LOGGING === "true", // Enable logging based on environment variable
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({
      force: process.env.SEQUELIZE_FORCE_SYNC === "true",
    }); // Make sync option configurable
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process with a failure code
  }
})();

module.exports = {
  sequelize,
};
