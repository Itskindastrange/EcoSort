import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar disableGutters>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          EcoSort
        </Typography>
      
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            color="inherit"
            onClick={() => navigate('/')}
          >
            <Menu />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton color="inherit" onClick={handleHomeClick}>
            Home
          </IconButton>
          <IconButton color="inherit" onClick={handleAboutClick}>
            About
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
