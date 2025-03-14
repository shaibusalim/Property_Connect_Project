require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { propertyRoutes } = require("./routes/index");
const sequelize = require("./config/Database");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", propertyRoutes);

// Sync the model with the database
sequelize
  .sync() // Remove `{ alter: true }` in production
  .then(() => {
    console.log("Database synchronized successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
  });

module.exports = app;
