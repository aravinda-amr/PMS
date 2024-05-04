import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="ml-64">
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
      <Typography variant="h2" component="h1" sx={{ color: 'text.primary', textAlign: 'center' }}>
        ANURA PHARMACY (PVT) LTD
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '600px' }}>
        Your Quality Healthcare Provider.
      </Typography>
    </Box>
    </div>
  );
};

export default Home;
