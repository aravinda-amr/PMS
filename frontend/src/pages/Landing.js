import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button, Container, Typography, Box } from '@mui/material';
import backgroundImage from '../images/bg.jpg'; // Import your image file

const Landing = () => {
    const { user } = useAuthContext();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
            {/* Background image */}
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    opacity: 0.7, // Adjust opacity for better readability of text
                }}
            />
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 8 }}>
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'Arial, sans-serif', color: '#000', fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 }}>
                    ANURA PHARMACY (PVT) LTD
                </Typography>
                <Typography variant="body1" component="p" sx={{ color: '#000', marginBottom: 4 }}>
                    Welcome to Anura Pharmacy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at arcu quis sem vestibulum dignissim. Integer vitae magna vitae odio vulputate fermentum.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="contained" color="primary" size="large" component={Link} to="/login" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" size="large" component={Link} to="/signup" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        Signup
                    </Button>
                </Box>
            </Container>
            <Box sx={{ flexGrow: 1 }} /> {/* Empty box to push footer to bottom */}
            <footer style={{ backgroundColor: '#333', padding: '20px', textAlign: 'center', color: '#fff' }}>
                <Typography variant="body1" component="p">
                    © {new Date().getFullYear()} Anura Pharmacy. All rights reserved.
                </Typography>
            </footer>
        </Box>
    );
};

export default Landing;
