import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Custom theme for typography and colors
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Highlight = styled('span')(({ theme }) => ({
  fontSize: '24px',
  backgroundColor: theme.palette.grey[300],
  borderRadius: '4px',
  padding: '4px 8px',
}));

const Home = ({ aboutToExpirePath, outOfStockPath, expiredPath, aboutToOutOfStockPath }) => {
  const [aboutToExpireCount, setAboutToExpireCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const [aboutToOutOfStockCount, setAboutToOutOfStockCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Initiate all fetch requests simultaneously
        const [aboutToExpireResponse, outOfStockResponse, expiredResponse, aboutToOutOfStockResponse] = await Promise.all([
          fetch('/api/abtexpired'),
          fetch('/api/outofstock'),
          fetch('/api/expired'),
          fetch('/api/abtoutofstock')
        ]);
  
        // Process responses
        const aboutToExpireData = await aboutToExpireResponse.json();
        const outOfStockData = await outOfStockResponse.json();
        const expiredData = await expiredResponse.json();
        const aboutToOutOfStockData = await aboutToOutOfStockResponse.json();
  
        // Update state with processed data
        setAboutToExpireCount(aboutToExpireData.length);
        setOutOfStockCount(outOfStockData.length);
        setExpiredCount(expiredData.length);
        setAboutToOutOfStockCount(aboutToOutOfStockData.length);
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };
  
    fetchCounts();
  }, []);
  

  return (
    <ThemeProvider theme={theme}>
      <div className="px-4 py-8 ml-auto">
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 ml-64">
          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
                ANURA PHARMACY (PVT) LTD
              </Typography>
              <Typography variant="body1" component="p" sx={{ textAlign: 'center', maxWidth: '600px' }}>
                Your Quality Healthcare Provider.
              </Typography>
              <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} sx={{ minWidth: 275, margin: '20px', padding: '20px', borderRadius: '10px' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        About to Expire
                      </Typography>
                      <Typography variant="body2">
                        <Highlight>{aboutToExpireCount}</Highlight> drugs are about to expire.
                      </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" sx={{ width: '100%', marginTop: '10px' }} component={Link} to={aboutToExpirePath}>View</Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} sx={{ minWidth: 275, margin: '20px', padding: '20px', borderRadius: '10px' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Out of Stock
                      </Typography>
                      <Typography variant="body2">
                        <Highlight>{outOfStockCount}</Highlight> drugs are out of stock.
                      </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" sx={{ width: '100%', marginTop: '10px' }} component={Link} to={outOfStockPath}>View</Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} sx={{ minWidth: 275, margin: '20px', padding: '20px', borderRadius: '10px' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Expired
                      </Typography>
                      <Typography variant="body2">
                        <Highlight>{expiredCount}</Highlight> drugs have expired.
                      </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" sx={{ width: '100%', marginTop: '10px' }} component={Link} to={expiredPath}>View</Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} sx={{ minWidth: 275, margin: '20px', padding: '20px', borderRadius: '10px' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        About to Out of Stock
                      </Typography>
                      <Typography variant="body2">
                        <Highlight>{aboutToOutOfStockCount}</Highlight> drugs are about to go out of stock.
                      </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" sx={{ width: '100%', marginTop: '10px' }} component={Link} to={aboutToOutOfStockPath}>View</Button>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
