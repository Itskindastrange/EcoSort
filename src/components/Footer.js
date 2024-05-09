import React from 'react';
import { Typography, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © 2024 EcoSort. All rights reserved.
        <Link href="#" underline="none" color="text.primary">
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
