import React from 'react';
import { CardMedia, Container, Grid, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import login from '../../../images/login.png'
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const [success, setSuccess] = useState(false);
    const { registerUser, isLoading, error, user, setError } = useAuth();

    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        console.log(field, value)
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        // console.log(newLoginData);
        setLoginData(newLoginData);
    }
    const handleRegisterSubmit = e => {
        e.preventDefault();
        if (loginData.password !== loginData.password2) {
            setError("Passwords didn't match");
            return;
        }
        registerUser(loginData.email, loginData.password, loginData.name, history);
        setSuccess(true);
        setTimeout(()=>setSuccess(false), 5000)
    }
    return (
        <Container>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
                <CardMedia
                    component="img"
                    image={login}
                    alt="Paella dish"
                    style={{marginTop: '20%'}}
                />
                </Grid>
                <Grid item sx={{mt: 20}} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Register
                    </Typography>
                    {  !isLoading &&
                        <form onSubmit={handleRegisterSubmit}>
                        <TextField
                            required
                            sx={{width: "75%", m: 1}}
                            id="standard-basic"
                            label="Your Name" variant="standard"
                            type="text"
                            name="name"
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            required
                            sx={{width: "75%", m: 1}}
                            id="standard-basic"
                            label="Your Email" variant="standard"
                            type="email"
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
                        <TextField
                            required
                            sx={{width: "75%", m: 1}}
                            id="outlined-password-input"
                            label="Retype Your Password"
                            variant="standard"
                            type="password"
                            name="password2"
                            onBlur={handleOnBlur}
                        />

                        <Button type="submit" sx={{ width: "75%", m: 1, backgroundColor: '#212121', color: '#ffeb3b' }} variant="contained">Register</Button>
                        <NavLink style={{textDecoration: "none"}} to="/login">
                            <Button style={{color: 'black'}} variant="text">Already Registered? Please Login</Button>
                        </NavLink>
                    </form>
                    }
                    {
                        isLoading && <CircularProgress />
                    }
                    {
                        success &&
                        <Alert severity="success">Your account has been created successfully!</Alert>
                    }
                    {
                        error && <Alert severity="error">{ error }</Alert>
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;