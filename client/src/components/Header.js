import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger icon
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon
import AddPropertyModal from "./AddPropertyModal"; // Import the modal

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode); // Apply dark mode to the entire app
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Sticky Header */}
      <AppBar
        position="sticky" // Make the header sticky
        className={`${darkMode ? "bg-gray-800" : "bg-blue-500"} backdrop-blur-md`} // Add backdrop blur
      >
        <Toolbar>
          {/* Logo/Branding */}
          <Typography variant="h6" component="div" className="flex-grow">
            <Link to="/" className="text-white no-underline hover:text-gray-200">
              Property Connect
            </Link>
          </Typography>

          {/* Navigation Links with Icons (Desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }} className="space-x-4">
            <Link to="/" className="text-white no-underline hover:text-gray-200 flex items-center">
              <HomeIcon className="mr-1" />
              Home
            </Link>
            <Link
              to="#"
              onClick={() => setIsModalOpen(true)}
              className="text-white no-underline hover:text-gray-200 flex items-center"
            >
              <AddIcon className="mr-1" />
              Add Property
            </Link>
          </Box>

          {/* Light/Dark Mode Toggle */}
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Hamburger Menu Icon (Mobile) */}
          <IconButton
            color="inherit"
            onClick={toggleMobileMenu}
            sx={{ display: { xs: "flex", md: "none" } }} // Show only on small screens
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right" // Open the drawer from the right
        open={isMobileMenuOpen} // Control the visibility of the drawer
        onClose={toggleMobileMenu} // Close the drawer when clicking outside
      >
        <Box
          sx={{ width: 250 }} // Set the width of the drawer
          role="presentation"
          onClick={toggleMobileMenu} // Close the drawer when clicking an item
          onKeyDown={toggleMobileMenu} // Close the drawer when pressing a key
        >
          <List>
            {/* Home Link */}
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            {/* Add Property Link */}
            <ListItem button onClick={() => setIsModalOpen(true)}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Property" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Add Property Modal */}
      <AddPropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;