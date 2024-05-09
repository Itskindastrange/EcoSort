import React, { useState } from 'react';
import { Button, Typography, Container, Paper, IconButton, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animation library
import Navbar from './Navbar';
import Footer from './Footer';


const WelcomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleUploadClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/upload');
    }, 550);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333' }}>
          <Navbar />
          
          <Button
        variant="outlined"
        color="primary"
        style={{ position: 'fixed', bottom: 500, right: 20, zIndex: 999 }}
        onClick={handleDarkModeToggle}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
      <Container maxWidth="sm" style={{ marginTop: '2rem', marginBottom: 'auto' }}>
        {/* Animated Paper with subtle shadow */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <Paper
            style={{
              padding: '2rem',
              borderRadius: 10,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome to EcoSort!
            </Typography>
            <Typography variant="body1" paragraph>
              Upload an image to get started.
            </Typography>
            <IconButton onClick={handleUploadClick}>
              {/* Material UI icon with hover animation */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <i className="material-icons">Image Upload</i>
              </motion.div>
            </IconButton>
          </Paper>
        </motion.div>
      </Container>
      {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <LinearProgress color="secondary" />
        </div>
      )}
      <Footer />
      {/* Dark Mode Toggle Button */}
     
    </div>
  );
};

export default WelcomePage;
