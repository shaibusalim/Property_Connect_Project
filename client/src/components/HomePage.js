import React, { useState, useEffect, useContext } from "react";
import { Button, Slider, Select, MenuItem, InputLabel, FormControl, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../ThemeContext";
import axios from "axios";

const HomePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [loading, setLoading] = useState(true); 

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get("https://your-backend-app.herokuapp.com/api/properties");
        console.log("API Response:", response.data);
    
        // Prepend the backend URL to the image path
        const propertiesWithFullImageUrl = response.data.map((property) => ({
          ...property,
          image: property.image ? `https://your-backend-app.herokuapp.com/${property.image}` : "https://via.placeholder.com/400x300",
        }));
    
        setProperties(propertiesWithFullImageUrl);
      } catch (error) {
        console.error("Error fetching properties", error);
        toast.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, []);


  // Handle search and filter
  useEffect(() => {
    let filtered = properties.filter((property) => {
      // Safeguard: Ensure property.name and property.location exist
      const name = property.name || "";
      const location = property.location || "";
  
      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase());
  
      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];
  
      const matchesBedrooms =
        bedrooms === "" || property.bedrooms === parseInt(bedrooms);
  
      const matchesBathrooms =
        bathrooms === "" || property.bathrooms === parseInt(bathrooms);
  
      const matchesPropertyType =
        propertyType === "" || property.propertyType === propertyType;
  
      return (
        matchesSearch &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesPropertyType
      );
    });
  
    setFilteredProperties(filtered);
  }, [searchQuery, priceRange, bedrooms, bathrooms, propertyType, properties]);

  // Simulate contacting the seller with a toast notification
  const handleContactSeller = (propertyId) => {
    toast.success(`Seller for property ${propertyId} has been notified!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={`container mx-auto p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:outline-none ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-black border-gray-300"
          }`}
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Price Range */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
            Price Range
          </label>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            className="w-full"
          />
          <div className={`flex justify-between text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <FormControl fullWidth>
            <InputLabel className={darkMode ? "text-white" : "text-black"}>Bedrooms</InputLabel>
            <Select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              label="Bedrooms"
              className={darkMode ? "text-white bg-gray-800" : "text-black bg-white"}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4+</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Bathrooms */}
        <div>
          <FormControl fullWidth>
            <InputLabel className={darkMode ? "text-white" : "text-black"}>Bathrooms</InputLabel>
            <Select
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              label="Bathrooms"
              className={darkMode ? "text-white bg-gray-800" : "text-black bg-white"}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4+</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Property Type */}
        <div>
          <FormControl fullWidth>
            <InputLabel className={darkMode ? "text-white" : "text-black"}>Property Type</InputLabel>
            <Select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              label="Property Type"
              className={darkMode ? "text-white bg-gray-800" : "text-black bg-white"}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
              <MenuItem value="Condo">Condo</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Property Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress /> {/* Display a loading spinner */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              {/* Property Image */}
              <img
                  src={property.image || "https://via.placeholder.com/400x300"}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300"; // Fallback if image fails to load
                  }}
                />

              {/* Property Details */}
              <div className="p-4">
                <h2 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  {property.name}
                </h2>
                <p className={`text-gray-600 mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {property.location}
                </p>
                <p className="text-green-600 font-bold mb-2">${property.price}</p>
                <p className={`text-gray-600 mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms
                </p>
                <p className={`text-gray-700 mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {property.description}
                </p>

                {/* Contact Seller Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleContactSeller(property.id)}
                >
                  Contact Seller
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default HomePage;