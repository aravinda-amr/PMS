import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from '../images/logo-org.png';
import img1 from '../images/ap1.jpg';
import img2 from '../images/ap2.jpg';
import img3 from '../images/ap3.jpg';

const MapComponent = () => (
    <Box sx={{ position: 'relative', width: '100%', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:"#2152A4" }}>
      <iframe
        title="Anura Pharmacy Location"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.8023390178214!2d79.99021171402093!3d7.093064617717426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae252db531ef431%3A0x9e7b839e3b1f1ed!2sShopping%20Complex,%20Ja%20Ela-Ekala-Gampaha-Yakkala%20Hwy,%20Gampaha%2011000!5e0!3m2!1sen!2slk!4v1642064223014!5m2!1sen!2slk&marker=7.093064617717426,79.99021171402093`} // Add marker parameter with lat,lng
        width="70%"
        height="70%"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen=""
        loading="lazy"
        
      />
    </Box>
);

  

const Slideshow = ({ images }) => {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '400px',
            overflow: 'hidden',
            
        }}>
            {images.map((image, idx) => (
                <img
                    key={idx}
                    src={image}
                    alt={`Slide ${idx}`}
                    style={{
                        width: '50%', // Make each image take up half of the width
                        height: '100%',
                        objectFit: 'cover',
                        margin: 'auto', // Center the images horizontally
                    }}
                />
            ))}
        </div>
    );
};




const Landing = () => {
    const slideshowImages = [img1, img2, img3];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#fff',
            overflowX: 'hidden', // Hide horizontal overflow
        }}>
            <AppBar position="static" sx={{ backgroundColor: '#fff' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}> {/* Center align content */}
                        <img src={logo} alt="Anura Pharmacy Logo" style={{ height: '120px', marginLeft: '40px' }} />
                        <h4 style={{ color: '#2152A4', margin: '0 auto', fontSize: '2.75rem', fontFamily: 'Arial Black', letterSpacing: '-3px' }}>
                            <strong>ANURA PHARMACY (PVT) LTD</strong>
                        </h4>
                    </Box>
                    <Box>
                        <button>
                            <Link to="/login" className="text-dark-blue font-medium py-2 px-4 rounded hover:underline">
                                Login
                            </Link>
                        </button>
                        <button>
                            <Link to="/signup" className="text-dark-blue font-medium py-2 px-4 rounded hover:underline">
                                Signup
                            </Link>
                        </button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: 'flex', width: '100%' }}>
                <Slideshow images={slideshowImages} />
            </Box>
            <Typography variant="body1" component="p" sx={{  backgroundColor: '#fff',fontSize: '1.5rem',  color: '#2152A4',textAlign: 'center', p: 4 }}>
                <strong>Largest pharmacy in Gampaha town providing your health care services.</strong>
            </Typography>
                        
            <Typography variant="body1" component="p" sx={{ color: '#2152A4', fontSize: '1.5rem', backgroundColor: '#fff', p:4, textAlign: 'center' }}>
                    <strong>Our Services:</strong>
                    <ul>
                        <li>Medicine dispensing and consultation services</li>
                        <li>Health and wellness products</li>
                        <li>Prescription refills</li>
                        <li>Personalized medication packaging</li>
                    </ul>
                </Typography>
<div className='bg-dark-blue'>

                <MapComponent />
                <Typography variant="body1" component="p" sx={{ color: '#2152A4', fontSize: '1.5rem', backgroundColor: '#fff', p:4, textAlign: 'center' }}>
                    <strong>Contact Us:</strong><br />
                    <strong>Address:</strong> Shopping Complex, Ja Ela-Ekala-Gampaha-Yakkala Hwy, Gampaha 11000<br />
                    <strong>Phone:</strong> 0332 224 033<br />
                    <strong>Email:</strong> <a href="mailto:anurapharmacy3@gmail.com">anurapharmacy3@gmail.com</a><br />
                    <strong>Hours:</strong> 8 AM–9 PM
                </Typography>

            
            </div>
            <Box sx={{ flexGrow: 1 }} /> {/* Empty box to push footer to bottom */}
            <footer style={{ backgroundColor: '#fff', padding: '20px', textAlign: 'center', color: '#333' }}>
                <Container maxWidth="md">
                    <Typography variant="body1" component="p">
                        © {new Date().getFullYear()} Anura Pharmacy. All rights reserved.
                    </Typography>
                </Container>
            </footer>
        </Box>
    );
};

export default Landing;
