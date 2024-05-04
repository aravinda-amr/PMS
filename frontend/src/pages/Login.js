import { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation
        if (!email.trim()) {
            setErrors(prevErrors => ({...prevErrors, email: 'Email is required' }));
            return;
        }

        if (!password.trim()) {
            setErrors(prevErrors => ({...prevErrors, password: 'Password is required' }));
            return;
        }

        await login(email, password);
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
                    Welcome Back!
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    Enter your credentials to login.
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
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
                        {isLoading ? "Logging in..." : "LOGIN"}
                    </Button>

                    {error && <Typography variant="body2" color="error" gutterBottom style={{ marginTop: '1rem' }}>
                        {error}
                    </Typography>}
                </form>
            </Box>
        </Container>
    )
}

export default Login;
