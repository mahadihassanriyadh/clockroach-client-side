import React from 'react';
import { CardMedia, Container, Grid, TextField, Typography, Button, CircularProgress, Alert, Box } from '@mui/material';
import { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import login from '../../../images/login.png'
import googleIcon from '../../../images/google.png'
import useAuth from '../../../hooks/useAuth';


const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, error, isLoading, signInWithGoogle, logout } = useAuth();
    const [success, setSuccess] = useState(false);

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        console.log(field, value)
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        // console.log(newLoginData)
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();   
        loginUser(loginData.email, loginData.password, location, history);
        if (user.email) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        }
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
        if (user.email) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        }
    }
    return (
        <Container>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item sx={{mt: 20}} xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        {
                            !user.email ? "Login" : "Please logout first to sign in"
                        }
                    </Typography>
                    {
                        user.email &&
                        <Button style={{textDecoration: 'none', width: '100%',  backgroundColor: '#212121', color: '#ffeb3b'}} onClick={logout} variant="contained">Logout</Button>
                    }
                    {   !user.email &&
                        <Box>
                            { !isLoading &&
                                <form onSubmit={handleLoginSubmit}>
                                    <TextField
                                        required
                                        sx={{width: "75%", m: 1}}
                                        id="standard-basic"
                                        label="Your Email"
                                        type="email"
                                        variant="standard"
                                        name="email"
                                        onBlur={handleOnBlur}
                                    />
                                    <TextField
                                        required
                                        sx={{width: "75%", m: 1}}
                                        id="outlined-password-input"
                                        label="Your Password"
                                        variant="standard"
                                        type="password"
                                        name="password"
                                        onBlur={handleOnBlur}
                                    />

                            <Button type="submit" style={{ backgroundColor: 'black' }} sx={{ width: "75%", m: 1, color: '#ffeb3b'}} variant="contained">Login</Button>
                                    <NavLink style={{textDecoration: "none"}} to="/register">
                                        <Button style={{color: 'black'}} variant="text">New User? Please Register</Button>
                                    </NavLink>
                                </form>
                            }
                            <Button onClick={handleGoogleSignIn} type="submit" variant="contained" color="text" style={{backgroundColor: '#fafafa'}}><img style={{padding: 5}} src={googleIcon} alt="" />  Google Sign In</Button>
                        </Box>
                    }
                    {
                        isLoading && <CircularProgress />
                    }
                    {
                        success &&
                        <Alert severity="success">Logged in successful</Alert>
                    }
                    {
                        error && <Alert severity="error">{ error }</Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                <CardMedia
                    component="img"
                    image={login}
                    alt="Paella dish"
                    style={{marginTop: '10%'}}
                />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;