const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

// Create a Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql", // Default to MySQL if not set
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Some cloud databases require SSL
      },
    },
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
