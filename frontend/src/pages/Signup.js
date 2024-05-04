import { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [errors, setErrors] = useState({});
    const { signup, isLoading, error } = useSignup();

    // Validate password
    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    }

    // Validate contact
    const isValidContact = (contact) => {
        const contactRegex = /^\d{10}$/;
        return contactRegex.test(contact);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation
        if (!name.trim()) {
            setErrors(prevErrors => ({...prevErrors, name: 'Name is required' }));
            return;
        }

        if (!contact.trim()) {
            setErrors(prevErrors => ({...prevErrors, contact: 'Contact is required' }));
            return;
        }

        if (!isValidContact(contact)) {
            setErrors(prevErrors => ({...prevErrors, contact: 'Contact must be exactly 10 numbers' }));
            return;
        }
        
        if (!email.trim()) {
            setErrors(prevErrors => ({...prevErrors, email: 'Email is required' }));
            return;
        }

        if (!password.trim()) {
            setErrors(prevErrors => ({...prevErrors, password: 'Password is required' }));
            return;
        }

        //if (!isStrongPassword(password)) {
        //    setErrors(prevErrors => ({...prevErrors, password: 'Password must contain at least 8 characters including at least one uppercase letter, one number, and one special character' }));
        //    return;
        //}

        await signup(email, password, name, contact);
    }

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    Create your account.
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrors(prevErrors => ({...prevErrors, name: '' })); }}
                        error={!!errors.name}
                        helperText={errors.name}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Contact"
                        variant="outlined"
                        value={contact}
                        onChange={(e) => { setContact(e.target.value); setErrors(prevErrors => ({...prevErrors, contact: '' })); }}
                        error={!!errors.contact}
                        helperText={errors.contact}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors(prevErrors => ({...prevErrors, email: '' })); }}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrors(prevErrors => ({...prevErrors, password: '' })); }}
                        error={!!errors.password}
                        helperText={errors.password}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        fullWidth
                        style={{ marginTop: '1rem' }}
                    >
                        {isLoading ? "Signing up..." : "SIGN UP"}
                    </Button>

                    {error && <Typography variant="body2" color="error" gutterBottom style={{ marginTop: '1rem' }}>
                        {error}
                    </Typography>}
                </form>
            </Box>
        </Container>
    )
}

export default Signup;
