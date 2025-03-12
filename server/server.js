const express = require("express");
const cors = require("cors");
const {propertyRoutes} = require("./routes/index");
const sequelize = require('./config/Database');
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies


// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api", propertyRoutes);

// Export the app for testing
module.exports = app;


// Sync the model with the database
sequelize
  .sync({alter: true})
  .then(async () => {
    console.log("Database Synchronized sucessfully");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
     });
    
  })
  .catch((err) => {
    console.error("Unable to create the Property table:", err);
  });
// Start the server
