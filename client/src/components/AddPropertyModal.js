import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextField, Button, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPropertyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    data.append("title", formData.name); // Use "title" to match the backend
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("bedrooms", formData.bedrooms);
    data.append("bathrooms", formData.bathrooms);
    data.append("description", formData.description);
    data.append("propertyType", formData.propertyType);
    data.append("image", formData.image); // Append the image file

    try {
      // Send a POST request to the backend
      const response = await axios.post("http://localhost:5000/api/properties", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file upload
        },
      });

      console.log("Property added:", response.data);

      // Show success toast message
      toast.success("Property added successfully!", {
        position: "bottom-right",
        autoClose: 2000, // Close the toast after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Close the modal after successful submission
      onClose();

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2500); // Refresh after 2.5 seconds
    } catch (error) {
      console.error("Error adding property:", error);

      // Show error toast message
      toast.error("Failed to add property. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <IconButton
              className="absolute top-2 right-2"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>

            {/* Form Title */}
            <h2 className="text-2xl font-bold mb-6">Add Property</h2>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                  required
                />
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Property Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Name */}
              <TextField
                label="Property Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              {/* Brief Description */}
              <TextField
                label="Brief Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />

              {/* Location */}
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />

              {/* Price */}
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />

              {/* Bedrooms */}
              <TextField
                label="Bedrooms"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({ ...formData, bedrooms: e.target.value })
                }
                required
              />

              {/* Bathrooms */}
              <TextField
                label="Bathrooms"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData({ ...formData, bathrooms: e.target.value })
                }
                required
              />

              {/* Property Type */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={formData.propertyType}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyType: e.target.value })
                  }
                  label="Property Type"
                  required
                >
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Villa">Villa</MenuItem>
                  <MenuItem value="Condo">Condo</MenuItem>
                </Select>
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-6"
              >
                Add Property
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AnimatePresence>
  );
};

export default AddPropertyModal;