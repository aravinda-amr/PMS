import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button, Container, Typography, Box, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import backgroundImage1 from '../images/bg.png';

const Landing = () => {
    const { user } = useAuthContext();

    return (
        <Box sx={{
            backgroundImage: `url(${backgroundImage1})`,
            backgroundSize: '100% 100%', // Stretch the background image
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            position: 'relative',
            color: '#000'
        }}>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', color: '#333', boxShadow: 'none' }}>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ color: 'transparent' }}>
                        ANURA PHARMACY (PVT) LTD
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" color="primary" size="large" component={Link} to="/login" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" size="large" component={Link} to="/signup" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                            Signup
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <div className="p-5 bg-white w-[50%] rounded shadow-lg mx-auto">
                <Box sx={{ textAlign: 'center', py: 8, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Typography variant="h3" component="h1" sx={{ mb: 4, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                        Welcome to Anura Pharmacy
                    </Typography>
                    <Typography variant="body1" component="p" >
                        We provide high-quality pharmaceutical products to ensure your well-being.
                    </Typography>
                </Box>
            </div>

            <div className="p-5 mt-3 bg-white w-[50%] rounded shadow-lg mx-auto">
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 4, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
                        Our Services
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ textAlign: 'center', maxWidth: '600px' }}>
                        {/* Add details about services here */}
                        Medicine dispensing and consultation services<br />
                        Health and wellness products<br />
                        Prescription refills<br />
                        Personalized medication packaging<br />
                        {/* Add more details as needed */}
                    </Typography>
                </Box>
            </div>
            <Box>
                <div className="p-5 mt-3 bg-white w-[50%] rounded shadow-lg mx-auto">
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                        <Typography variant="h4" component="h2" sx={{ mb: 4, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
                            Contact Us
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ textAlign: 'center', maxWidth: '600px' }}>
                            {/* Add contact information here */}
                            Address: <br />Shopping Complex, Ja Ela-Ekala-Gampaha-Yakkala Hwy, Gampaha 11000<br />
                            Phone: 0332 224 033<br />
                            Email: anurapharmacy3@gmail.com<br />
                            Hours:
                            8 AM–9 PM<br />
                        </Typography>

                    </Box>
                </div>
                
            </Box>



            <footer style={{ backgroundColor: '#333', padding: '20px', textAlign: 'center', color: '#fff', position: 'absolute', bottom: 0, width: '100%' }}>
                <Typography variant="body1" component="p">
                    © {new Date().getFullYear()} Anura Pharmacy. All rights reserved.
                </Typography>
            </footer>

        </Box>
    );
};

export default Landing;
