import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Animation library
import {
  LinearProgress,
  Button,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; 
import Footer from './Footer'; 

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Basic file validation (optional)
    if (!selectedFile || !selectedFile.type.match('image/*')) {
      alert('Please select a valid image file.');
      return;
    }
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.prediction);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error occurred while making the prediction.');
      setLoading(false);
    }
  };

  // Animation on component mount (optional)
  useEffect(() => {
    const animation = {
      opacity: [0, 1],
      transition: { duration: 1 },
    };
    const container = document.getElementById('upload-container');
    if (container) {
      container.animate(animation);
    }
  }, []);

  // Function to toggle dark mode state
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Implement your dark mode logic here, such as changing CSS classes or theme colors
    // document.body.classList.toggle('dark-mode'); // Example: toggling a 'dark-mode' class on the body
  };

  return (
    <div style={{ backgroundColor: darkMode ? '#333' : '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Button
        variant="outlined"
        color="primary"
        style={{ position: 'fixed', bottom: 500, right: 20, zIndex: 999 }}
        onClick={handleDarkModeToggle}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
      <Container maxWidth="md" id="upload-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ color: darkMode ? '#fff' : '#3f51b5' }} // Adjust text color based on dark mode state
        >
          Upload Image
        </motion.h2>

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload & Predict'}
        </Button>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: '1rem' }}
          >
            <LinearProgress color="secondary" />
          </motion.div>
        )}

        {prediction && (
          <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom component="h2">
              Predicted Result
            </Typography>
            {imageUrl && (
              <Card sx={{ maxWidth: '300px', margin: 'auto' }}>
                <CardMedia component="img" height="auto" image={imageUrl} alt="Uploaded Image" />
                <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                  {prediction}
                </Typography>
              </Card>
            )}
          </Container>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default UploadPage;
