import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import Navbar from './Navbar'; // Assuming Navbar is in the same directory or adjusted path
import Footer from './Footer'; // Assuming Footer is in the same directory or adjusted path

const AboutPage = () => {
  return (
    <div> {/* Wrap everything in a container div */}
      <Navbar />
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom component="h2">
          About EcoSort
        </Typography>
        <Typography variant="body1" paragraph>
          EcoSort is a website that leverages machine learning (ML) to classify uploaded images. We use a trained model to analyze your images and provide you with predicted classifications.
        </Typography>
        <Typography variant="h5" gutterBottom component="h3">
          Here's how it works:
        </Typography>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>You upload an image.</li>
          <li>Our ML model analyzes the image features.</li>
          <li>Based on the analysis, the model predicts the most likely classification.</li>
        </ul>
        <Typography variant="h5" gutterBottom component="h3">
          Important Note:
        </Typography>
        <Typography variant="body1" paragraph>
          While our ML model is trained on a large dataset, it's important to understand that the results may not always be 100% accurate. Factors like image quality, variations within categories, and limitations of the model itself can influence predictions.
        </Typography>
        <Typography variant="body1" paragraph>
          For critical tasks, we recommend consulting with a domain expert or using the results as a starting point for further investigation.
        </Typography>
        <Typography variant="body1" paragraph>
          We're constantly working to improve our model's accuracy. If you encounter any issues or have suggestions, feel free to contact us using the link below.
        </Typography>
        <Link href="#" underline="none" color="primary">
          Contact Us
        </Link>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutPage;
