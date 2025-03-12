const Property = require("../models/Property");

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// Add a new property with image upload
const addProperty = async (req, res) => {
    try {
      const { title, price, location, bedrooms, bathrooms, description, propertyType } = req.body;
      const image = req.file ? req.file.path : null; // Get the uploaded file path
  
      const newProperty = await Property.create({
        title,
        price,
        location,
        bedrooms,
        bathrooms,
        description,
        propertyType,
        image,
      });
  
      res.status(201).json(newProperty);
    } catch (err) {
      res.status(500).json({ error: "Failed to add property" });
    }
  };


// Contact seller (simulated)
const contactSeller = async (req, res) => {
  try {
    const { propertyId } = req.body;
    res.json({ message: `Seller for property ${propertyId} has been notified!` });
  } catch (err) {
    res.status(500).json({ error: "Failed to contact seller" });
  }
};

module.exports = {
  getAllProperties,
  addProperty,
  contactSeller,
};